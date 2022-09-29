const jwt=require('jsonwebtoken')
require('dotenv').config();

module.exports=async (token)=>{
    return await jwt.verify(token, process.env.TOKEN_SECRET, 
        (err, decoded) => {
            if (err) console.log(err);
            return decoded;
        })
}