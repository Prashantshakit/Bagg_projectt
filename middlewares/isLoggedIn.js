const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()
const User = require("../model/userScehma")

const isLoggedIn = async(req,res,next)=>{
    // console.log(req.cookies.token)
    // console.log(req.cookies.token._id)
    // console.log("Cookies:", req.cookies);

if(!req.cookies.token){
       req.flash("error", "you need to login first")
       res.redirect("/")
}

 try {
      const decoded = await jwt.verify(req.cookies.token , process.env.SECCRET_KEY)
      if(!decoded){
        throw new Error("something wrong in logged in cookie")
      }
      
      console.log("decodeuser" ,decoded)
      const user = await User.findOne({email:decoded.email}).select("-password")
      
      // console.log("userbytoken" , user )
      req.user = user;  
      next()

 }catch(err){
       res.status(400).json({message:"something went wrong"})
       res.redirect("/")
 }


}


module.exports = isLoggedIn