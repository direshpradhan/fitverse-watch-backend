const express = require("express");
const {
  getLikedVideos,
  addToLikedVideo,
  removeFromLikedVideo,
} = require("../controllers/likedVideo.controller");
const router = express.Router();

router.get("/", getLikedVideos);
router.post("/", addToLikedVideo);
router.delete("/:videoId", removeFromLikedVideo);

module.exports = router;
