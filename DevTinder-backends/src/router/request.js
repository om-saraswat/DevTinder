const express = require("express");
const {userauth} = require("../middleware.js/userauth")
const ConnectionReqmodel = require("../models/ConnectionReq");

const reqrouter = express.Router();

reqrouter.post("/request/send/:status/:toUserId",userauth,async(req,res) =>{
    try{
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignore","interested"];
        if(!allowedStatus.includes(status)){
            return res.status(400).send({error : "Invalid Status!"});
        }
        if(fromUserId.toString() === toUserId){
            return res.status(400).send({error : "You cannot send request to yourself"});
        }
        const existingRequest = await ConnectionReqmodel.findOne({
            $or :[
                {fromUserId, toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        });
        if(existingRequest){
            return res.status(400).send({error : "Request already sent"});
        }
        const newRequest = new ConnectionReqmodel({fromUserId, toUserId, status});
        await newRequest.save();
        res.json({message : "Request sent successfully", request : newRequest});
    }
    catch(err){
        res.status(500).send("error is" + err);
    }
})
const mongoose = require("mongoose");

reqrouter.post("/review/:status/:requestId", userauth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const { status, requestId } = req.params;

        const allowedStatus = ["accepted", "rejected"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).send({ error: "Status not valid" });
        }

        const connectionReq = await ConnectionReqmodel.findOne(
            {
                _id: requestId, // ensure proper ObjectId
                toUserId: loggedInUserId,
                status: { $in: ["interested", "ignore"] }
            }
        );

        if (!connectionReq) {
            return res.status(400).send({ error: "Connection request is not valid or available" });
        }
        connectionReq.status = status;

        await connectionReq.save()

        res.json({
            message: "Request reviewed successfully",
            request: connectionReq
        });

    } catch (err) {
        res.status(500).send("error is " + err.message);
    }
});

module.exports = reqrouter;