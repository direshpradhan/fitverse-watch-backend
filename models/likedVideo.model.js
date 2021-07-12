const mongoose = require("mongoose");
const { Schema } = mongoose;

const LikedVideoSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: "User" },
    videos: [
      {
        _id: { type: Schema.Types.ObjectId, ref: "Video" },
      },
    ],
  },
  { timestamps: true }
);

const LikedVideo = mongoose.model("likedVideo", LikedVideoSchema);

module.exports = { LikedVideo };
