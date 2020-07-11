var express=require('express');
var User=require('../models/user');

//For password encryption
var Bcrypt=require('bcryptjs');

exports.register = async (req,res) => {

    try{

        const userExists = await User.findOne({email: req.body.email});

        if(userExists) return res.status(403).json({
                error: "Email is taken"
            });

        req.body.password=Bcrypt.hashSync(req.body.password,10);
        var user=new User(req.body);
        var result = await user.save();
        
        return res.status(200).json(result);



    } catch(error){

        return res.status(400).json(error);
    }



}



/**
 * Reference for password encryption: https://www.thepolyglotdeveloper.com/2019/02/hash-password-data-mongodb-mongoose-bcrypt/
 */