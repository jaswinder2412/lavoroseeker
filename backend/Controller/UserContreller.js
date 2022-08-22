const User = require('../Models/User')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator');

 

class UserController{
    constructor (){   
        this.sign = "JaswinderJatt";

    }

    // Create User
    async createUser(req){
        try{
               req.password =   await bcrypt.hash(req.password, 10);
               // Save Data in user collection
               const userCreated = await User.create(req);
               const token = jwt.sign(
                { user_id: userCreated._id, email: userCreated.email },
                this.sign,
                {
                  expiresIn: "8h",
                }
              );
              // again save
              userCreated.token = token;
             return userCreated.token;
        } catch(error){
               console.log(error)
              }
          
        } 
      
    // Update User
    async updateUser(req,userDetails){
        try{
            if(req.password){
                console.log("Password Update")
                req.password =   await bcrypt.hash(req.password, 10);
            } else {
                console.log("Password Not Update")
                req.password = userDetails.password
            }
               // Update Data in user collection
              
               const userUpdated = await User.updateOne({'_id':userDetails._id},req);
               if(req.email != userDetails.email){
                const token = jwt.sign(
                    { user_id: userUpdated._id, email: userUpdated.email },
                    this.sign,
                    {
                      expiresIn: "8h",
                    }
                  );
                   //again save
                  userUpdated.token = token;
               }
              
             return userUpdated;
        } catch(error){
               console.log(error)
              }
          
        } 
        
        // Login User
        async loginUser(req,userDetails){
         try{

            const passwordMatch =   await bcrypt.compare(req.password, userDetails.password);
           
               if(passwordMatch){
                const token = jwt.sign(
                    { user_id: userDetails._id , email : userDetails.email},
                    this.sign,
                    {
                      expiresIn: "8h",
                    }
                  );
                  // again save token
                  userDetails.token = token;
                 return userDetails.token;
               }else {
                return false;
               }
               
         } catch(error){
                console.log(error)
               }
           
         }

    //Check user existance
    async userExists(req){
        try{
              return await User.find({'email':req.email});
        } catch(error){
               console.log(error)
              }
          
        }

    
}

module.exports = new UserController()