const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { intializeDBConnection } = require("./db/db.connect");
const { addVideosToDatabase } = require("./models/videos.model");
const videoRouter = require("./routes/videos.router");
const userRouter = require("./routes/user.router");
const watchLaterRouter = require("./routes/watchLater.router");
const likedVideoRouter = require("./routes/likedVideo.router");
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

app.listen(3000, () => console.log("Server Started"));
