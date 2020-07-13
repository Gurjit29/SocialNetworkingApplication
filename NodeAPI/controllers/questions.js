var express=require('express');
var Question=require('../models/question');

exports.postQuestion= (req,res) => {


    
   var question= new Question(req.body);

   req.profile.password=undefined;
   question.postedBy=req.profile;

   question.save( (err,question) => {

    if(err){
        return res.status(400).json({error:"The request cannot be completed. Try again please!"});
    }

    return res.status(200).json({question});
   }).populate("createdBy","_id name");
  
}