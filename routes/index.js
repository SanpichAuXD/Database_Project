const express = require("express");
const pool = require('../config')


router = express.Router();

router.get("/", async(req,res)=>{
    const user = req.session.userID
    const isAdmin = req.session.isAdmin
    console.log(req.session);
    let data = {user:user,isAdmin:isAdmin}
    // const isAdmin = req.session.isAdmin === undefined ? req.session.isAdmin:false
    // console.log('isAdmin:', req.session.isAdmin)
    // data.user.isAdmin = isAdmin
    console.log(data.isAdmin);
    try {
       const [row,field] = await pool.query('SELECT * FROM user')
    //    console.log(row);
    //    console.log(req.session);
    } catch (error) {
        console.log(error);
    }
    res.render('index',data)
})
router.get("/admin", async (req,res)=>{
    const user = req.session.userID
    let data = {user:user}
    // const isAdmin = req.session.isAdmin||false
    // data.user.isAdmin = isAdmin
    const [admin, fields] = await pool.query(
        `SELECT * FROM user
         join problem_info
         using (user_id)
         join accused
         using (accused_id)
         join prob_type
         using(type_id)
         join organization
         using (org_id)
         join location
         using(location_id)
         `
    )
    data.user = admin
    data.problem = admin
    console.log('admin',data)
    res.render('admin-manager',data)
})
router.get("/adminorg", (req,res)=>{
    const user = req.session.userID
    let data = {user:user}
    // const isAdmin = req.session.isAdmin||false
    // data.user.isAdmin = isAdmin
    res.render('admin-organization',data)
})
router.get("/adminhis", (req,res)=>{
    const user = req.session.userID
    let data = {user:user}
    // const isAdmin = req.session.isAdmin||false
    // data.user.isAdmin = isAdmin
    res.render('admin-manager-histroy',data)
})
router.get("/acc", async (req,res)=>{
    try{
        const user = req.session.userID
        // const isAdmin = req.session.isAdmin||false
       
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
             USING(prob_id) WHERE user_id = ?`, [req.session.userID.user_id]
        )
        let data = {user:user,
                    probUser: probUserDB}
        // data.user.isAdmin = isAdmin
        console.log(data.user)
        // console.log(probUserDB)
        console.log(user)
        if (user.user_id){
            console.log('usereee',user);
            const [member,fields1] = await pool.query(
                `select * from user where user_id = ?`, [user.user_id]
            )
            data.user = member[0]
        }
        else if (user.admin_id){
            console.log('admin');
            const [admin,fields1] = await pool.query(
                `select admin_fname 'user_fname',admin_lname 'user_lname', admin_phone 'user_phone',admin_email 'user_email' from admin where admin_id = ?`, [user.admin_id]
            )
            data.user = admin[0]
        }
        // console.log(data);
        res.render('account',data)

    }catch(err){
        return console.log(err);
    }
})
router.get("/login", (req,res)=>{
    const user = req.session.userID
    let data = {user:user}
    // const isAdmin = req.session.isAdmin||false
    // data.user.isAdmin = isAdmin
    res.render('login',data)
})
router.get("/reg", (req,res)=>{
    const user = req.session.userID
    console.log('reg',user);
    let data = {user:user}
    // const isAdmin = req.session.isAdmin||false
    // data.user.isAdmin = isAdmin
    res.render('register',data)
})
router.get("/repform", (req,res)=>{
    const user = req.session.userID
    let data = {user:user}
    // const isAdmin = req.session.isAdmin||false
    // data.user.isAdmin = isAdmin
    res.render('reportForm',data)
})
router.get("/chart", async (req,res)=>{
    const user = req.session.userID
    const [allProbReport, fields] = await pool.query(
        `SELECT type_name, COUNT(prob_id)
         FROM prob_type
         LEFT OUTER JOIN problem_info
         USING (type_id)
         GROUP BY (type_name)`
    )
    console.log(allProbReport, '<- Chart')
    for(let index in allProbReport){
        console.log(allProbReport[index])
    }
    let data = {user:user}
    // const isAdmin = req.session.isAdmin||false
    // data.user.isAdmin = isAdmin
    res.render('chart',data)
})
exports.router = router;