const mongoose = require("mongoose");
const { Schema } = mongoose;

const HistorySchema = new Schema(
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

const History = mongoose.model("history-video", HistorySchema);

module.exports = { History };
