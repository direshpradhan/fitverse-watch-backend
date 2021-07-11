const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: "Cannot signup without name!!" },
    email: { type: String, required: "Enter e-mail id!", index: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("user", UserSchema);

module.exports = { User };
