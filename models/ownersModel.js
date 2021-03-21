const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema (like a blueprint)
let ownersSchema = new Schema({
  discordID: String,
  discordName: String,
  servers: Array,
  email: String,
  googleId: String,
  verificationCode: String,
  verified: Boolean,
});

/* 
example servers array

servers: [{ 
    serverId: ""
    users: [{ id: "", name: "", verified: false}],
}]

*/

let owners = mongoose.model("owners", ownersSchema);

module.exports = owners;
