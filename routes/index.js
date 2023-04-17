const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async (req, res) => {
    const user = req.session.userID;
    console.log(user);
    const isAdmin = req.session.isAdmin;
    let data = { user: user, isAdmin: isAdmin };
    try {
        const [row, field] = await pool.query("SELECT * FROM user");
    } catch (error) {
        console.log(error);
    }
    res.render("index", data);
});
router.get("/admin", async (req, res) => {
    const user = req.session.userID;
    const isAdmin = req.session.isAdmin;
    let data = { user: user, isAdmin: isAdmin };
    const [admin, fields] = await pool.query(
        `SELECT * FROM problem_info
        join user
        using (user_id)
        join accused
        using (accused_id)
        join prob_type
        using(type_id)
        left outer join organization
        using (org_id)
        join location
        using(location_id)
        left outer join prob_image
        using(prob_id)
         WHERE prob_status = 'Verifying'
         `
    );
    const [img, field] = await pool.query(
        `SELECT img_id, img_link,prob_id
        FROM prob_image
        join problem_info
        using(prob_id)`
    );
    data.problem = admin;
    console.log(data.problem);
    data.image = img;
    res.render("admin-manager", data);
});
router.get("/adminorg", async (req, res) => {
    const user = req.session.userID;
    console.log(user);
    const isAdmin = req.session.isAdmin;
    let data = { user: user, isAdmin: isAdmin };
    const [adminOrg, fields] = await pool.query(
        `SELECT * FROM problem_info
        join user
        using (user_id)
        join accused
        using (accused_id)
        join prob_type
        using(type_id)
        left outer join organization
        using (org_id)
        join location
        using(location_id)
        left outer join prob_image
        using(prob_id)
         WHERE prob_status = 'Considering' and org_id = ?
        
         `,[user.org_id]
    );
    const [img, field] = await pool.query(
        `SELECT img_id, img_link,prob_id
        FROM prob_image
        join problem_info
        using(prob_id)`
    );
    data.problemOrg = adminOrg;
    data.image = img;
    res.render("admin-organization", data);
});
router.get("/adminhis", async(req, res) => {
   
        const user = req.session.userID;
        const isAdmin = req.session.isAdmin;
        let data = { user: user, isAdmin: isAdmin };
        const [prob_all, fieldname] = await pool.query(
            `SELECT * FROM problem_info
            join user
            using (user_id)
            join accused
            using (accused_id)
            join prob_type
            using(type_id)
            join organization
            using (org_id)
            join location
            using(location_id)
            join prob_image
            using(prob_id)
             WHERE img_id in (SELECT  MIN(img_id)
           FROM prob_image
           GROUP BY prob_id) AND prob_status NOT IN ('Verifying')
             `
        );

        const [img, field] = await pool.query(
            `SELECT img_id, img_link,prob_id
            FROM prob_image
            join problem_info
            using(prob_id)`
        );
        data.prob = prob_all
        data.image = img;
    res.render("admin-manager-histroy", data);
});
router.get("/acc", async (req, res) => {
    try {
        const user = req.session.userID;
        console.log('acc',user);
        const isAdmin = req.session.isAdmin;
        const [count,fields2] = await pool.query(`
        SELECT count(prob_id) 'count'
        FROM problem_info
        WHERE user_id = ?
        GROUP by user_id
        `,[user.user_id])
        const [probUserDB, fields] = await pool.query(
            `SELECT * FROM problem_info
             JOIN user
             USING(user_id)
             JOIN prob_type
             USING(type_id)
             JOIN location
             USING(location_id)
             LEFT OUTER JOIN accused
             USING(accused_id)
             JOIN prob_image
             USING(prob_id) WHERE user_id = ?`,
            [req.session.userID.user_id]
        );
        let data = { user: user, isAdmin: isAdmin,probUser: probUserDB };
       
        if (user.user_id) {
            console.log("usereee", user);
            const [member, fields1] = await pool.query(
                `select * from user where user_id = ?`,
                [user.user_id]
            );
            data.user = member[0];
        } else if (user.admin_id) {
            console.log("admin");
            const [admin, fields1] = await pool.query(
                `select admin_fname 'user_fname',admin_lname 'user_lname', admin_phone 'user_phone',admin_email 'user_email',org_id from admin where admin_id = ?`,
                [user.admin_id]
            );
            data.user = admin[0];
        }
        data.count = count[0]||0
        console.log(data.count);
        res.render("account", data);
    } catch (err) {
        return res.redirect('/login')
    }
});
router.get("/login", (req, res) => {
    const user = req.session.userID;
    let data = { user: user };
    res.render("login", data);
});
router.get("/reg", (req, res) => {
    const user = req.session.userID;
    let data = { user: user };
    res.render("register", data);
});
router.get("/repform", (req, res) => {
    const user = req.session.userID;
    const isAdmin = req.session.isAdmin;
    let data = { user: user,isAdmin:isAdmin };
    res.render("reportForm", data);
});
router.get("/chart", async (req, res) => {
    const user = req.session.userID;
    const isAdmin = req.session.isAdmin;
    const [allProbReport, fields] = await pool.query(
        `SELECT type_name, COUNT(prob_id)'probs'
         FROM prob_type
         LEFT OUTER JOIN problem_info
         USING (type_id)
         WHERE prob_status != 'Declined'
         GROUP BY type_name`
    );
    const [allProbReport2, fields2] = await pool.query(
        `SELECT type_name, prob_status, province, COUNT(prob_id)'probs'
         FROM prob_type
         LEFT OUTER JOIN problem_info
         USING (type_id)
         JOIN location
         USING (location_id)
         WHERE prob_status != 'Declined'
         AND province = 'Bangkok'
         GROUP BY type_name, prob_status`
    );
    const [allProbReport3, fields3] = await pool.query(
        `SELECT province, COUNT(prob_id)'probs'
         FROM prob_type
         LEFT OUTER JOIN problem_info
         USING (type_id)
         JOIN location
         USING (location_id)
         GROUP BY province`
    );
    console.log(allProbReport3)
    let reportValue = []
    let reportType = []
    for (let index in allProbReport) {
        reportType.push(Object.values(allProbReport[index])[0]);
        reportValue.push(Object.values(allProbReport[index])[1]);
    }
    console.log(reportType)
    console.log(reportValue)
    let data = { user: user,
                isAdmin:isAdmin,
                 reportValue: reportValue,
                 reportType: reportType };
    data.stats = allProbReport
    res.render("chart", data);
});
exports.router = router;
