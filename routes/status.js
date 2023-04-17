const express = require("express");
const pool = require("../config");

router = express.Router();


router.put("/admin/considering/:id", async (req,res,_next) => {
    const user = req.session.userID;
    const isAdmin = req.session.isAdmin;
    let data = { user: user, isAdmin: isAdmin };
    try{
        const [status, fields] = await pool.query(`update problem_info
                                                   set prob_status = "Considering"
                                                   where prob_id = ?`, [req.params.id]);
    }
    catch(err){
        return console.log(err)
    }
    // data.isAdmin = add
    res.redirect('/admin')
})

router.put("/admin/Decline/:id", async (req,res,_next) => {
    const user = req.session.userID;
    const isAdmin = req.session.isAdmin;
    let data = { user: user, isAdmin: isAdmin };
    try{
        const [status, fields] = await pool.query(`update problem_info
                                                   set prob_status = "Declined"
                                                   where prob_id = ?`, [req.params.id]);
    }
    catch(err){
        return console.log(err)
    }
    console.log(data.isAdmin)
    res.redirect('/admin')
})

router.put("/adminorg/update/:id/:status", async (req,res,_next) => {
    const user = req.session.userID;

    const isAdmin = req.session.isAdmin;
    console.log('In Path', req.params.status, req.params.id)
    let data = { user: user, isAdmin: isAdmin };
    try{
        const [status, fields] = await pool.query(`update problem_info
                                                   set prob_status = ?,admin_id = ?
                                                   where prob_id = ?`, [req.params.status,user.admin_id,req.params.id]);
    }
    catch(err){
        return console.log(err)
    }
    // data.isAdmin = add
    res.redirect('/adminorg')
})

router.put("/adminorg/:status", async (req, res) => {
    const user = req.session.userID;
    const isAdmin = req.session.isAdmin;
    const status = req.params.status
    console.log(user)
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
         WHERE   prob_status = ? and org_id = ?
         `,[status,user.org_id]   
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
router.put('/adminhis/:status', async(req,res)=>{
    const [img, field] = await pool.query(
        `SELECT img_id, img_link,prob_id
        FROM prob_image
        join problem_info
        using(prob_id)`
    );
    if(req.params.status === 'accept'){
        const [prob_accept, fields] = await pool.query(
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
             WHERE  prob_status NOT IN ('Declined','Verifying')
             `
        );
        const user = req.session.userID;
        const isAdmin = req.session.isAdmin;
        let data = { user: user, isAdmin: isAdmin,prob:prob_accept };
        data.image = img;
        res.render('admin-manager-histroy',data)
    }
    else if(req.params.status === 'decline'){
        const [prob_decline, fields] = await pool.query(
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
             WHERE  prob_status = 'Declined'
             `
        );
        const user = req.session.userID;
        const isAdmin = req.session.isAdmin;
        let data = { user: user, isAdmin: isAdmin,prob:prob_decline };
        data.image = img;
        res.render('admin-manager-histroy',data)
    }
})
exports.router = router;