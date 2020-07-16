var express=require('express');
var User=require('../models/user');

//For password encryption
var Bcrypt=require('bcryptjs');

var jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');

//User Registration/signUp
exports.register = async (req,res) => {

    

        const userExists = await User.findOne({email: req.body.email});

        //check if user with given email already exists in database
        if(userExists) return res.status(403).json({
                error: "Email is taken"
            });

        //store encrypted password in database
        req.body.password=Bcrypt.hashSync(req.body.password,10);

        //await -- so that node proceeds to next step only after user object is created
        var user= await new User(req.body);

        //await -- so that before going to next step, user is successfully store in database
        var result = await user.save();
        
        return res.status(200).json({result});


    



}


exports.login = (req,res) => {

    const {email,password} = req.body;

    User.findOne({email: email}, (error,user) => {

        //check if email exists?
        if(error || !user) {
            return res.status(401).json({error:"User with given email does not exist"})
        }

        //If email exists compare passwords
        if(!Bcrypt.compareSync(password, user.password)) {
            return res.status(401).send({error: "The password and email do not match!" });
        }

        //json web token - using user id and secret key from .env file (expires in 300 sec)
        const token = jwt.sign({ id: user._id }, process.env.SECRET_JWT_KEY, {
            algorithm: "HS256",
            expiresIn: 300,
        }) ;


        res.cookie("token", token, { maxAge: Date.now() * 1000 });

        const {_id,name,email}=user;

        req.currentUser=user;

        //return json response - will be stored in front end in browsers' local storage
        res.status(200).json({token,user:{_id,name,email}})
        
    })
}

exports.loginRequired = expressJwt(
    {
        secret: process.env.SECRET_JWT_KEY,
        algorithms: ['HS256'],
        userProperty: "auth"
        
    }
    );

exports.signOut=(req,res) => {

    res.clearCookie("token");

    res.status(200).json({message:"You have been signed out!"});
}






/**
 * Reference for password encryption: https://www.thepolyglotdeveloper.com/2019/02/hash-password-data-mongodb-mongoose-bcrypt/
 * Password encryption => https://www.npmjs.com/package/bcrypt
 * JSON Web token authentication => https://www.sohamkamani.com/blog/javascript/2019-03-29-node-jwt-authentication/
 *https://www.npmjs.com/package/express-jwt---middleware for protecting certain routes
 **/