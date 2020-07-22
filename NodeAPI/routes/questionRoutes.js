var express=require('express');
var Router=require('Router');

var {storeLoggedInUser,isAuthorized}=require('../controllers/user');
var {postQuestion,postComment,getAllQuestions,storeQuestionInfo}=require('../controllers/questions');
var {loginRequired}=require('../controllers/auth');
var {questionValidation}=require('../validator/validation');


var router=express.Router();

router.post("/question/new/:userId",loginRequired,isAuthorized,questionValidation,postQuestion);
router.get('/questions',getAllQuestions);
router.post("/comment/on/:questionId/by/:userId",loginRequired,isAuthorized,postComment);


router.param("userId",storeLoggedInUser);
router.param("questionId",storeQuestionInfo);


module.exports=router;

