const router = require("express").Router();
const User = require("../models/user-model");
const Order = require("../models/order-model");
const mongoose = require("mongoose");
const dayjs = require("dayjs");

router.use((req, res, next) => {
  console.log("An order is passing to order middleware");
  next();
});

router.get("/", async (req, res) => {
  res.status(200).send("well connected");
});

//新增訂單
router.post("/add", async (req, res, next) => {
  let { email, adding92, adding95, adding98, addingDiesel } = req.body;
  let newOrder = new Order({
    email,
    date: dayjs().format("YYYY/MM/DD HH:mm A"),
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

  try {
    await newOrder
      .save()
      .then(() => {
        console.log(newOrder);
      })
      .catch((err) => {
        res.send(err);
        return;
      });

    ///////////////////

    let filter = email;
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

    //console.log(update);

    await User.findOneAndUpdate({ email: filter }, update, {
      new: true,
      runValidators: true,
    }).then((newStock) => {
      res.send(newStock);
    });
  } catch (e) {
    next(e);
  }
});

//取用油量
router.patch("/deduct", async (req, res, next) => {
  let { email, deducted92, deducted95, deducted98, deductedDiesel } = req.body;
  let filter = email;
  try {
    let member = await User.find({ email: filter });
    let current92 = member[0].properties["92無鉛汽油"].liter;
    let current95 = member[0].properties["95無鉛汽油"].liter;
    let current98 = member[0].properties["98無鉛汽油"].liter;
    let currentDiesel = member[0].properties.高級柴油.liter;

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

    await User.findOneAndUpdate({ email: filter }, update, {
      new: true,
      runValidators: true,
    }).then((newStock) => {
      res.send(newStock);
    });
  } catch (err) {
    res.send(err);
    return;
  }
});

//查找所有訂單資訊
router.get("/all", async (req, res, next) => {
  try {
    await Order.find({}, { __v: 0 })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((e) => {
        console.log(e);
      });
  } catch (e) {
    next(e);
  }
});

//Email查找訂單
router.get("/:email", async (req, res, next) => {
  let { email } = req.params;
  try {
    Order.find({ email })
      .then((data) => {
        res.send(data);
      })
      .catch((e) => {
        res.send(e);
      });
  } catch (e) {
    next(e);
  }
});

//Email刪除訂單
router.delete("/delete/:orderNumber", async (req, res, next) => {
  let { orderNumber } = req.params;

  try {
    let orderTobedeleted = await Order.findOne({ orderNumber });
    let deleted92 = orderTobedeleted.orders["92無鉛汽油"].liter;
    let deleted95 = orderTobedeleted.orders["95無鉛汽油"].liter;
    let deleted98 = orderTobedeleted.orders["98無鉛汽油"].liter;
    let deletedDiesel = orderTobedeleted.orders["高級柴油"].liter;

    let filter = orderTobedeleted.email;

    let currentStock = await User.find({ email: filter });
    let current92 = currentStock[0].properties["92無鉛汽油"].liter;
    let current95 = currentStock[0].properties["95無鉛汽油"].liter;
    let current98 = currentStock[0].properties["98無鉛汽油"].liter;
    let currentDiesel = currentStock[0].properties.高級柴油.liter;

    let update = {
      properties: {
        "92無鉛汽油": {
          liter: current92 - Number(deleted92),
        },
        "95無鉛汽油": {
          liter: current95 - Number(deleted95),
        },
        "98無鉛汽油": {
          liter: current98 - Number(deleted98),
        },
        高級柴油: {
          liter: currentDiesel - Number(deletedDiesel),
        },
      },
    };

    await User.findOneAndUpdate({ email: filter }, update, {
      new: true,
      runValidators: true,
    }).then((newStock) => {
      console.log(newStock);
    });

    Order.deleteOne({ orderNumber })
      .then((msg) => {
        if (msg.deletedCount === 0) res.send("Order not exists.");
        else res.send("Order has been deleted.");
      })
      .catch((msg) => {
        res.send(msg);
      });
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something broke!!!!");
});

module.exports = router;
