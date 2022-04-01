const router = require("express").Router();
const User = require("../models/user-model");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  res.status(200).send("well connected");
});

router.get("/user/all", async (req, res) => {
  try {
    let data = await User.find({}, { __v: 0 });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.get("/user/:email", async (req, res) => {
  let { email } = req.params;
  try {
    await User.findOne({ email }, { __v: 0 }).then((data) => {
      if (data) res.send(data);
      else res.send("User not found");
    });
  } catch (e) {
    res.send(e);
  }
});

router.delete("/user/:email", async (req, res) => {
  let { email } = req.params;
  try {
    await User.deleteOne({ email }, { __v: 0 })
      .populate("email")
      .then((data) => {
        if (data) res.send("User has been deleted");
        else res.send("User not found");
      });
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
