var express=require('express');
var Router=require('Router');

var {register,login,signOut}=require('../controllers/auth');
var {registrationValidation}=require('../validator/validation');


var router=express.Router();

router.post('/register',registrationValidation, register);
router.post('/login',login);
router.post('/signout',signOut);


module.exports=router;