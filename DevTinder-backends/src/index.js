const express = require("express")
const app = express();
const connectdb = require("./config/database")
const cookieparser = require("cookie-parser")

app.use(cookieparser())
app.use(express.json())

const authrouter = require("./router/authrouter");
const profilerouter = require("./router/profile");
const requestrouter = require("./router/request");
const userrouter = require("./router/user");

app.use("/",authrouter);
app.use("/",profilerouter);
app.use("/",requestrouter); 
app.use("/",userrouter);

connectdb().then(()=>{
    console.log("dadtabase connected")
    app.listen(7777,()=>{
        console.log("I am listing brother")
    })
}).catch((err)=>{
    
    console.log(`database error : ${err}`);
});