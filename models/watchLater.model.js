const mongoose = require("mongoose");
const { Schema } = mongoose;

const WatchLaterSchema = new Schema(
  {
    _id: { type: Schema.Types.ObjectId, ref: "user" },
    videos: Array,
  },
  { timestamps: true }
);

const WatchLater = mongoose.model("watchlater-video", WatchLaterSchema);

module.exports = { WatchLater };
