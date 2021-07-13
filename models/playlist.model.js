const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
  _id: { type: Schema.Types.ObjectId, ref: "user" },
  playlist: [
    {
      name: String,
      videos: [
        {
          _id: { type: Schema.Types.ObjectId, ref: "video" },
        },
      ],
    },
  ],
});

const Playlist = new mongoose.model("playlist", PlaylistSchema);

module.exports = { Playlist };
