const express = require("express");
const pool = require('../config')
const path = require('path')
const multer = require('multer')

router = express.Router();
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './static/uploads') // path to save file
    },
    filename: function (req, file, callback) {
      // set file name
      callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })
  const upload = multer({ storage: storage })
router.post('/sendprob',
 upload.array('prob_img'),
  async(req,res,next)=>{
    const files = req.files
    // console.log('sad',req.files);
    if (!files) {
        
        return res.send('NO FILE IDIOT')
      }
    const  { type, address,province, district, subdistrict, date, desc,accused,accused_detail} = req.body
    const user = req.session.userID
    // console.log(req.body);
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try {
      let addLo = await conn.query(
        "INSERT INTO location(street_address,province,district,sub_district) VALUES(?,?,?,?);",
        [address,province,district,subdistrict]
      )
      const locaId = addLo[0].insertId;
      let addAccused = await conn.query(
        "INSERT INTO accused(accused_type,accused_detail) VALUES(?,?);",
        [accused,accused_detail]
      )
      const accuId = addAccused[0].insertId;
      let results2 = await conn.query(
        "INSERT INTO problem_info(user_id,type_id,prob_time,location_id,prob_detail,prob_status,accused_id) VALUES(?,?,?,?,?,?,?)",
        [req.session.userID.user_id,type,date,locaId,desc.trim(),'Verifying',accuId]
      )  
      const probId = results2[0].insertId
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        await conn.query(
          "INSERT INTO prob_image (img_link, prob_id) VALUES (?, ?);",
          [file.path.substr(6), probId]
        );
      }

      await conn.commit()
      res.redirect('/')
    } catch (err) {
      await conn.rollback();
      next(err);
    } finally {
      console.log('finally')
      conn.release();
    }
});





exports.router = router;