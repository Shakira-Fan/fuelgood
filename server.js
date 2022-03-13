const express = require("express");
const app = express();

const mongoose = require("mongoose");
//const Item = require("./modules/collection.js");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

const username = encodeURIComponent("lucien");
const password = encodeURIComponent("fuelsogood");
const collection = encodeURIComponent("member");
const uri = `mongodb+srv://${username}:${password}@fuel-good-db.zfk5k.mongodb.net/${collection}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB.");
  })
  .catch((e) => {
    console.log("Failed to connect to MongoDB");
    console.log(e);
  });

// CORS config here
app.all("/*", function (req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  // Set custom headers for CORS
  res.header(
    "Access-Control-Allow-Headers",
    "Content-type,Accept,X-Access-Token,X-Key"
  );
  if (req.method == "OPTIONS") {
    res.status(200).end();
  } else {
    next();
  }
});

app.get("/", (req, res) => {
  res.send("FUEL GOOOOOOOO!!!!!!!!");
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server is running...Go! Go! GO!")
);
