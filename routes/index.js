const express = require("express");
const pool = require('../config')


router = express.Router();

router.get("/", async(req,res)=>{
    try {
       const [row,field] = await pool.query('SELECT * FROM user')
       console.log(row);
    } catch (error) {
        console.log(error);
    }
    res.render('index')
})
router.get("/admin", (req,res)=>{
    res.render('admin')
})
router.get("/acc", (req,res)=>{
    res.render('account')
})
router.get("/login", (req,res)=>{
    res.render('login')
})
router.get("/reg", (req,res)=>{
    res.render('register')
})
router.get("/repform", (req,res)=>{
    res.render('reportForm')
})
router.get("/chart", (req,res)=>{
    res.render('chart')
})
exports.router = router;