var express=require('express');
var User=require('../models/user');


exports.storeLoggedInUser=(req,res,next,id) => {

    User.findById(id).exec((err,user) => {

        if(err || !user){
            return res.status(401).json({error:"You are not authorized to perform this action unfortunately..."});
        }

        //if user is found then append its information to "req" object
        req.profile= user;
        
    
        next();
    })

}

exports.isAuthorized=(req,res,next) => {

    //currently logged in user is stored in "auth" object and "profile" is populated whenever :userId is spotted in URL/route
    const userIsAuthorized = req.profile && req.auth && req.profile._id==req.auth.id;

    //Give error if user is unauthorized
    if(!userIsAuthorized){
        return res.status(400).json({error:"Sorry, you are not authorized to perform this action"});
    }

    //proceed to next middleware if user is authorized
    next();
}

exports.getAllUsers=(req,res) => {

    User.find
    ((err,users) => {

        if(err){
           return res.status(400).json({error:"Encountered a error with getting users from database"});
        }

        return res.status(200).json({users});


    }).select("_id name email created") ;
}