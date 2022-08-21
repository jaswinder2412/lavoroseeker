const express = require('express');
const router = express.Router();
const uController = require('../Controller/UserContreller')
const authCheck = require('../Middleware/auth')


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

//User Login
router.post('/login', async (req,res)=>{
    const userExistance = await uController.userExists(req.fields);
    if(userExistance.length == 0){
        res.status(401).send({'error':'User Not Exist'});
    } else {
        const userCreation = await uController.loginUser(req.fields,userExistance[0]);
        if(userCreation){
            res.status(200).send({'result':userCreation});
        } else {
            res.status(401).send({'error':"Credentials Not Matched"});
        }
    }

    
});

//User Details
router.get('/userdetails',authCheck, async (req,res)=>{
    const request = JSON.parse(req.user);
    const userExistance = await uController.userExists(request);
    if(userExistance.length == 0){
        res.status(401).send({'error':'User Not Exist'});
    } else {
            res.status(200).send({'result':userExistance[0]});
    }    
});

//Update User
router.post('/updateuser',authCheck, async (req,res)=>{
    const request = JSON.parse(req.user);
    const userExistance = await uController.userExists(request);
    if(userExistance.length == 0){
        res.status(401).send({'error':'User Not Exist'});
    } else { 
         
        const userId = JSON.parse(req.user)
        if(userExistance[0]._id == userId.user_id){
            const userUpdation = await uController.updateUser(req.fields,userExistance[0]);
            res.status(200).send({'result':userUpdation});
        } else{
            res.status(409).send({'error':'Email taken already.'});
        }
        
    }    
});


module.exports = router 