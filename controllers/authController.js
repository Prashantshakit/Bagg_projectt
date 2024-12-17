 const express = require("express")
const User = require("../model/userScehma")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv").config()


const registeruser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
            // return res.status(400).json({ message: "User with this email is already registered" });
            req.flash("error", "User with this email is already registered" );
            return  res.redirect("/");
        }

        // Hash the password
        const hashpassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            fullName,
            email,
            password: hashpassword,
        });

    
        const saveData = await newUser.save();
        if (!saveData) {
            // return res.status(400).json({ message: "User registration failed" });
            req.flash("error", "User registration failed" );
            return  res.redirect("/");
            
        }

     
             res.redirect("/")
      
    } catch (err) {
        console.error(err);
        // res.status(400).json({ message: err.message });
        req.flash("error",err.message );
         res.redirect("/");
    }
};




// const loggedInUser = async(req,res)=>{

//      try {
//         const {email , password} = req.body
       
//         const user = await User.findOne({email})

//           if(!user){
//             throw new Error('email is not registered')
//           }


//         const compare  = await bcrypt.compare(password, user.password)
//         if(!compare ){
//              res.status(400).json({message:"password is incorrect"})
//         }


//         //  creation of webtoken
//         const token = await jwt.sign({_id:user._id} , process.env.SECCRET_KEY )
        
//         // NOW PUT IN COKKIE

//          res.cookie("token", token)

//            res.send(`${user.fullName} is logged suucefully`)
//         //    res.render("shop")


//      }catch (err){
//         console.log(err)
//         res.status(400).json({message:"something went wrong" , error:err})
//      }
  
// }


// const loggedInUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find the user in the database
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(400).json({ message: "Email is not registered" });
//         }

//         // Compare the hashed password with the provided password
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.status(400).json({ message: "Password is incorrect" });
//         }

//         // Generate a JWT token
//         const token = await jwt.sign({ _id: user._id }, process.env.SECCRET_KEY);

//         // Set the token in a cookie
//         res.cookie("token", token, { httpOnly: true });

//         // Redirect to the 'shop' page
//         return res.render("shop", { user: user.fullName }); // Pass user details for rendering
//     } catch (err) {
//         console.error(err);
//         return res.status(400).json({ message: "Something went wrong", error: err.message });
//     }
// };

const loggedInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) throw new Error("Email is not registered");

        const compare = await bcrypt.compare(password, user.password);
        if (!compare) {
            // return res.status(400).json({ message: "Password is incorrect" });
            req.flash("error", "password is incorrect" );
            res.redirect("/");
        }

        const token = jwt.sign({ _id: user._id , email:user.email}, process.env.SECCRET_KEY);
        res.cookie("token", token)

        res.redirect("/shop");
    } catch (err) {
        req.flash("error",err.message );
         res.redirect("/");
    }
};

const logOutUser = async (req, res) => {
        
    res.cookie = ("token" , null , {
         expires:new Date(Date.now())
    })
    const error = req.flash("error")
    res.render("index" , {error , logged:false});

}


module.exports = {
    registeruser, loggedInUser, logOutUser
}