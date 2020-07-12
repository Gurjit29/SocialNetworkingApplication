const mongoose=require('mongoose');

const questionSchema=mongoose.Schema({

    title : {
        type:String,
        required: true,
        trim: true
    } ,
    body : {
        type: String,
        required: true,
        trim: true
    },
    created :{
        type: Date,
        default: Date.now()
    } ,
    hashtags: {
        type: String,
        trim: true
    }
}) ;

module.exports=mongoose.model("Question",questionSchema);

