var express=require('express');
var Router=require('Router');

var router=express.Router();

router.get("/user",(req,res)=> {
    res.send("User Route");
})





module.exports = router;

