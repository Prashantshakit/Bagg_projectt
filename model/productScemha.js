const mongoose = require("mongoose")



const Product = new mongoose.Schema({
    image:Buffer,
    name:String,
    price:Number,
    discouunt:{
        type:Number,
        default:0
    },
    bgColor:String,
    panelColor:String,
    textColor:String
})

module.exports = mongoose.model("product",Product)