const { Playlist } = require("../models/playlist.model");
const mongoose = require("mongoose");

const getAllPlaylists = async (req, res) => {
  const { userId } = req.user;
  try {
    const videos = await Playlist.findById(userId);
    console.log(videos?.playlist);
    res.json({ success: true, playlist: videos?.playlist });
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
      user.playlist.push({
        name,
        videos: [id],
      });
      await user.save();
      return res.json({
        success: true,
        message: `New Playlist ${name} created and added video`,
        newPlaylist: user.playlist[user.playlist.length - 1],
      });
    } else {
      const newPlaylistVideosArray = [id];
      const newUserPlaylist = new Playlist({
        _id: userId,
        playlist: [
          {
            name,
            videos: [id],
          },
        ],
      });
      await newUserPlaylist.save();
      return res.json({
        success: true,
        message: `Playlist ${name} created for new user and added video`,
        newPlaylist: newUserPlaylist.playlist[0],
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePlaylistName = async (req, res) => {
  const { userId } = req.user;
  const { playlistId } = req.params;
  const { name } = req.body.playlist;
  try {
    const user = await Playlist.findById(userId);
    const playlist = user.playlist.find(
      (playlist) => playlist.id === playlistId
    );
    playlist.name = name;
    await user.save();

    res.json({
      success: true,
      message: "Updated Playlist name",
      playlist: user.playlist,
    });
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
  updatePlaylistName,
  removeFromPlaylist,
  clearPlaylist,
  deletePlaylist,
};
