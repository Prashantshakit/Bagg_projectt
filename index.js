const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const connectionDb = require("./mongoose/connectiondb")
const ownerRouter = require("./routes/ownerRouter")
const userRouter = require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes")
const appRouter = require("./routes/appRouter")
const session = require("express-session")
const flash = require("connect-flash")
const cookieParser = require("cookie-parser")
// const dotenv = require('dotenv').config()

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.locals.header = 'header.ejs'; // Set the header view
    next();
});



app.set("view engine", "ejs")
app.set("views", "./views")
app.use(express.json())
app.use(cookieParser())
app.use(express.static("public"));
// app.render("header.ejs")
app.use(session({
    secret:process.env.SECCRET_KEY,
    resave:false,
    saveUninitialized:true
}))

app.use(flash())

app.use("/" , appRouter)
app.use("/owners",ownerRouter )
app.use("/users" , userRouter)
app.use("/" , productRouter)

connectionDb().then(()=>{
    console.log("database is established")    
app.listen(port,(req,res)=>{
    console.log(`server is listening+${port}  `)
})
})
