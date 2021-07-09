const { Video } = require("../models/videos.model");

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find({});

    res.json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllVideos };
