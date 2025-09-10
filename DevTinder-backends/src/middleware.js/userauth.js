const jwt = require("jsonwebtoken");
const User = require("../models/User")

const userauth = async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        return res.status(401).send("Access Denied");
    }
    try{
        const verified = jwt.verify(token,"@omdon");
        const {_id} = verified;

        const user = await User.findById(_id);
        if(!user){
            throw new Error("User Not Found");
        }
        req.user = user;
        next();
    }
    catch(Err){
        return res.status(401).send("Access Denied");
    }
    
};
module.exports = {
    userauth
};