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
 upload.single('prob_img'),
  async(req,res,next)=>{
    const file = req.file
    console.log(req.file);
    if (!file) {
        
        return res.send('NO FILE IDIOT')
      }
    const  { type, address,province, district, subdistrict, date, desc} = req.body
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try {
      let results = await conn.query(
        "INSERT INTO location(street_address,province,district,sub_district) VALUES(?,?,?,?);",
        [address,province,district,subdistrict]
      )
      const locaId = results[0].insertId;
      let results2 = await conn.query(
        "INSERT INTO problem_info(user_id,type_id,prob_time,location_id,prob_detail,prob_status) VALUES(1,?,?,?,?,?)",
        [type,date,locaId,desc,'Pending']
      )  
      const probId = results2[0].insertId
      await conn.query(
        "INSERT INTO prob_image( img_link,prob_id) VALUES(?, ?);",
        [ file.path.substr(6), probId,])

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