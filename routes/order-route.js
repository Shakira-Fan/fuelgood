const router = require("express").Router();
const User = require("../models/user-model");
const Order = require("../models/order-model");
const mongoose = require("mongoose");

router.use((req, res, next) => {
  console.log("An order is passing to order middleware");
  next();
});

router.get("/", async (req, res) => {
  res.status(200).send("well connected");
});

//新增訂單
router.post("/add", async (req, res) => {
  let { email, adding92, adding95, adding98, addingDiesel } = req.body;
  let newOrder = new Order({
    email,
    orders: {
      "92無鉛汽油": {
        liter: Number(adding92),
      },
      "95無鉛汽油": {
        liter: Number(adding95),
      },
      "98無鉛汽油": {
        liter: Number(adding98),
      },
      高級柴油: { liter: Number(addingDiesel) },
    },
  });

  await newOrder
    .save()
    .then(() => {
      res.send(newOrder);
    })
    .catch((err) => {
      console.log(err);
    });

  ///////////////////

  let filter = email;
  //
  let member = await User.findOne({ email: filter });
  let current92 = member.properties["92無鉛汽油"].liter;
  let current95 = member.properties["95無鉛汽油"].liter;
  let current98 = member.properties["98無鉛汽油"].liter;
  let currentDiesel = member.properties.高級柴油.liter;



  let update = {
    properties: {
      "92無鉛汽油": {
        liter: current92 + Number(adding92),
      },
      "95無鉛汽油": {
        liter: current95 + Number(adding95),
      },
      "98無鉛汽油": {
        liter: current98 + Number(adding98),
      },
      高級柴油: {
        liter: currentDiesel + Number(addingDiesel),
      },
    },
  };

  await User.findOneAndUpdate({ email: filter }, update, { new: true }).then(
    (mes) => {
      console.log(mes);
    }
  );
});

//取用油量
router.patch("/deduct", async (req, res) => {
  let { email, deducted92, deducted95, deducted98, deductedDiesel } = req.body;
  let filter = email;
  //
  let member = await User.findOne({ email: filter });
  let current92 = member.properties["92無鉛汽油"].liter;
  let current95 = member.properties["95無鉛汽油"].liter;
  let current98 = member.properties["98無鉛汽油"].liter;
  let currentDiesel = member.properties.高級柴油.liter;

  let update = {
    properties: {
      "92無鉛汽油": {
        liter: current92 - deducted92,
      },
      "95無鉛汽油": {
        liter: current95 - deducted95,
      },
      "98無鉛汽油": {
        liter: current98 - deducted98,
      },
      高級柴油: {
        liter: currentDiesel - deductedDiesel,
      },
    },
  };
  //
  await User.findOneAndUpdate({ email: filter }, update, { new: true }).then(
    (newStock) => {
      newStock
        .save()
        .then((saved) => {
          res.send(saved);
        })
        .catch((err) => {
          res.status(422).json(err);
        });
    }
  );
});

//查找所有訂單資訊
router.get("/all", async (req, res) => {
  try {
    await Order.find({}, { __v: 0 })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch {
    if (Error) throw Error;
  }
});

module.exports = router;
