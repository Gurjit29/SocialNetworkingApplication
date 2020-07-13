var express=require('express');
var Router=require('Router');

var {storeLoggedInUser,isAuthorized}=require('../controllers/user');
var {postQuestion}=require('../controllers/questions');
var {loginRequired}=require('../controllers/auth');


var router=express.Router();

router.post("/question/new/:userId",loginRequired,isAuthorized,postQuestion);

router.param("userId",storeLoggedInUser);

module.exports=router;

