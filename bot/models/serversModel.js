const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema (like a blueprint)
let serversSchema = new Schema({
  id: String,
  name: String,
  users: Array,
  owner: String,
  ownerEmail: String,
  // timeOfRegistration: String,
  // verificationCode: String,
  // verified: Boolean,
});

let servers = mongoose.model("servers", serversSchema);

module.exports = servers;
