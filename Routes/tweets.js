const express = require("express");
const tweet=require("../Models/tweets")
const register = require("../Models/register");
const isLoggedIn=require("../Middleware/login")

const router = express.Router();

router.post("/addTweets",isLoggedIn, (req, res) => {
  const data = req.body;
  if(data.tweet=="")
  {
    req.flash('failure',"Empty Tweet Addition Not Possible");
    res.status("400").redirect("/")
  }
  else{
    const tweetData= new tweet({
      data:req.body.tweet,
      postedBy:req.user.id,
    })
    tweetData.save().then(function(newTweet){
      res.send(":) Successfully Done");
    }).catch((e)=>{
      res.status(400).send("Invalid Request")
      console.log("Error is there",e)
    })
  } 
});

router.get("/showTweets", async (req, res) => {
  const data = await tweet.find({})
  console.log("Each Tweet Data")
  for(let tweet of data)
  {
    const User_Data = await register.findById(tweet.postedBy.toString());
    tweet.userdata=User_Data;
  }
  console.log(data);
  res.send("Ok")
});

router.get("/delete/:id",async (req,res)=>{
  const id=req.params.id;
  const result=await tweet.findByIdAndDelete(id);
  res.redirect("/home")
  
})


module.exports = router;
