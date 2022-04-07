const mongoose = require("mongoose");
var AutoIncrement = require("mongoose-sequence")(mongoose);


const orderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    date: {
      type: String,
    },
    orders: {
      "92無鉛汽油": {
        price: {
          type: Number,
        },
        liter: {
          type: Number,
          default: 0,
        },
      },
      "95無鉛汽油": {
        price: {
          type: Number,
        },
        liter: {
          type: Number,
          default: 0,
        },
      },
      "98無鉛汽油": {
        price: {
          type: Number,
        },
        liter: {
          type: Number,
          default: 0,
        },
      },
      高級柴油: {
        price: {
          type: Number,
        },
        liter: {
          type: Number,
          default: 0,
        },
      },
    },
  },
  { versionKey: false }
);

orderSchema.plugin(AutoIncrement, {
  id: "order_seq",
  inc_field: "orderNumber",
});

module.exports = mongoose.model("Order", orderSchema);
