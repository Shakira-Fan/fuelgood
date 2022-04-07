const router = require("express").Router();
const passport = require("passport");

const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const bcrypt = require("bcrypt");
const User = require("../models/user-model");
const jwt = require("jsonwebtoken");
const { next } = require("cheerio/lib/api/traversing");

router.use((req, res, next) => {
  console.log("A request is coming to auth-route.js middleware");
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

router.get(
  "/google/redirect",
  passport.authenticate("google", { failureRedirect: "/error" }),
  (req, res) => {
    if (req.session.returnTo) {
      let newPath = req.session.returnTo;
      req.session.returnTo = "";
      res.redirect(newPath);
    } else {
      res.redirect("https://www.google.com/");
    }
  }
);

//Local Login
router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

router.post("/login", (req, res, next) => {
  //check the validation of data
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
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

            res
              .status(200)
              .send({ success: true, token: "JWT " + token, user });
          } else {
            res.status(401).send("Wrong password.");
          }
        });
      }
    });
  } catch (e) {
    next(e);
  }
});

//Local Sign Up
router.get("/signup", (req, res) => {
  res.render("signup", { user: req.user });
});

//JWT
router.post("/signup", async (req, res, next) => {
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
    date: dayjs().format("YYYY/MM/DD HH:mm A"),
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
    next(err);
  }
});

router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something broke!!!!");
});

module.exports = router;
