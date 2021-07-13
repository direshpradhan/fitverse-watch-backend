const { Playlist } = require("../models/playlist.model");

const getAllPlaylists = async (req, res) => {
  const { userId } = req.user;
  try {
    const user = await Playlist.findById(userId).populate(
      "playlist.videos._id"
    );
    res.json({ success: true, videos: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addToPlaylist = async (req, res) => {
  const { userId } = req.user;
  const { id, name } = req.body.video;
  try {
    const user = await Playlist.findById(userId);
    if (user) {
      const playlist = user.playlist.find((playlist) => playlist.name === name);
      if (playlist) {
        playlist.videos.push(id);
        await user.save();
        return res.json({
          success: true,
          message: `Video added to playlist ${name}`,
          playlist: user,
        });
      }
      user.playlist.push({ name, videos: [{ _id: id }] });
      await user.save();
      return res.json({
        success: true,
        message: `New Playlist ${name} created and added video`,
        playlist: user,
      });
    } else {
      const newUserPlaylist = new Playlist({
        _id: userId,
        playlist: [
          {
            name,
            videos: [{ _id: id }],
          },
        ],
      });
      await newUserPlaylist.save();
      return res.json({
        success: true,
        message: `Playlist ${name} created for new user and added video`,
        newUserPlaylist,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const removeFromPlaylist = async (req, res) => {
  const { userId } = req.user;
  const { videoId, playlistId } = req.params;
  try {
    const user = await Playlist.findById(userId);
    const playlist = user.playlist.find(
      (playlist) => playlist.id === playlistId
    );
    await playlist.videos.remove(videoId);
    await user.save();

    res.json({
      success: true,
      message: `Video removed from ${playlist.name}`,
      playlist: user,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const clearPlaylist = async (req, res) => {
  const { userId } = req.user;
  const { playlistId } = req.body.playlist;
  try {
    const user = await Playlist.findById(userId);
    const playlist = user.playlist.find(
      (playlist) => playlist.id === playlistId
    );
    playlist.videos = [];
    await user.save();
    res.json({ success: true, message: "Cleared playlist", playlist: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  const { userId } = req.user;
  const { playlistId } = req.params;
  try {
    const user = await Playlist.findById(userId);
    await user.playlist.remove(playlistId);
    await user.save();

    res.json({
      success: true,
      message: "Playlist deleted successfully",
      playlist: user,
    });
  } catch (error) {
    res.json({ sucess: false, message: error.message });
  }
};

module.exports = {
  getAllPlaylists,
  addToPlaylist,
  removeFromPlaylist,
  clearPlaylist,
  deletePlaylist,
};
