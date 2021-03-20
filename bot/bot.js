require("dotenv").config();

const { Client } = require("discord.js");
const client = new Client({
  partials: ["MESSAGE", "REACTION"],
});
const PREFIX = ".";

const mongoose = require("mongoose");
//@ts-ignore
const users = require("./models/usersModel");

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => {
    console.log(err);
  });

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  console.log(`[${message.author.tag}]: ${message.content}`);
  if (message.content.startsWith(PREFIX)) {
    const [cmd_name, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      // .split(" ");
      .split(/\s+/);
    if (cmd_name === "register") {
      //   message.channel.send("test");
      if (message.channel.type !== "dm") {
        message.delete();
        message.author.send(
          "DM me '.register `YourEmail@example.com`' to start the verification process."
        );
      } else {
        if (args[0].length > 4) {
          console.log(
            `USER ID: ${message.author.id}, USER TAG: ${message.author.tag}, ARGS: ${args[0]}`
          );
          let isDuplicate = await users.findOne({
            discordID: message.author.id,
          });
          if (isDuplicate) return message.author.send("Duplicate.");
          let newUser = new users({
            discordID: message.author.id,
            discordTag: message.author.tag,
            email: args[0],
            verified: false,
          });
          newUser.save().then((res) => {
            if (res._id) return message.author.send("Check your email!");
            return message.author.send("Error.");
          });
        }
      }
    }
    if (cmd_name === "clear") {
      const numArg = parseInt(args[0]);
      //   console.log(numArg);
      if (numArg > 0) return message.channel.bulkDelete(numArg);
      return message.channel.bulkDelete(5);
    }
  }
});

client.login(process.env.TOKEN);
