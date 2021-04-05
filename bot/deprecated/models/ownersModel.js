const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ownersSchema = new Schema({
  discordId: String,
  discordName: String,
  servers: Array,
  email: String,
  googleId: String,
  verificationCodes: Array,
  membership: String,
});

let owners = mongoose.model("owners", ownersSchema);
module.exports = owners;
