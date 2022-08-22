const express = require('express');
const router = express.Router();
const uController = require('../Controller/UserContreller')
const customMiddlewares = require('../Middleware/middleware') 
const { body, validationResult } = require('express-validator');



  

router.get('/',(req,res)=>{
    res.end("Hello")
})

//Create a User  +++++ formidableMiddleware : custom midleware for body 
router.post('/createuser',customMiddlewares.formidableMiddleware,  body('email').isEmail(), body('password').isLength({ min: 5 }), async (req,res)=>{
 

    req.body.photo = "/var/ww/html"
    req.body.resume = "/var/ww/html"

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userExistance = await uController.userExists(req.body);
    if(userExistance.length != 0){
       return res.status(409).send({'error':'User Already Exist'});
    } else {
        const userCreation = await uController.createUser(req.body);
        return res.status(200).send({'result':userCreation});
    }

    
});

//User Login
router.post('/login',customMiddlewares.formidableMiddleware,  body('email').isEmail(), body('password').isLength({ min: 5 }), async (req,res)=>{
   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const userExistance = await uController.userExists(req.body);
    if(userExistance.length == 0){
        res.status(401).send({'error':'User Not Exist'});
    } else {
        const userCreation = await uController.loginUser(req.body,userExistance[0]);
        if(userCreation){
            res.status(200).send({'result':userCreation});
        } else {
            res.status(401).send({'error':"Credentials Not Matched"});
        }
    }

    
});

//User Details
router.get('/userdetails',customMiddlewares.verifyToken, async (req,res)=>{
    const request = JSON.parse(req.user);
    const userExistance = await uController.userExists(request);
    if(userExistance.length == 0){
        res.status(401).send({'error':'User Not Exist'});
    } else {
            res.status(200).send({'result':userExistance[0]});
    }    
});

// //Update User
router.post('/updateuser',customMiddlewares.verifyToken, customMiddlewares.formidableMiddleware,  body('email').isEmail(),  async (req,res)=>{
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const request = JSON.parse(req.user);
    const userExistance = await uController.userExists(request);
    if(userExistance.length == 0){
        res.status(401).send({'error':'User Not Exist'});
    } else { 
         
        const userId = JSON.parse(req.user)
        if(userExistance[0]._id == userId.user_id){
            const userUpdation = await uController.updateUser(req.body,userExistance[0]);
            res.status(200).send({'result':userUpdation});
        } else{
            res.status(409).send({'error':'Email taken already.'});
        }
        
    }    
});


module.exports = router 