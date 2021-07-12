const { WatchLater } = require("../models/watchLater.model");

const getWatchLaterVideos = async (req, res) => {
  const { userId } = req.user;
  try {
    const videos = await WatchLater.findById(userId).populate("videos._id");
    res.json({ success: true, videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addToWatchLater = async (req, res) => {
  const { id } = req.body.video;
  const { userId } = req.user;
  try {
    const user = await WatchLater.findById(userId);
    const isInVideosArray = user.videos.find((videoObj) => videoObj.id === id);
    if (user) {
      const newVideo = { _id: id };
      if (isInVideosArray) {
        return res.json({
          success: false,
          message: "Video already exists in watch later",
        });
      }
      user.videos.push(newVideo);
      await user.save();
      return res.json({
        success: true,
        message: "Video added to watch later successfully",
      });
    }
    const newWatchLaterArray = new WatchLater({
      _id: userId,
      videos: [{ _id: id }],
    });
    await newWatchLaterArray.save();
    return res.json({
      success: true,
      message: "Watch later created and video added successfully",
      newWatchLaterArray,
    });
  } catch (error) {
    console.log(error);
  }
};

const removeFromWatchLater = async (req, res) => {
  const { videoId } = req.params;
  const { userId } = req.user;
  try {
    const user = await WatchLater.findById(userId);
    await user.videos.remove(videoId);
    await user.save();

    res.status(201).json({
      success: true,
      message: "Video removed from watch later",
      newWatchLaterArray: user.videos,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getWatchLaterVideos, addToWatchLater, removeFromWatchLater };
