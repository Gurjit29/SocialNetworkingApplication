const mongoose =require('mongoose');
// const uuidv1=require('uuidv1');

const userSchema=mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password:{
        type:String,
        trim: true,
        required: true
    },
    hashtagSubscriptions: [{
        type: String,
        trim: true
    }],
    created: {
        type: Date,
        default: Date.now
    }
}) ;


//export User model
module.exports=mongoose.model("User",userSchema);

