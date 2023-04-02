const express = require("express");



router = express.Router();

router.get("/", (req,res)=>{
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
exports.router = router;