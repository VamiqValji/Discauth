const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let verificationCodesSchema = new Schema({
  discordId: String,
  discordTag: String,
  email: String,
  verificationCode: String,
});

let verificationCodes = mongoose.model(
  "verificationCodes",
  verificationCodesSchema
);

module.exports = verificationCodes;
