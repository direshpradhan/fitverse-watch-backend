const mongoose = require("mongoose");
const { Schema } = mongoose;
const { videos } = require("./video-data");

const StatisticsSchema = new Schema({
  viewCount: Number,
  likeCount: Number,
  dislikeCount: Number,
});

const VideoSchema = new Schema(
  {
    _id: String,
    title: String,
    image: String,
    url: String,
    channelName: String,
    channelImage: String,
    publishedOn: String,
    statistics: StatisticsSchema,
  },
  { timestamps: true }
);

const Video = mongoose.model("video", VideoSchema);

const addVideosToDatabase = async () => {
  try {
    videos.forEach(async (video) => {
      const newVideo = new Video(video);
      await newVideo.save();
    });
    console.log("Videos added successfully");
  } catch (error) {
    console.log("Error adding data", error);
  }
};

module.exports = { Video, addVideosToDatabase };
