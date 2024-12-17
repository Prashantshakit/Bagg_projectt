const express = require('express')
const ownerRouter = express.Router()
const Owner = require("../model/ownersSchema")



ownerRouter.get("/", (req,res)=>{
    res.send("hello owner")
})


ownerRouter.post("/create" , async(req,res)=>{

    try{
        const {fullName, email , password} = req.body
        // const ownerLenth = await Owner.find()
     
        if(!fullName || !email || !password){
            res.status(400).send("feilds are mandatory ")

        }



        const newUser = new Owner({
            fullName,
            email,
            password
        })

       const saveData =  await newUser.save()
       if(saveData){
        res.status(200).json( { message:"user created succesfully", fullName,email,})
       }else{

        res.status(400).json({message:"user is not be created"})
       }
    
   

    }catch(err){
        console.log(err)
        res.status(400).json({errr:err})

    }
   
})


ownerRouter.get("/createItem",(req,res)=>{
     const success  = req.flash("success")||""
    res.render("createproducts.ejs" , {success})

})


module.exports=ownerRouter