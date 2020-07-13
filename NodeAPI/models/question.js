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
    },
    postedBy: {
          type: mongoose.Schema.ObjectId,
          ref: "User"
        }  
}) ;

module.exports=mongoose.model("Question",questionSchema);

/**
 * Reference for models : https://bezkoder.com/mongoose-one-to-many-relationship/
 */

