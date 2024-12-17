const mongoose = require("mongoose")



const Owner = new mongoose.Schema({
    fullName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    products:{
        type:Array,
        default:[]
    }
    ,
    pictures:{
        type:String
    },
     gstin:{
        type:String

        
     }






})



module.exports =  mongoose.model("Owner" ,Owner )