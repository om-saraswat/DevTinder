const express = require("express")
// const userauth = require("./middleware.js/userauth");
const app = express();
const connectdb = require("./config/database")
const User = require("./models/User")
const {validatesignupdata, validateloginupdata} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieparser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const {userauth} = require("./middleware.js/userauth")

app.use(cookieparser())
app.use(express.json())


const authrouter = require("./router/authrouter");
const profilerouter = require("./router/profile");
const requestrouter = require("./router/request");
app.use("/",authrouter);
app.use("/",profilerouter);
app.use("/",requestrouter); 


connectdb().then(()=>{
    console.log("dadtabase connected")
    app.listen(7777,()=>{
        console.log("I am listing brother")
    })
}).catch((err)=>{
    
    console.log(`database error : ${err}`);
})

 