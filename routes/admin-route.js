const router = require("express").Router();
const User = require("../models/user-model");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  res.status(200).send("well connected");
});

router.get("/user/all", async (req, res) => {
  try {
    let data = await User.find({});
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.get("/user/:name", async (req, res) => {
  let { name } = req.params;
  try {
    await User.findOne({ name }).then((data) => {
      if (data) res.send(data);
      else res.send("User not found");
    });
  } catch (e) {
    res.send(e);
  }
});

router.delete("/user/:name", async (req, res) => {
  let { name } = req.params;
  try {
    await User.deleteOne({ name }).then((data) => {
      if (data) res.send("User has been deleted");
      else res.send("User not found");
    });
  } catch (e) {
    res.send(e);
  }
});

module.exports = router;
