const User = require('../Models/User')


class UserController{
    constructr(){
  
    }

   async createUser(req){
    try{
          return await User.create(req);
    } catch(error){
           console.log(error)
          }
      
    }
    
}

module.exports = new UserController