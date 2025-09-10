const express = require("express");
const { userauth } = require("../middleware.js/userauth");
const connectionreqmodel = require("../models/ConnectionReq");
const userRouter = express.Router();
const User = require("../models/User")

userRouter.get("/user/requests/recieved",userauth,async(req,res) => {
    try{

        const loggedIn = req.user;

        const connectionrequest = await connectionreqmodel.findOne({
            toUserId : loggedIn._id
        })
        .populate("fromUserId",["firstname","lastname"])
        .populate("toUserId",["firstname","lastname"])
        res.send(connectionrequest);
    }
        
    catch(err){
        res.status(404).send("Error occured" + err);
    }
})

userRouter.get("/user/connections",userauth,async(req,res)=>{
    try{
    
        const loggedIn = req.user;
        
        const connectionreqs = await connectionreqmodel.find({
            $or : [
                {toUserId : loggedIn._id,status:"accepted"},{fromUserId : loggedIn._id,status:"accepted"}
            ]
        }).populate("fromUserId",["firstname","lastname"]).populate("toUserId",["firstname","lastname"]);
 
        const data = connectionreqs.map(row => row.fromUserId);
        res.json({data});
    }
    catch(err){
        res.status(404).send("Error Occured " + err)
    }
})

module.exports = userRouter;