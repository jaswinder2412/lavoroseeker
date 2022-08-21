const express = require('express');
const router = express.Router();
const UControllre = require('../Controller/UserContreller')



router.get('/',(req,res)=>{
    res.end("Hello")
})

//Create a User 
router.post('/createuser', async (req,res)=>{
    req.fields.photo = "/var/ww/html"
    req.fields.resume = "/var/ww/html"
     const userCreation = await UControllre.createUser(req.fields);
     res.send(userCreation);
});


module.exports = router 