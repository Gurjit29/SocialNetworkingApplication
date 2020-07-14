var express=require('express');
var Router=require('Router');

var {storeLoggedInUser,isAuthorized}=require('../controllers/user');
var {postQuestion,getAllQuestions}=require('../controllers/questions');
var {loginRequired}=require('../controllers/auth');
var {questionValidation}=require('../validator/validation');


var router=express.Router();

router.post("/question/new/:userId",loginRequired,isAuthorized,questionValidation,postQuestion);
router.get('/questions',getAllQuestions);

router.param("userId",storeLoggedInUser);


module.exports=router;

