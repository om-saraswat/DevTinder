const mongoose = require("mongoose");

const connectionreq = mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },
    status: {
    type: String,
    enum: {
        values: ["ignore", "interested", "accepted", "rejected"],
        message: "{VALUE} is not a valid status type"
    },
    required: true
}

}
,{timestamps:true}
)

connectionreq.index({fromUserId: 1, toUserId: 1}, {unique: true});      
const connectionreqmodel = mongoose.model("connectionreq",connectionreq)

// const connectionreqmodel = new mongoose.model("connectionreq",mongoose.Schema);

module.exports = connectionreqmodel;