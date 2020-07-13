var express=require('express');
var Question=require('../models/question');
const post = require('../../../SocialNetworkingApp/NodeAPI/models/post');

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