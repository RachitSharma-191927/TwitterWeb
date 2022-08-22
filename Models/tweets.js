const mongoose = require("mongoose");
const tweetschema = new mongoose.Schema({
  data:{
    type:String,
    required:true,
  },
  postedBy:{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
  },
  likes:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Register",
    }
  ],
  comments:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Register",
    }
  ],
  userdata:{
    type:Object,
  }
},{timestamps:true});
const Tweets=mongoose.model("Tweet",tweetschema);
module.exports=Tweets;