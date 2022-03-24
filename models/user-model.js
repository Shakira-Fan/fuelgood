const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
      default: Date.now,
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
  },
  { versionKey: "_somethingElse" }
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
