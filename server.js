const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

// Routes
const authRoute = require("./routes").auth;
const memRoute = require("./routes").member;
const adminRoute = require("./routes").admin;
const crawlerRoute = require("./routes").crawler;
const orderRoute = require("./routes").order;

require("./config/passport");
const passport = require("passport");
const session = require("express-session");
const bodyParser = require("body-parser");
const uri = process.env.MONGODB_URI;

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
app.use("/order", orderRoute);
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
  res.status(200).render("index.ejs", { user: req.user });
});

app.get("*", (req, res) => {
  res.status(400).send("404 page not dound");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something broke!!!!");
});

app.listen(process.env.PORT || 3000, () =>
  console.log("Server is running...Fuel Good Go! Go! GO!")
);

//setInterval(crawRecentData, 300000);
//crawHistoryData();
//crawRecentData();
