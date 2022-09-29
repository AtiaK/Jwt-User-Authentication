var express = require('express');
var router = express.Router();
const {validationResult } = require('express-validator');
const UserController = require('../controllers/UserController')
const {registerValidation,loginValidation} =require('../validators/UserValidator')

// register user
router.post('/',
  registerValidation,
  function(req, res) { 
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      UserController.registerUser(req,res)
});

//user login
router.post('/login',
  loginValidation,
  function(req, res) {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    UserController.loginUser(req,res)
});

//get user me
router.get('/me',
  function(req, res) {
    UserController.meUser(req,res)
});

module.exports = router;
