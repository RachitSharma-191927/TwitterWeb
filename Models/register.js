const mongoose = require("mongoose");
var bcrypt = require("bcrypt");
const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  img: {
    type: String,
    default:"Images/AccountImage.png",
  },
  coverimg:{
    type:String,
    default:"Images/defaultCover.webp"
  },
  followers: [
    {
    type:mongoose.Types.ObjectId,
    ref:"Register",
    }
  ],
  following: [
    {
    type:mongoose.Types.ObjectId,
    ref:"Register",
    }
  ],
  tweets:[{
    type:mongoose.Types.ObjectId,
    ref:"Tweet",
  }]
});
registerSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

registerSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Register = mongoose.model("Register", registerSchema);
module.exports = Register;
