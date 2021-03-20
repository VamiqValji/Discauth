const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema (like a blueprint)
let usersSchema = new Schema({
  discordID: String,
  discordTag: String,
  // serverID: String,
  // serverName: String,
  serversData: Array,
  email: String,
  timeOfRegistration: String,
  verificationCode: String,
  verified: Boolean,
});

let users = mongoose.model("users", usersSchema);

module.exports = users;
