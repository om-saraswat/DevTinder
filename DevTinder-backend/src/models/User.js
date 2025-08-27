const mongoose = require("mongoose")
const validator = require("validator")

const user = mongoose.model("user",mongoose.Schema({
    firstname : {
        type : String,
        required : true,
        trim : true,
        minLength : 2,
    },
    lastname : {
        type : String,
        trim : true,
    },
    emailid : {
        type : String,
        lowercase: true,
        unique : true,
        required : true,
        trim : true,
        validate(input){
            if(!validator.isEmail(input)){
                throw new Error("Email id is not good")
            }
        }
    },
    password : {
        type : String,
        validate(input){
            if(!validator.isStrongPassword(input)){
                throw new Error("Email id is not good")
            }
        }
    },
    age : {
        type : Number,
        min : 18,
    },
    gender : {
        type : String
    },
    photoUrl: {
        type : String,

    },
    about : {
        type : String,
    },
    skills : {
        type : [String],
    }
}
,{timestamps:true}
))

module.exports = user;
