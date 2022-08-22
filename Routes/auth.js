const express = require("express");
const passport = require("passport");
const router = express.Router();

router.post("/signup", (req, res) => {
  passport.authenticate("local-signup", { failureRedirect: "/" })(
    req,
    res,
    () => {
      res.redirect("/home");
    }
  );
});

router.get(
  "/login/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.post("/signin", (req, res) => {
  passport.authenticate("local-login", { failureRedirect: "/" })(
    req,
    res,
    () => {
      res.redirect("/home");
    }
  );
});

router.get(
  "/oauth2/redirect/google",
  passport.authenticate("google", {
    successRedirect: "/home",
    failureRedirect: "/",
  })
);

module.exports = router;
