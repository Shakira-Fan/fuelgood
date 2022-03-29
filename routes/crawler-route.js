const RecentData = require("../models/recentData-model");
const HistoryData = require("../models/historyData-model");
const mongoose = require("mongoose");
const router = require("express").Router();

router.get("/recentPrice", async (req, res) => {
  try {
    let data = await RecentData.find({});
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
});

router.get("/historyPrice", async (req, res) => {
  try {
    let data = await HistoryData.find({});
    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
});

router.get("/", async (req, res) => {
  res.status(200).send("well connected");
});

module.exports = router;
