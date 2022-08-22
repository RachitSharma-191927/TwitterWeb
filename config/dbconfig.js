const mongoose = require("mongoose");
require("dotenv").config();

password = encodeURIComponent(process.env.password);

mongoose.connect(
  `mongodb+srv://rachitrashr1:${password}@cluster0.tqqlqly.mongodb.net/?retryWrites=true&w=majority`,
  (err) => {
    if (err) console.log(err);
    else {
      console.log("Connected to the Atlas database");
    }
  }
);
