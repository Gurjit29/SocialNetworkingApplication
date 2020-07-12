var express=require('express');
var User=require('../models/user');

exports.getAllUsers=(req,res) => {

    User.find
    ((err,users) => {

        if(err){
           return res.status(400).json({error:"Encountered a error with getting users from database"});
        }

        return res.status(200).json({users});


    }).select("_id name email created") ;
}