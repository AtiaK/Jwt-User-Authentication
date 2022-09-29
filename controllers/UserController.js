const UserModel=require('../models/User');
const GenerateToken=require('../token/SignJwtToken');
const VerifySSOToken=require('../token/VerifyJwtToken');
const crypto = require('crypto');

module.exports={
    async registerUser(req,res){
        const {firstName,lastName,email,password}=req.body;
        const userExists =await UserModel.findOne({email})
        if(userExists) return res.status(400).send({message:"Email already exists!"})
        const encryptedPassword = crypto.createHmac('sha256', 'secret')
        .update(password)
        .digest('hex');
        const newUser = new UserModel({firstName,lastName,email,password:encryptedPassword})
        await newUser.save()
        return res.send({message:"User is Registered!"})
    },
    async loginUser(req,res){
        const {email,password}=req.body;
        const encryptedPassword  = crypto.createHmac('sha256', 'secret')
        .update(password)
        .digest('hex');
        const userExists =await UserModel.findOne({email,password:encryptedPassword})
        if(!userExists) return res.status(400).send({message:"No such user!"})
        const token=GenerateToken(userExists._id.toJSON())

        return res.send({message:"Logged in!",token})
    },
    async meUser(req,res){
      const token=req.headers["authorization"]
      if(!token) return res.status(401).send({message:"Please Provide token!"})      
      const verifyToken=await VerifySSOToken(token.split(' ')[1])
      if(!verifyToken) return res.status(401).send({message:"Unauthorized!"})
      const meUser=await UserModel.findById(verifyToken.id)
      return res.send({meUser,message:"success!"})
    },

}