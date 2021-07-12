const { LikedVideo } = require("../models/likedVideo.model");

const getLikedVideos = async (req, res) => {
  const { userId } = req.user;
  try {
    const videos = await LikedVideo.findById(userId).populate("videos._id");
    res.json({ success: true, videos });
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
      const newVideo = { _id: id };
      const isInVideosArray = user.videos.find(
        (videoObj) => videoObj.id === id
      );
      if (isInVideosArray) {
        return res.json({
          success: false,
          message: "Video already exists in liked videos",
        });
      }
      user.videos.push(newVideo);
      await user.save();
      return res.json({
        success: true,
        message: "Video added to liked videos successfully",
      });
    }
    const newLikedVideosArray = new LikedVideo({
      _id: userId,
      videos: [{ _id: id }],
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
