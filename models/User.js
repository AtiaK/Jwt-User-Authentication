const mongoose = require('mongoose');

// Create User Schema
const userSchema = new mongoose.Schema(
    {
        firstName: {type:String,required:true},
        lastName:{type:String,required:true},
        email:{type:String,required:true},
        password:{
            type:String,
            required:true,
            select:false
        },
    },
  { timestamps: true }
);

module.exports = mongoose.model('users', userSchema);