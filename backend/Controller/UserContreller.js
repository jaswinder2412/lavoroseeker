const User = require('../Models/User')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

 

class UserController{
    constructor (){   
        this.sign = "JaswinderJatt";

    }

    // Create User
   async createUser(req){
    try{
           req.password =   await bcrypt.hash(req.password, 10);
           // Save Data

           const userCreated = await User.create(req);
           const token = jwt.sign(
            { user_id: userCreated._id },
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