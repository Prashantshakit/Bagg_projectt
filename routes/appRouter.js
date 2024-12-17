const express = require("express")
const isLoggedIn = require("../middlewares/isLoggedIn")
const appRouter = express.Router()
const products = require("../data.js/bagData")
const Product = require("../model/productScemha")
const User =  require("../model/userScehma")


let productsLoaded = false;

const loadProductsOnce = async () => {
    // Only load products if they haven't been loaded yet
    if (!productsLoaded) {
        const dbProducts = await Product.find();
        console.log(dbProducts)

        dbProducts.forEach((dbProduct) => {
            // Check if product already exists in the array
            const exists = products.some(product => product.toString &&  product._id.toString() === dbProduct._id.toString());
            if (!exists) {
                let imageBase64 = '';
                if (Buffer.isBuffer(dbProduct.image)) {
                    imageBase64 = dbProduct.image.toString('base64');
                    console.log("Base64 Image String: ", imageBase64);
                }


    

                // Add the product to the array
                products.push({
                    _id: dbProduct._id,
                    name: dbProduct.name,
                    price: dbProduct.price,
                    bgcolor: dbProduct.bgcolor,
                    panelcolor: dbProduct.panelcolor,
                    textcolor: dbProduct.textcolor,
                    image: `data:image/jpeg;base64,${imageBase64}` // Embed base64 image
                });
            }
        });

        // Set the flag to true to prevent reloading products
        productsLoaded = true;
    }
};

appRouter.get("/shop", isLoggedIn, async (req, res) => {
 

    await loadProductsOnce();
     const success = req.flash("success")
    // Render the shop page
    res.render("shop", {
        products,
        user: req.user ? req.user.fullName : null,
        success:success // Include user data if logged in
    },);
});

appRouter.get("/addToCart/:id", isLoggedIn, async(req, res) => {
     
    //   console.log(req.user)
    const userId = await User.findOne({email:req.user.email})

    userId.cart.push(req.params.id)
       await userId.save()
       req.flash("success" , "added to cart")
       res.redirect("/shop");
});


appRouter.get("/", (req, res) => {
    const error = req.flash("error") || ""; // Flash error, or default to an empty string
    res.render("index", { error , logged:false }); // Pass 'error' to the EJS file
});





module.exports = appRouter