const express = require('express')
const upload = require('../config/multer-config')
const productRouter = express.Router()
const Product = require("../model/productScemha")


// productRouter.get("/", (req,res)=>{
//     res.send("hello products")
// })



productRouter.post("/owners/createItem" , upload.single("image"),async(req,res)=>{
    console.log(req.file); // Log file upload info
    console.log(req.body);
  try{
    const { 
        name,
        price,
        discouunt,
        bgColor,
        panelColor,
        textColor
    } = req.body


    const newUpdate =  new Product({
        image: req.file.buffer,
        name,
        price,
        discouunt,
        bgColor,
        panelColor,
        textColor


    })


    const saveData = await newUpdate.save()
    if(!saveData){
        req.flash("error" , "product not created")
        res.redirect("/owners/createItem")
    }else {
        req.flash("success" , "product created")
        res.redirect("/owners/createItem")
    }
  

  }catch(err){
    console.error(err);
    req.flash("error", "An error occurred while creating the product");
    res.redirect("/owners/createItem");
  }
    


    //  res.send(req.file)
    //  res.redirect("/owners/createItem")
})

module.exports=productRouter