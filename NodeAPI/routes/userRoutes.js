var express=require('express');
var Router=require('Router');

var router=express.Router();

var {getAllUsers}=require('../controllers/user');
var {loginRequired}=require('../controllers/auth');

router.get("/users",getAllUsers);





module.exports = router;

