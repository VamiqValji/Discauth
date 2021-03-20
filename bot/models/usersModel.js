const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema (like a blueprint)
let usersSchema = new Schema({
  discordID: String,
  discordTag: String,
  email: String,
  verified: Boolean,
});

let users = mongoose.model("users", usersSchema);

module.exports = users;
