var express=require('express');
var Router=require('Router');

var {storeLoggedInUser,isAuthorized}=require('../controllers/user');
var {postQuestion,getAllQuestions}=require('../controllers/questions');
var {loginRequired}=require('../controllers/auth');
const { route } = require('./userRoutes');


var router=express.Router();

router.post("/question/new/:userId",loginRequired,isAuthorized,postQuestion);
router.get('/questions',getAllQuestions);

router.param("userId",storeLoggedInUser);

module.exports=router;

