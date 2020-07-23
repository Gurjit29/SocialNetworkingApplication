var express=require('express');
var Question=require('../models/question');
const _ = require("lodash");


exports.postQuestion= (req,res) => {

   var question= new Question(req.body);

   //Done to provide database from being store in "Question" model
   req.profile.password=undefined;

   //Manually populate "postedBy" field using req.profile
   question.postedBy=req.profile;

   question.save( (err,question) => {

    if(err){
        return res.status(400).json({error:"The request cannot be completed. Try again please!"});
    }

    return res.status(200).json({question});
   }).populate("createdBy","_id name");
  
} 

exports.postComment = (req,res) => {

    let question=req.question;

    
    question=_.clone(req.question);
 

    console.log("Body is ==> ",req.body.comments);
   var commentsArr=_.concat(question.comments,req.body.comments);
  // console.log("---------999>>> ",commentsArr);
    question.comments=commentsArr;

    console.log("Data => ",question.commentsBy.name);
    var commentersArr=_.concat(question.commentsBy,req.profile);
    question.commentsBy=commentersArr;
    // question.commentsBy.name=req.profile.name;

    console.log("--->",question.commentsBy);



    question.save((err) => {
        if(err){
           return res.status(400).json({error:"Error! Could not post comment!"})
        }
        return res.status(200).json({question})
    }).populate("commentsBy","_id name")

}



exports.storeQuestionInfo=(req,res,next,id) => {

    Question.findById(id).exec((err,question) => {

        if(err || !question){
            return res.status(401).json({error:"You are not authorized to perform this action unfortunately..."});
        }

        //if user is found then append its information to "req" object
        req.question= question;
        
    
        next();
    })

}

exports.getAllQuestions=(req,res) => {

    Question.find((err,questions) => {

        if(err || !questions) {

            return res.status(401).json({error:"Unable to retrieve questions. May be there are none?"});
        }
        return res.status(200).json({questions});
        
    })
    //populate "postedBy" field with _id name & email of post creator
    .populate("postedBy","_id name email")
}