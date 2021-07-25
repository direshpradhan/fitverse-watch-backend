const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { intializeDBConnection } = require("./db/db.connect");
const { addVideosToDatabase } = require("./models/videos.model");
const videoRouter = require("./routes/videos.router");
const userRouter = require("./routes/user.router");
const watchLaterRouter = require("./routes/watchLater.router");
const likedVideoRouter = require("./routes/likedVideo.router");
const historyRouter = require("./routes/history.router");
const playlistRouter = require("./routes/playlist.router");
const { authenticateToken } = require("./authenticateToken");
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello Express!!");
});

intializeDBConnection();
// run once add videos
// addVideosToDatabase();

app.use("/videos", videoRouter);
app.use("/user", userRouter);
app.use(authenticateToken);
app.use("/watch-later", watchLaterRouter);
app.use("/liked-videos", likedVideoRouter);
app.use("/history", historyRouter);
app.use("/playlist", playlistRouter);

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "The route you're looking for is not available.",
  });
});

// Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: "Server is having some issues. Try again after sometime",
  });
  next();
});

app.listen(3000, () => console.log("Server Started"));
