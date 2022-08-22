const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const db = require("./config/dbconfig");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const authinitialize = require("./config/passport");
require("dotenv").config();
const app = express();
app.use(
  session({
    secret: "Keyboard",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use((req, res, next) => {
  res.locals.message = req.flash("Success");
  res.locals.failure = req.flash("failure");
  next();
});

const register = require("./Models/register");
const authRoute = require("./Routes/auth");
const tweets = require("./Routes/tweets");
const main = require("./Routes/main");
app.set("view engine", "ejs");
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));
app.use(passport.initialize());
app.use(passport.authenticate("session"));
authinitialize(passport);
//Routes Middleware
app.use(authRoute);
app.use(tweets);
app.use(main);

app.listen(3000, "localhost", () => {
  console.log("App listening on 3000 port");
});
