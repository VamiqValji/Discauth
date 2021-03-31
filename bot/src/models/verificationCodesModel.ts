const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let verificationCodesSchema = new Schema({
  discordId: String,
  discordTag: String,
  avatar: String,
  email: String,
  serverId: String,
  serverName: String,
  verificationCode: String,
  time: String,
});

let verificationCodes = mongoose.model(
  "verificationCodes",
  verificationCodesSchema
);

// module.exports = verificationCodes;
export default verificationCodes;
