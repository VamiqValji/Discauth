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
      const isDuplicate = await users.findOne({
        discordID: message.author.id,
      });
      if (message.channel.type !== "dm") {
        // message sent in server
        message.delete();
        message.author.send(
          "DM me '.register `YourEmail@example.com`' to start/continue the verification process."
        );
        console.log(
          `USER ID: ${message.author.id}, \nUSER TAG: ${
            message.author.tag
          }, \nARGS: ${args[0]}, \nSERVER ID: ${
            message.guild.id
          }, \nSERVER NAME: ${message.guild.name}, \nVERIFICATION CODE: ${
            Math.random().toString(36).substring(7) +
            Math.random().toString(36).substring(7)
          }`
        );
        if (!isDuplicate) {
          let newUser = new users({
            discordID: message.author.id,
            discordTag: message.author.tag,
            serverID: message.guild.id,
            serverName: message.guild.name,
            email: "temp_args[0]",
            timeOfRegistration: new Date().toUTCString(),
            verificationCode:
              Math.random().toString(36).substring(7) +
              Math.random().toString(36).substring(7),
            verified: false,
          });

          newUser.save().then((res) => {
            if (res._id)
              return message.author.send(
                "Check your email! Follow those instructions."
              );
            return message.author.send("Error.");
          });
        }
      } else {
        // message sent to bot in dm
        let isRealEmail;
        try {
          isRealEmail = args[0].length > 4;
        } catch {
          return message.author.send(
            "Pass in a real email. Example: '.register `YourEmail@example.com`'"
          );
        }

        const hasTemporaryEmail = isDuplicate.email === "temp_args[0]";
        if (isRealEmail) {
          if (isDuplicate) {
            if (hasTemporaryEmail) {
              await users.findOneAndUpdate(
                {
                  discordID: message.author.id,
                },
                {
                  $set: {
                    email: args[0],
                  },
                }
              );
            }
            // send email
            return message.author.send(
              "Already registered. Did you mean '.verify `VerificationCodeFromEmail`'? Check your email for the code."
            );
          } else {
            return message.author.send("Start by registering in a server.");
          }
        } else {
          return message.author.send(
            "Pass in a real email. Example: '.register `YourEmail@example.com`'"
          );
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
