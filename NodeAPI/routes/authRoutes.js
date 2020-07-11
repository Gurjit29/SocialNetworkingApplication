var express=require('express');
var Router=require('Router');

var {register}=require('../controllers/auth');

var router=express.Router();

router.post('/register',register);


module.exports=router;