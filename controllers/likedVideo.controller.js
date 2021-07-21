const { LikedVideo } = require("../models/likedVideo.model");

const getLikedVideos = async (req, res) => {
  const { userId } = req.user;
  try {
    const likedArray = await LikedVideo.findById(userId);
    res.json({ success: true, videos: likedArray.videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addToLikedVideo = async (req, res) => {
  const { id } = req.body.video;
  const { userId } = req.user;
  try {
    const user = await LikedVideo.findById(userId);
    if (user) {
      const isInVideosArray = user.videos.find((videoId) => videoId === id);
      if (isInVideosArray) {
        return res.json({
          success: false,
          message: "Video already exists in liked videos",
        });
      }
      user.videos.push(id);
      await user.save();
      return res.json({
        success: true,
        message: "Video added to liked videos successfully",
        videos: user.videos,
      });
    }
    const newVideosArray = [id];
    const newLikedVideosArray = new LikedVideo({
      _id: userId,
      videos: newVideosArray,
    });
    await newLikedVideosArray.save();
    return res.json({
      success: true,
      message: "Liked Videos created and video added successfully",
      newLikedVideosArray,
    });
  } catch (error) {
    console.log(error);
  }
};

const removeFromLikedVideo = async (req, res) => {
  const { videoId } = req.params;
  const { userId } = req.user;
  try {
    const user = await LikedVideo.findById(userId);
    await user.videos.remove(videoId);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Video removed from liked videos",
      newLikedVideosArray: user.videos,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getLikedVideos, addToLikedVideo, removeFromLikedVideo };
