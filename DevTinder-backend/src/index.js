const express = require("express")
// const userauth = require("./middleware.js/userauth");
const app = express();
const connectdb = require("./config/database")
const User = require("./models/User")

app.use(express.json())

app.get("/user", async(req,res)=>{
    const userEmail = req.body.emailid;
    try{
    const user = await User.findOneAndDelete({emailid : userEmail});
    res.send(user);
    }
    catch(err){
        res.status(500).send("Internal Server error");
        console.log(`something went wrong : ${err}`);
    }
});

app.delete("/user",async(req,res)=>{
    const userid = req.body.userid;

    if(!userid){
        res.status(404).send("user not available in database")
    }
    try{
        await User.findByIdAndDelete(userid)
        res.send("user successfully deleted")
    }
    catch(err){
        console.log(`something went wrong : ${err}`)
    }
})


app.patch("/user/:userid", async (req, res) => {
  const userid = req.params?.userid;
  const data = req.body;

  try {
    const allowed_Update = ["photoUrl","firstname","lastname","age","skills","about","password"];
    const updateAllowed = Object.keys(data).every((k) => allowed_Update.includes(k));

    if (!updateAllowed) {
      return res.status(400).send("Invalid fields in update");
    }

    // use findByIdAndUpdate if your unique key is _id
    const user = await User.findByIdAndUpdate(userid, data, { new: true });

    // OR use findOneAndUpdate if your schema has a field called userid
    // const user = await User.findOneAndUpdate({ userid: userid }, data, { new: true });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.send("User updated successfully");
  } catch (err) {
    console.log(`something went wrong while updating: ${err}`);
    res.status(500).send("Something went wrong");
  }
});


app.get("/feed", async(req,res)=>{
   
    try{
    const user = await User.find({});
    if(user === 0){
        res.status(404).send("users not found")
    }
    else{
        res.send(user);
    }
    
    }
    catch(err){
        res.status(500).send("Internal Server error");
        console.log(`something went wrong : ${err}`);
    }
});

app.post("/signup", async (req,res)=>{
    
    const user = new User(req.body)
    try{
        await user.save();
        res.send("add succesfully");

    }
    catch(err){
        console.log(`/signup :${err}`)
    }    
})


connectdb().then(()=>{
    console.log("dadtabase connected")
    app.listen(7777,()=>{
        console.log("I am listing brother")
    })
}).catch((err)=>{
    
    console.log(`database error : ${err}`);
})

 