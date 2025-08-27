const userauth = (req,res,next)=>{
    token = "xyz";
    if((token !== "yz")){
        return res.status(500).send("unauthorized");
    }
    next()
};
module.exports = userauth;