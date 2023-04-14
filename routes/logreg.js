const bcrypt = require("bcrypt");
const pool = require('../config');
const express = require('express')
const { body, validationResult } = require("express-validator");

router = express.Router();
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
router.get("/", ifNotLoggedIn, async (req, res) => {
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
router.post(
    "/register",
    ifLoggedIn,
    [
        body("email", "Invalid email address!")
            .isEmail()
            .custom(async (value) => {
                try {
                    const [rows] = await pool.execute(
                        "SELECT `admin_email` FROM `admin` WHERE `admin_email`=?",
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
        console.log(req.body);
        const validation_result = validationResult(req);
        const { fname,lname, password,phone, email } = req.body;
        if (validation_result.isEmpty()) {
            bcrypt.hash(password, 12, async function (err, hash) {
                try {
                    console.log(hash);
                        const [row, field] = await pool.query(
                        "INSERT INTO admin(admin_password, admin_email, admin_phone,admin_fname,admin_lname) VALUES(?,?,?,?,?)",
                        [ hash,email,phone,fname,lname]
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

router.post(
    "/logging",
    ifLoggedIn,
    [
        body("user_email").custom(async (value) => {
            try {
                const [row, field] = await pool.query(
                    "SELECT user_email FROM user WHERE user_email = ?",
                    [value]
                );
                const [row2, field2] = await pool.query(
                    "SELECT admin_email FROM admin WHERE admin_email = ?",
                    [value]
                );
                if (row.length || row2.length) {
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
                const [row1, field] = await pool.query(
                    "SELECT * FROM user WHERE user_email = ?",
                    [user_email]
                );
                const [row2, field2] = await pool.query(
                    "SELECT * FROM admin WHERE admin_email = ?",
                    [user_email]
                );
                let row;
                let user;
                if (row1.length>0){
                    row = row1[0].user_password
                    user = row1[0]
                }
                else if (row2.length>0){
                    row = row2[0].admin_password
                    user = row2[0]
                }
                console.log(row);
                bcrypt.compare(
                    user_pass,
                    row,
                    function (err, isLogin) {
                        console.log('login',isLogin);
                        if (isLogin === true) {
                            req.session.isLoggedIn = true;
                            req.session.userID = user;
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
router.get('/logout',(req,res)=>{
    //session destroy
    req.session = null;
    res.redirect('/');
});
// END OF LOGOUT

// router.use('/', (req,res) => {
//     res.status(404).send('<h1>404 Page Not Found!</h1>');
// });

exports.router = router
