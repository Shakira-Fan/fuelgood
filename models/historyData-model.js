const mongoose = require("mongoose");

const historytDataSchema = new mongoose.Schema(
  {
    gasoline: {
      type: String,
    },
    appliedDate: {
      type: String,
    },
    price: {
      type: String,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("HistoryData", historytDataSchema);
