const express = require("express");

const authrouter = express.Router();
const {validatesignupdata,validateloginupdata} = require("../utils/validation")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");
const User = require("../models/User")
const {userauth} = require("../middleware.js/userauth")

authrouter.use(cookieparser())
authrouter.use(express.json())

authrouter.post("/signup", async (req,res)=>{
    //validation of data
    try{
    validatesignupdata(req);
    const { firstname, lastname, emailid, password, age } = req.body;
    //Encrypt Password
    const passhash = await bcrypt.hash(password,10);
    console.log(passhash);
    
    const user = new User({firstname,lastname,emailid,password: passhash})
    
        await user.save();
        res.send("add succesfully");

    }
    catch(err){
        console.log(`/signup :${err}`)
    }    
})
authrouter.post("/login",async (req,res)=>{
    try{
        validateloginupdata(req);
        const {emailid,password} = req.body;
        const user = await User.findOne({emailid:emailid});
        if(!user){
            throw new Error("User not available");
        }
        const isPassValid = await bcrypt.compare(password,user.password);

        if(isPassValid){
            const token = jwt.sign({_id: user._id},"@omdon",{expiresIn : "1d"})
            res.cookie("token",token,{expires : new Date(Date.now() + 8 * 3600000),});
            res.send("LogIn successful");
        }else{
            throw new Error("Password is not Valid");
        }
    }
    catch(err){
        res.status(500).send("Error Occured" + err)
    }
})

authrouter.post("/logout", async (req, res) => {
    try{
        res.cookie("token", null, { expires: new Date(Date.now()) });
        res.send("LogOut Successful");
    }
    catch(err){
        res.status(500).send("Error Occured" + err);
    }
});



module.exports = authrouter;