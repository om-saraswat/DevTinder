const express = require("express");
const {userauth} = require("../middleware.js/userauth")
const profilerouter = express.Router();

profilerouter.get("/profile",userauth,async(req,res)=>{
    try{
    res.send("hello");
    }
    catch(err){
        console.log(`Error : ${err}`);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = profilerouter;