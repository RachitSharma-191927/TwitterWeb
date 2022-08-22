const express = require("express");
const router = express.Router();
const isLoggedIn=require("../Middleware/login")
const register = require("../Models/register");
const tweet=require("../Models/tweets")
const mongoose = require("mongoose");
router.get("/", (req, res) => {
  res.render("index.ejs");
});

router.get("/home",isLoggedIn, async (req, res) => {
  const data= await register.findById(req.user.id)
  const Tweetsdata = await tweet.find({})
  for(let tweet of Tweetsdata)
  {
    const User_Data = await register.findById(tweet.postedBy.toString());
    tweet.userdata=User_Data;
  }
  res.render("home.ejs",{data,title:"Home",Tweetsdata});
});


router.get("/profile",isLoggedIn,async (req,res)=>{
  const data= await register.findById(req.user.id)
  const Tweets = await tweet.find({
    postedBy:mongoose.Types.ObjectId(req.user.id),
  })
  res.render("profile.ejs",{data,title:data.name,Tweets})
})


router.get("/profile/:id",isLoggedIn,async(req,res)=>{
  const data= await register.findById(req.params.id)
  const Tweets = await tweet.find({
    postedBy:mongoose.Types.ObjectId(req.user.id),
  })
  const data2 = await register.findById(req.user.id);
  if(data2.following.includes(req.params.id))
  {
    var followed=true;
  }
  else{
    var followed=false;
  }
  res.render("Userprofile.ejs",{data,title:data.name,Tweets,id:req.user.id,followed})
})

router.get("/follow/:id",isLoggedIn, async (req,res)=>{
  const data= await register.findById(req.params.id)
  const data2 = await register.findById(req.user.id);
  if(data2.following.includes(req.params.id))
  {
    await register.findByIdAndUpdate(req.params.id,
      {$pull:{
          followers:req.user.id,}
      }
    )
    await register.findByIdAndUpdate(req.user.id,
      {$pull:{
          following:req.params.id,}
      }
    )
  }
  else{
    await register.findByIdAndUpdate(req.params.id,
      {$push:{
          followers:req.user.id,}
      }
    )
    await register.findByIdAndUpdate(req.user.id,
      {$push:{
          following:req.params.id,}
      }
    )
  }
  res.redirect(`/profile/${req.params.id}`)
})


router.get("/logout",isLoggedIn, (req, res) => {
  req.logOut((err) => {
    if (err) console.log(err);
  });
  res.redirect("/");
});

router.get("/message",isLoggedIn,(req,res)=>{
  res.render("message.ejs",{title:"Messages"})
})
router.get("/notifications",isLoggedIn,(req,res)=>{
  res.render("notifications.ejs",{title:"Notifications"})
})
router.get("/explore",isLoggedIn,(req,res)=>{
  res.render("explore.ejs",{title:"Explore"})
})

module.exports = router;
