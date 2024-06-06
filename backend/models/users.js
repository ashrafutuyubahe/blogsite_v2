const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, 
    unique: true     
  },
  userpassword: {
    type: String,
    required: true   
  },
  useremail: {
    type: String,
    required: true,  
    unique:true    
  }
}, {
  timestamps: true  
});


const User = mongoose.model('User', UserSchema);

module.exports = User;
