const express = require("express");
const router = express.Router();
const { getAllVideos } = require("../controllers/videos.controller");

router.get("/", getAllVideos);

module.exports = router;
