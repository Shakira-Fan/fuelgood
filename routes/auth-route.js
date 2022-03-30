const router = require("express").Router();
const passport = require("passport");

const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const bcrypt = require("bcrypt");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

router.use((req, res, next) => {
  console.log("A request is coming into auth-route.js middleware");
  next();
});

router.get("/testAPI", (req, res) => {
  const msgObj = {
    message: "Test API is working.",
  };
  return res.json(msgObj.message);
});

//Log out
router.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/");
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/error", (req, res) => res.send("Unknown Error"));

router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/error" }),
  (req, res) => {
    if (req.session.returnTo) {
      let newPath = req.session.returnTo;
      req.session.returnTo = "";
      res.redirect(newPath);
    } else {
      res.send(req.user);
    }
  }
);

//Local Login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

router.post("/login", (req, res) => {
  // check the validation of data
  // const { error } = loginValidation(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) {
      res.status(400).send(err);
    }
    if (!user) {
      res.status(401).send("User not found.");
    } else {
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (err) return res.status(400).send(err);
        if (isMatch) {
          const tokenObject = { _id: user._id, email: user.email };
          const token = jwt.sign(tokenObject, process.env.PASSPORT_SECRET);

          res.status(200).send({ success: true, token: "JWT " + token, user });
        } else {
          res.status(401).send("Wrong password.");
        }
      });
    }
  });
});

//Local Sign Up
router.get("/signup", (req, res) => {
  res.render("signup", { user: req.user });
});

//JWT
router.post("/signup", async (req, res) => {
  // check the validation of data
  console.log(req.body);
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if the user exists
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send("Email has already been registered.");

  // register the user
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  try {
    const savedUser = await newUser.save();
    //res.render("login", { user: req.user });
    res.status(200).send({
      msg: "success",
      savedObject: savedUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send("User not saved.");
  }
});

module.exports = router;
