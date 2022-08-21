const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    userId : ObjectId,
    userType : { type: Number, default: 1, require: true },
    fName: { type: String, default: 'ABC', require: true },
    lName: { type: String, default: 'hahaha', require: true },
    age: { type: Number, min: 18, index: true },
    email: { type: String, unique:true, require: true },
    address: { type: String, index: true },
    phone: { type: Number,  index: true },
    bio: { type: String, match: /[a-z]/ },
    date: { type: Date, default: Date.now },
    photo : {type : String},
    resume : {type: String}
  });

  const User = mongoose.model('User', UserSchema); 
module.exports = User;