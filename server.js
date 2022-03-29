const dotenv = require("dotenv").config();
const express = require("express");
// Routes
const authRoute = require("./routes").auth;
const memRoute = require("./routes").member;
const adminRoute = require("./routes").admin;
const crawlerRoute = require("./routes").crawler;
//
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const uri = process.env.MONGODB_URI;
const passport = require("passport");
const session = require("express-session");
//API管理套件
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
//爬蟲套件
const crawHistoryData = require("./modules/crawler").crawHistoryData;
const crawRecentData = require("./modules/crawler").crawRecentData;

//Middlewares
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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRoute);
app.use("/member", memRoute);
app.use("/admin", adminRoute);
app.use("/crawler", crawlerRoute);

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

app.get("/", (req, res) => {
  res.render("index.ejs", { user: req.user });
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server is running...Go! Go! GO!")
);

setInterval(crawRecentData, 300000);
//crawHistoryData();
//crawRecentData()