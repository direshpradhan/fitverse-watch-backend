const mongoose = require("mongoose");
const { Schema } = mongoose;

const WatchLaterSchema = new Schema(
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

const WatchLater = mongoose.model("watchlater", WatchLaterSchema);

module.exports = { WatchLater };
