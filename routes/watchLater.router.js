const express = require("express");
const {
  getWatchLaterVideos,
  addToWatchLater,
  removeFromWatchLater,
} = require("../controllers/watchLater.controller");
const router = express.Router();

router.get("/", getWatchLaterVideos);
router.post("/", addToWatchLater);
router.delete("/:videoId", removeFromWatchLater);

module.exports = router;
