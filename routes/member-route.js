const router = require("express").Router();
const passport = require("passport");

//登入保護機制（未登入會強制轉到登入頁面）
const authCheck = (req, res, next) => {
  req.session.returnTo = req.originalUrl;
  if (!req.isAuthenticated()) {
    res.redirect("/auth/login");
  } else {
    next();
  }
};

router.get("/", authCheck, async (req, res) => {
  res.render("member", { user: req.user });
});

module.exports = router;
