const express = require('express')
const { registeruser, loggedInUser, logOutUser } = require('../controllers/authController')
const userRouter = express.Router()


userRouter.get("/",(req,res)=>{
    res.send("hello users")
})

userRouter.post ("/register" , registeruser)


userRouter.post("/login" , loggedInUser)


userRouter.post("/logOut" , logOutUser )




module.exports= userRouter