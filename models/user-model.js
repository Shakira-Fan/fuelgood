const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 255,
    },
    googleID: {
      type: String,
      default: "",
    },
    date: {
      type: Date,
      default: dayjs().format("YYYY/MM/DD HH:mm A"),
    },
    thumbnail: {
      type: String,
      default: "",
    },
    // local login
    email: {
      type: String,
    },
    password: {
      type: String,
      minLength: 8,
      maxLength: 1024,
    },
    properties: {
      "92無鉛汽油": {
        liter: {
          type: Number,
          required: true,
          default: 0,
        },
      },
      "95無鉛汽油": {
        liter: {
          type: Number,
          required: true,
          default: 0,
        },
      },
      "98無鉛汽油": {
        liter: {
          type: Number,
          required: true,
          default: 0,
        },
      },
      高級柴油: {
        liter: {
          type: Number,
          required: true,
          default: 0,
        },
      },
    },
  },
  { versionKey: false }
);

// mongoose schema middleare
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err, isMatch);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
