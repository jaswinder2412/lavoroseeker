const express = require('express');
const router = express.Router();
const uController = require('../Controller/UserContreller')



router.get('/',(req,res)=>{
    res.end("Hello")
})

//Create a User 
router.post('/createuser', async (req,res)=>{
    req.fields.photo = "/var/ww/html"
    req.fields.resume = "/var/ww/html"
    const userExistance = await uController.userExists(req.fields);
    if(userExistance.length != 0){
        res.status(409).send({'error':'User Already Exist'});
    } else {
        const userCreation = await uController.createUser(req.fields);
        res.status(200).send({'result':userCreation});
    }

    
});


module.exports = router 