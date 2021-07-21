const { WatchLater } = require("../models/watchLater.model");

const getWatchLaterVideos = async (req, res) => {
  const { userId } = req.user;
  try {
    const watchLaterArray = await WatchLater.findById(userId);
    res.json({ success: true, videos: watchLaterArray.videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addToWatchLater = async (req, res) => {
  const { id } = req.body.video;
  const { userId } = req.user;
  try {
    const user = await WatchLater.findById(userId);
    console.log(id);
    console.log(user);
    if (user) {
      const isInVideosArray = user.videos.find((videoId) => videoId === id);
      console.log(isInVideosArray);
      if (isInVideosArray) {
        return res.json({
          success: false,
          message: "Video already exists in watch later",
        });
      }
      user.videos.push(id);
      await user.save();
      console.log(user.videos);
      return res.json({
        success: true,
        message: "Video added to watch later successfully",
        videos: user.videos,
      });
    }
    const newVideosArray = [id];
    const newWatchLaterArray = new WatchLater({
      _id: userId,
      videos: newVideosArray,
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
