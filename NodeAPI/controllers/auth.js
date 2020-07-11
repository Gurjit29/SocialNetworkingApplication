var express=require('express');
var User=require('../models/user');

//For password encryption
var Bcrypt=require('bcryptjs');

exports.register = async (req,res) => {

    try{

        req.body.password=Bcrypt.hashSync(req.body.password,10);
        var user=new User(req.body);
        var result = await user.save();
        
        return res.status(200).send(result);



    } catch(error){

        return res.status(400).send(error);
    }



}



/**
 * Reference for password encryption: https://www.thepolyglotdeveloper.com/2019/02/hash-password-data-mongodb-mongoose-bcrypt/
 */