var express=require('express');

exports.registrationValidation = (req,res,next) =>{

    //check for empty name
    req.check("name","Name is required").notEmpty();

    //check for invalid email 

    //format of regex => string@string.string
    var emailRegex =/\S+@\S+\.\S+/;

    req.check("email")
    .matches(emailRegex)
    .withMessage("Please enter a valid email address")

   //check for digits - atleast one or more digit in password
    var digitRegex = /\d/;

    req.check("password")
    .isLength({min: 6})
    .withMessage("Password must be atleast 5 characters long")
    .matches(digitRegex)
    .withMessage("Password must have a digit")

    


    var errors=req.validationErrors();

    if(errors){

        //msg is property in validation errors array like = > [{ msg: "" }] --> so use map()
       const firstError=errors.map((error)=> error.msg)[0]

        return res.status(400).json({
            error:firstError
        });
    }

    //Next so that it proceeds to register if no errors are found
    next();

   

}