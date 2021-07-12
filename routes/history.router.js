const express = require("express");
const {
  getHistory,
  addToHistory,
  removeFromHistory,
} = require("../controllers/history.controller");
const router = express.Router();

router.get("/", getHistory);
router.post("/", addToHistory);
router.delete("/:videoId", removeFromHistory);

module.exports = router;
