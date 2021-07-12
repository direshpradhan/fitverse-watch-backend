const { History } = require("../models/history.model");

const getHistory = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await History.findById(userId).populate("videos._id");
    res.json({ success: true, videos: user });
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
      const newVideo = { _id: id };
      const isInHistory = user.videos.find((videoObj) => videoObj.id === id);
      if (isInHistory) {
        user.videos.remove(id);
      }
      user.videos.push(newVideo);
      await user.save();
      return res.json({
        success: true,
        message: "Video added to history",
        videos: user.videos,
      });
    }
    const newHistoryArray = new History({
      _id: userId,
      videos: [{ _id: id }],
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
    const user = await User.findById(userId);
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
