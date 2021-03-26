const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema (like a blueprint)
let ownersSchema = new Schema({
  discordId: String,
  discordName: String,
  servers: Array,
  email: String,
  googleId: String,
  verificationCodes: Array,
  // verified: Boolean,
});

/* 
example servers array

servers: [{ 
    serverId: ""
    users: [{ id: "", name: "", verificationCode: String, ownerVerified: false, }],
}]

example servers array

verificationCodes: [
 {serverId: "", code: "random", serverName: ""}
]

*/

let owners = mongoose.model("owners", ownersSchema);

module.exports = owners;
