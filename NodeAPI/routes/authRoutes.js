var express=require('express');
var Router=require('Router');

var {register}=require('../controllers/auth');
var {registrationValidation}=require('../validator/validation');

var router=express.Router();

router.post('/register',registrationValidation, register);


module.exports=router;