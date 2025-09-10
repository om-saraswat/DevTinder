const express = require("express");
const {userauth} = require("../middleware.js/userauth")
const profilerouter = express.Router();
const {validateprofileeditdata,validPassword} = require("../utils/validation")
const User = require("../models/User")
const bcrypt = require("bcryptjs");

profilerouter.get("/profile/view",userauth,async(req,res)=>{
    try{
        const user = req.user;
        res.send(user);
    }
    catch(err){
        console.log(`Error : ${err}`);
        res.status(500).send("Internal Server Error");
    }
})
profilerouter.patch("/profile/edit",userauth,async(req,res)=>{
    try{
        validateprofileeditdata(req);
        const user= req.user
        const updates = Object.keys(req.body);
        const allowedUpdates = ["firstname","lastname","age","about","photoUrl"];
        const isValidOperation = updates.every((update)=>allowedUpdates.includes(update));
        if(!isValidOperation){
            return res.status(400).send({error : "Invalid Updates!"});
        }
        updates.forEach((update)=> user[update] = req.body[update]);
        
        await user.save();
        res.send(user);
    }
    catch(err){
        console.log(`Error : ${err}`);
        res.status(500).send("Internal Server Error");
    }
})

profilerouter.patch("/profile/changepassword",userauth,async(req,res)=>{
    try{
        const user = req.user
        const pass = req.body;
        const currPassword = pass.currPassword;
        const newPassword = pass.newPassword;
         if (!currPassword || !newPassword) {
      return res.status(400).send("Both currentPassword and newPassword are required");
    }
        validPassword(currPassword);
        validPassword(newPassword);
        const isPassValid = await bcrypt.compare(currPassword,user.password);
        if(!isPassValid){
            throw new Error("Current Password is not match")
        }
        const passhash = await bcrypt.hash(newPassword,10);
        user.password = passhash;
        await user.save()
        res.send("password changed");
    }
    catch(err){
        res.status(500).send("Error Occured" + err)
    }
});

module.exports = profilerouter;