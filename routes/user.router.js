const express = require("express");
const {
  loginWithCredentials,
  signUpHandler,
  getUserData,
} = require("../controllers/user.controller");
const router = express.Router();

router.get("/", getUserData);
router.post("/login", loginWithCredentials);
router.post("/signup", signUpHandler);

module.exports = router;
