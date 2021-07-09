const express = require("express");
const { intializeDBConnection } = require("./db/db.connect");
const { addVideosToDatabase } = require("./models/videos.model");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Diresh!!");
});

intializeDBConnection();
// run once add videos
// addVideosToDatabase();

app.listen(3000, () => console.log("Server Started"));
