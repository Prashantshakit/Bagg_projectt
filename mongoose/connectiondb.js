const mongoose = require('mongoose')
const dotenv = require("dotenv").config()



const connectionDb = async()=>{
    await mongoose.connect(process.env.MONGOOSE_URL )
}

module.exports = connectionDb