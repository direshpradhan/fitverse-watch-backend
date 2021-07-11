const express = require("express");
const bodyParser = require("body-parser");
const { intializeDBConnection } = require("./db/db.connect");
const { addVideosToDatabase } = require("./models/videos.model");
const videoRouter = require("./routes/videos.router");
const userRouter = require("./routes/user.router");
const app = express();

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello Diresh!!");
});

intializeDBConnection();
// run once add videos
// addVideosToDatabase();

app.use("/videos", videoRouter);
app.use("/user", userRouter);

app.listen(3000, () => console.log("Server Started"));
