const { body } = require('express-validator');
 
exports.registerValidation = [
    body('firstName', 'Name is requied').not().isEmpty(),
    body('lastName','Last name is required!').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    body('password')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('must contain a number'), 
    body('confirmPassword')
    .custom(async (confirmPassword, {req}) => {
      const password = req.body.password
      if(password !== confirmPassword){
        throw new Error('Passwords must be same')
      }
    }),
]
 
exports.loginValidation = [
     body('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
     body('password', 'Password must be 5 or more characters').isLength({ min: 5 })
 
]