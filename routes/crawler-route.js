const HistoryData = require("../models/historyData-model");
const mongoose = require("mongoose");
const router = require("express").Router();

router.get("/", async (req, res) => {
  res.status(200).send("well connected");
});

//篩出現在油價
router.get("/price/recent", async (req, res) => {
  try {
    let data = await HistoryData.find({}, { _id: 0 }).limit(4);

    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
});

//列出所有歷史油價
router.get("/price/history/all", async (req, res) => {
  try {
    let data = await HistoryData.find({}, { _id: 0 }).sort({
      appliedDate: -1,
    });

    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
});

//篩選各類汽油的歷史紀錄
router.get("/price/history/:gasoline", async (req, res) => {
  let { gasoline } = req.params;
  try {
    let data = await HistoryData.find({ gasoline: gasoline }, { _id: 0 }).sort({
      appliedDate: -1,
    });

    const set = new Set();
    data = data.filter((item) =>
      !set.has(item.appliedDate) ? set.add(item.appliedDate) : false
    );

    res.status(200).send(data);
  } catch (e) {
    console.log(e);
  }
});

//篩選各類汽油的歷史紀錄(自訂）
router.get("/price/recent/:gasoline/:num", async (req, res) => {
  let { num, gasoline } = req.params;

  try {
    let data = await HistoryData.find({ gasoline }, { _id: 0 }).sort({
      appliedDate: -1,
    });

    const set = new Set();
    data = data.filter((item) =>
      !set.has(item.appliedDate) ? set.add(item.appliedDate) : false
    );

    let newData = [];
    for (let i = 0; i < num; i++) {
      newData.push(data[i]);
    }

    let reverseData = [];
    newData.map((gas) => {
      return reverseData.unshift(gas);
    });

    res.status(200).send(reverseData);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
