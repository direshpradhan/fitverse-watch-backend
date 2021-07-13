const express = require("express");
const {
  getAllPlaylists,
  addToPlaylist,
  removeFromPlaylist,
  clearPlaylist,
  deletePlaylist,
} = require("../controllers/playlist.controller");
const router = express.Router();

router.get("/", getAllPlaylists);
router.post("/", addToPlaylist);
router.delete("/", clearPlaylist);
router.delete("/:playlistId", deletePlaylist);
router.delete("/:playlistId/:videoId", removeFromPlaylist);

module.exports = router;
