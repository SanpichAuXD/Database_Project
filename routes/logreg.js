const express = require("express");
const path = require("path");
const cookieSession = require("cookie-session");
const bcrypt = require("bcrypt");
const pool = require("./database");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(express.urlencoded({ extended: false }));

// SET OUR VIEWS AND VIEW ENGINE
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    cookieSession({
        name: "session",
        keys: ["key1", "key2"],
        maxAge: 3600 * 1000, // 1hr
    })
);

//declaring custome middleware
const ifNotLoggedIn = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        console.log('notloggedin',req.session.isLoggedIn);
        return res.render("login");
    }
    next();
};

const ifLoggedIn = (req, res, next) => {
    if (req.session.isLoggedIn) {
        console.log('logged in',req.session.isLoggedIn);
        return res.redirect("/");
    }
    next();
};
app.get("/", ifNotLoggedIn, async (req, res) => {
    try {
        const [row, field] = await pool.query(
            "SELECT name FROM users WHERE id = ?",
            [req.session.userID]
        );
       
            res.render("index", { name: row[0].name });
        }
     catch (error) {
        console.log(error);
    }
});

//reg
app.post(
    "/register",
    ifLoggedIn,
    [
        body("email", "Invalid email address!")
            .isEmail()
            .custom(async (value) => {
                try {
                    const [rows] = await pool.execute(
                        "SELECT `email` FROM `users` WHERE `email`=?",
                        [value]
                    );
                    if (rows.length > 0) {
                        return Promise.reject("This E-mail already in use!");
                    }
                    return true;
                } catch (error) {
                    throw new Error("Database error: " + error.message);
                }
            }),
        body("fname", "Firstname is Empty!").trim().not().isEmpty(),
        body("lname", "Lastname is Empty!").trim().not().isEmpty(),
        body("password", "The password must be of minimum length 8 characters")
            .trim()
            .isLength({ min: 8 }),
            body("cfpassword")
    .notEmpty()
    .withMessage("password is empty")
    .custom((value, { req }) => {
      if (value === req.body.password) {
        return true;
      }
      return false;
    })
    .withMessage("Password Not Match"),
    ],
    (req, res, next) => {
        const validation_result = validationResult(req);
        const { user_name, user_pass, user_email } = req.body;
        if (validation_result.isEmpty()) {
            bcrypt.hash(user_pass, 12, async function (err, hash) {
                try {
                    const [row, field] = await pool.query(
                        "INSERT INTO users(user_password, user_email, user_phone,user_lname) VALUES(?,?,?)",
                        [user_name, user_email, hash]
                    );

                    res.redirect("/login");
                } catch (err) {
                    console.log(err);
                }
            });
        } else {
            // COLLECT ALL THE VALIDATION ERRORS
            let allErrors = validation_result.errors.map((error) => {
                return error.msg;
            });
            // REDERING login-register PAGE WITH VALIDATION ERRORS
            res.render("register", {
                register_error: allErrors,
                old_data: req.body,
            });
        }
    }
);

app.post(
    "/login",
    ifLoggedIn,
    [
        body("user_email").custom(async (value) => {
            try {
                const [row, field] = await pool.query(
                    "SELECT email FROM users WHERE email = ?",
                    [value]
                );
                if (row.length) {
                    return true;
                }
                return Promise.reject("Invalid Email Address!");
            } catch (err) {
                console.log(err);
            }
        }),
        body("user_pass", "Password is empty!").trim().not().isEmpty(),
    ],
    async (req, res) => {
        const validation_result = validationResult(req);
        const { user_pass, user_email } = req.body;
        if (validation_result.isEmpty()) {
            try {
                const [row, field] = await pool.query(
                    "SELECT * FROM users WHERE email = ?",
                    [user_email]
                );
                bcrypt.compare(
                    user_pass,
                    row[0].password,
                    function (err, isLogin) {
                        if (isLogin === true) {
                            req.session.isLoggedIn = true;
                            req.session.userID = row[0].id;
                            res.redirect("/");
                        } else {
                            res.render("login", {
                                login_error: ["Invalid Password!"],
                            });
                        }
                    }
                );
            } catch (err) {
                console.log(err);
            }
        } else {
            let allErrors = validation_result.errors.map((error) => {
                return error.msg;
            });
            // REDERING login-register PAGE WITH LOGIN VALIDATION ERRORS
            res.render("login", {
                login_errors: allErrors,
            });
        }
    }
);
app.get('/logout',(req,res)=>{
    //session destroy
    req.session = null;
    res.redirect('/');
});
// END OF LOGOUT

app.use('/', (req,res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});
app.listen(3000, () => {
    console.log("server on port 3000");
});
