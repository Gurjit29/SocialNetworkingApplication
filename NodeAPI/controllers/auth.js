var express=require('express');
var User=require('../models/user');

//For password encryption
var Bcrypt=require('bcryptjs');

//User Registration/signUp
exports.register = async (req,res) => {

    try{

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
        
        return res.status(200).json(result);


    } catch(error){

        return res.status(400).json(error);
    }



}



/**
 * Reference for password encryption: https://www.thepolyglotdeveloper.com/2019/02/hash-password-data-mongodb-mongoose-bcrypt/
 */