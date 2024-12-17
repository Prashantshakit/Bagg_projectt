const mongoose = require('mongoose')



const User =  new mongoose.Schema({

    fullName:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    cart:[{
        type:mongoose.Schema.Types.Mixed,
        ref:"product"
    }],
    isAdmin:Boolean,
    orders:{
        type:Array,
        default:[]
    },
    contact:{
          type:String
    }
    ,
    pictures:{
        type:String
    }

})


module.exports =  mongoose.model("User" , User)