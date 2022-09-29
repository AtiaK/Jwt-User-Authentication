const jwt=require('jsonwebtoken')
require('dotenv').config();

module.exports = (userId) => (
    'Bearer ' + jwt.sign({ id: userId},
        process.env.TOKEN_SECRET,{expiresIn:process.env.TOKEN_EXPIRY})
);

