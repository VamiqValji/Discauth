require("dotenv").config();

const { Client } = require("discord.js");
const client = new Client({
  partials: ["MESSAGE", "REACTION"],
});
const PREFIX = ".";

const mongoose = require("mongoose");
//@ts-ignore
const users = require("./models/usersModel");
const owners = require("./models/ownersModel");
// const servers = require("./models/serversModel");

const { sendEmail } = require("./src/nodeMailer");

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
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
      const verificationCode =
        Math.random().toString(36).substring(7) +
        Math.random().toString(36).substring(7);
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
          `USER ID: ${message.author.id}, \nUSER TAG: ${message.author.tag}, \nARGS: ${args[0]}, \nSERVER ID: ${message.guild.id}, \nSERVER NAME: ${message.guild.name}, \nVERIFICATION CODE: ${verificationCode}`
        );
        if (!isDuplicate) {
          let newUser = new users({
            discordID: message.author.id,
            discordTag: message.author.tag,
            // serverID: message.guild.id,
            // serverName: message.guild.name,
            serversData: [
              {
                id: message.guild.id,
                name: message.guild.name,
                verificationCode: verificationCode,
                verified: false,
                timeOfRegistration: new Date().toUTCString(),
              },
            ],
            email: "temp_args[0]",
          });

          newUser.save().then((res) => {
            if (res._id) return; // saved to db
            // return message.author.send(
            //   "Check your email! Follow those instructions."
            // );
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
            // if (hasTemporaryEmail) {
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
            // }

            // send email

            sendEmail(args[0], verificationCode, isDuplicate.serverName);

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
    } else if (cmd_name === "verify") {
      const userInputtedVerificationCode = args[0];
      if (userInputtedVerificationCode.length < 7)
        return message.author.send(
          "Please pass in an appropriate verification code. Example: '.verify `VerificationCodeFromEmail`'"
        );
      const isDuplicate = await users.findOne({
        discordID: message.author.id,
      });
      for (let i = 0; i < isDuplicate.serversData.length; i++) {
        console.log(isDuplicate.serversData[i]);
        if (
          isDuplicate.serversData[i].verificationCode ===
          userInputtedVerificationCode
        ) {
          // server.verified = true;

          if (isDuplicate.serversData[i].verified === false) {
            // let server = new servers({
            //   id: "",
            //   name: "",
            //   users: "",
            //   owner: "",
            //   ownerEmail: "",
            // });

            // await server.save();

            // isDuplicate.delete();

            isDuplicate.serversData[i].verified = true;
            isDuplicate.markModified("serversData");
            await isDuplicate.save();
            return message.author.send(
              `You verified for the server ${isDuplicate.serversData[i].name}. :white_check_mark:.`
            );
          }
          return message.author.send(
            `You are already verified for the server ${isDuplicate.serversData[i].name}. :white_check_mark:.`
          );
        } else {
          return message.author.send(
            "Please pass in an appropriate verification code. Example: '.verify `VerificationCodeFromEmail`'"
          );
        }
      }
    } else if (cmd_name === "clear") {
      const numArg = parseInt(args[0]);
      //   console.log(numArg);
      if (numArg > 0) return message.channel.bulkDelete(numArg);
      return message.channel.bulkDelete(5);
    } else if (cmd_name === "registerServer") {
      if (args[0] === undefined || args[0].length < 2) return;
      const foundOne = await owners.findOne({
        "verificationCodes.serverName": message.guild.name,
      });
      if (foundOne) {
        // let temp = foundOne.verificationCodes.filter(
        //   (data) => data.serverName === message.guild.name
        // );

        for (let i = 0; i < foundOne.verificationCodes.length; i++) {
          const serverIsRegistered =
            foundOne.verificationCodes[i].code === "" ||
            foundOne.verificationCodes[i].code === null;
          if (serverIsRegistered) {
            return message.channel.send(`This server is already registered.`);
          } else {
            const serverNameMatches =
              foundOne.verificationCodes[i].serverName === message.guild.name;
            if (serverNameMatches) {
              const codeIsCorrect =
                args[0] === foundOne.verificationCodes[i].code;
              if (codeIsCorrect) {
                foundOne.verificationCodes[i].code = "";
                foundOne.markModified("verificationCodes");
                foundOne.save();
                return message.channel.send(
                  `Verified & registered '${message.guild.name}'.`
                );
              } else {
                return message.channel.send(`Incorrect.`);
              }
            } else {
              return message.channel.send(
                `Didn't add server on the web page yet..`
              );
            }
          }
        }
      }
    }
  }
});

client.login(process.env.TOKEN);
