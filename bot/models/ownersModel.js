const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ownersSchema = new Schema({
  discordID: String,
  discordName: String,
  servers: Array,
  email: String,
  googleId: String,
  verificationCodes: Array,
});

let owners = mongoose.model("owners", ownersSchema);
module.exports = owners;
