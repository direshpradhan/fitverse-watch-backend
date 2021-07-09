require("dotenv").config();
const mongoose = require("mongoose");

async function intializeDBConnection() {
  try {
    await mongoose.connect(
      "mongodb+srv://pdiresh:pradhanD@1811@cluster0.vwyi8.mongodb.net/vid-lib?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
    console.log("Database connection is successful");
  } catch (error) {
    console.error("Database connection failed...", error);
  }
}

module.exports = { intializeDBConnection };
