const { History } = require("../models/history.model");

const getHistory = async (req, res) => {
  const { userId } = req.user;
  try {
    const historyArray = await History.findById(userId);
    res.json({ success: true, videos: historyArray.videos });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addToHistory = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.body.video;
  try {
    const user = await History.findById(userId);
    if (user) {
      const isInHistory = user.videos.find((videoId) => videoId === id);
      if (isInHistory) {
        user.videos.remove(id);
      }
      user.videos.push(id);
      await user.save();
      return res.json({
        success: true,
        message: "Video added to history",
        videos: user.videos,
      });
    }
    const newVideosArray = [id];
    const newHistoryArray = new History({
      _id: userId,
      videos: newVideosArray,
    });
    await newHistoryArray.save();

    return res.json({
      success: true,
      message: "History Array created and video added",
      videos: newHistoryArray.videos,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromHistory = async (req, res) => {
  const { videoId } = req.params;
  const { userId } = req.user;
  try {
    const user = await History.findById(userId);
    await user.videos.remove(videoId);
    await user.save();

    res.json({
      success: true,
      message: "Removed from History",
      videos: user.videos,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getHistory, addToHistory, removeFromHistory };
