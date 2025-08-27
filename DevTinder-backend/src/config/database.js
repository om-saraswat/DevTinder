const mongoose = require("mongoose")

const connectdb = async()=>{
    await mongoose.connect("mongodb+srv://OmSaraswat:dbpassword@omcluster.utpyvaj.mongodb.net/");
}

module.exports = connectdb;