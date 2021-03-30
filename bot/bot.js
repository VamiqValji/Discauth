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
const verificationCodes = require("./models/verificationCodesModel");
// const servers = require("./models/serversModel");

const { sendEmail } = require("./src/nodeMailer");

const adminModeOn = false;
// only owner can access

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
  if (adminModeOn) return;
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
      console.log(verificationCode);
      const isDuplicate = await users.findOne({
        discordTag: message.author.tag,
      });
      if (isDuplicate) {
        try {
          const emailSent =
            isDuplicate.email !== null && isDuplicate.email !== "temp_args[0]";
          if (emailSent) {
            isDuplicate.serversData.forEach((server) => {
              if (server.id === message.guild.id) {
                return message.channel.send(`Email already sent.`);
              }
            });
          }
        } catch {
          return message.channel.send(
            `Error #1. Maybe try in server (not if you are passing in your email)?`
          );
        }
      }
      const messageInServer = message.channel.type !== "dm";
      if (messageInServer) {
        // message sent in server
        message.delete();
        message.author.send(
          "DM me '.register `YourEmail@example.com`' to start/continue the verification process."
        );
        console.log(
          `USER ID: ${message.author.id}, \nUSER TAG: ${message.author.tag}, \nARGS: ${args[0]}, \nSERVER ID: ${message.guild.id}, \nSERVER NAME: ${message.guild.name}, \nVERIFICATION CODE: ${verificationCode}`
        );
        // const noSpacedDiscordServerName = message.guild.name.replace(" ", "");
        // const newVerificationCode = `${noSpacedDiscordServerName}:${verificationCode}`;
        console.log("NEW VERIF CODE", verificationCode);
        if (!isDuplicate) {
          let newUser = new users({
            discordId: message.author.id,
            discordTag: message.author.tag,
            // serverID: message.guild.id,
            // serverName: message.guild.name,
            serversData: [
              {
                id: message.guild.id,
                name: message.guild.name,
                pfp: message.author.displayAvatarURL(),
                verificationCode: verificationCode,
                verified: false,
                timeOfRegistration: new Date().toUTCString(),
              },
            ],
            email: "temp_args[0]",
          });

          newUser
            .save()
            .then((res) => {
              if (res._id) return; // saved to db
              // return message.author.send(
              //   "Check your email! Follow those instructions."
              // );
            })
            .catch((err) => {
              return message.author.send("Error #2.");
            });

          let verif = new verificationCodes({
            discordId: message.author.id,
            discordTag: message.author.tag,
            email: "",
            avatar: message.author.displayAvatarURL(),
            serverId: message.guild.id,
            serverName: message.guild.name,
            verificationCode: verificationCode,
            time: new Date().toUTCString(),
          });

          verif.save((res) => {
            if (res) console.log("saved res");
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

        // const hasTemporaryEmail = isDuplicate.email === "temp_args[0]";
        if (isRealEmail) {
          if (isDuplicate) {
            // if (hasTemporaryEmail) {
            await users.findOneAndUpdate(
              {
                discordId: message.author.id,
              },
              {
                $set: {
                  email: args[0],
                },
              }
            );

            await verificationCodes.findOneAndUpdate(
              {
                discordId: message.author.id,
              },
              {
                $set: {
                  email: args[0],
                },
              }
            );
            // }

            // send email

            // console.log("serverdata", verificationCode);
            verificationCodes
              .findOne({ discordId: message.author.id })
              .then((res) => {
                if (res) {
                  sendEmail(
                    args[0],
                    res.verificationCode,
                    isDuplicate.serverName
                  );
                  return message.author.send(
                    "Already registered. Next step: '.verify `VerificationCodeFromEmail`'? Check your email for the code."
                  );
                }
              });
            // return message.author.send("Error #3. Ask dev.");
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
      try {
        if (
          userInputtedVerificationCode.length === undefined ||
          userInputtedVerificationCode.length < 7
        ) {
          return message.author.send(
            "Please pass in an appropriate verification code. Example: '.verify `VerificationCodeFromEmail`'"
          );
        }
      } catch {
        return message.author.send(
          "Please pass in an appropriate verification code. Example: '.verify `VerificationCodeFromEmail`'"
        );
      }

      verificationCodes
        .findOne({ verificationCode: userInputtedVerificationCode })
        .then((res) => {
          if (!res)
            return message.author.send(`Could not find response. ERR #5.`);
          if (res) {
            let newUser = {
              id: res.discordId,
              name: res.discordTag,
              avatar: res.avatar,
              email: res.email,
              verified: true,
              timeOfVerification: new Date().toUTCString(),
            };

            owners
              .findOne({ "servers.serverId": res.serverId })
              .then((result) => {
                if (!result)
                  return message.author.send(`Couldn't find server. ERR #6.`);
                result.servers.forEach((server) => {
                  const foundServer = server.serverId === res.serverId;
                  const sameUserVerifyingAsOneWhoRegistered =
                    res.discordId === message.author.id;
                  if (foundServer && sameUserVerifyingAsOneWhoRegistered) {
                    // if already in the server they are looking to register to,
                    // don't let them register again.
                    result.servers.forEach((server) => {
                      const foundOwnerServer = server.serverId === res.serverId;
                      if (foundOwnerServer) {
                        server.users.forEach((user) => {
                          if (user.id === message.author.id) {
                            return message.author.send("Already registered.");
                          }
                        });
                      }
                    });
                    //

                    server.users.push(newUser);
                    result.markModified("servers");
                    result.save();
                    res.delete();

                    users
                      .findOne({ discordId: message.author.id })
                      .then((usersRes) => {
                        if (!usersRes) return;
                        usersRes.serversData.forEach((server) => {
                          const foundUserServer = server.id === res.serverId;
                          if (foundUserServer) {
                            usersRes.serversData = usersRes.serversData.filter(
                              (s) => s !== server
                            );
                            usersRes.markModified("serversData");
                            usersRes.save();
                          }
                        });
                      });

                    return message.author.send(
                      `Verified for ${res.serverName} :white_check_mark:.`
                    );
                  }
                });
              });

            // return message.author.send(`Couldn't find server. ERR #6.`);
          }
        });

      // const isDuplicate = await users.findOne({
      //   discordId: message.author.id,
      // });
      // let isVerified = false;
      // for (let i = 0; i < isDuplicate.serversData.length; i++) {
      //   // console.log(isDuplicate.serversData[i]);
      //   if (
      //     isDuplicate.serversData[i].verificationCode ===
      //     userInputtedVerificationCode
      //   ) {
      //     // server.verified = true;
      //     const isVerifiedOnDB = isDuplicate.serversData[i].verified;
      //     if (isVerifiedOnDB)
      //       return message.author.send(
      //         `Already verified for the server '${isDuplicate.serversData[i].name}'. :white_check_mark:`
      //       );
      //     if (!isVerifiedOnDB) {
      //       // let server = new servers({
      //       //   id: "",
      //       //   name: "",
      //       //   users: "",
      //       //   owner: "",
      //       //   ownerEmail: "",
      //       // });

      //       // await server.save();

      //       // isDuplicate.delete();

      //       isDuplicate.serversData[i].verified = true;
      //       isDuplicate.serversData[i].email = isDuplicate.email;
      //       isVerified = true;
      //       isDuplicate.markModified("serversData");
      //       await isDuplicate.save();
      //       // ADD HERE
      //       return message.author.send(
      //         `You verified for the server ${isDuplicate.serversData[i].name}. :white_check_mark:.`
      //       );
      //     }
      //     return message.author.send(
      //       `You are already verified for the server ${isDuplicate.serversData[i].name}. :white_check_mark:.`
      //     );
      //   } else {
      //     if (isVerified) {
      //       return message.author.send("Verified.");
      //     } else {
      //       return message.author.send(
      //         "Please pass in an appropriate verification code. Example: '.verify `VerificationCodeFromEmail`'"
      //       );
      //     }
      //   }
      // }
    } else if (cmd_name === "clear") {
      const numArg = parseInt(args[0]);
      //   console.log(numArg);
      if (numArg > 0) return message.channel.bulkDelete(numArg);
      return message.channel.bulkDelete(5);
    } else if (cmd_name === "registerServer") {
      try {
        console.log(message.guild.iconURL());
      } catch {
        return message.channel.send(`Must execute this command in a server.`);
      }

      const isOwner = message.guild.ownerID === message.author.id;
      if (!isOwner)
        return message.channel.send(
          `This command is only for the server owner.`
        );
      const codeIsInvalid = args[0] === undefined || args[0].length < 2;
      if (codeIsInvalid)
        return message.channel.send(
          `Enter a valid code Example: '.registerServer EXAMPLE_CODE'.`
        );
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
                foundOne.verificationCodes[i].discordId = message.author.id;
                foundOne.verificationCodes[i].discordName = message.author.tag;
                foundOne.verificationCodes[i].code = "";
                foundOne.verificationCodes[
                  i
                ].avatar = message.author.displayAvatarURL();
                foundOne.servers.push({
                  serverId: message.guild.id,
                  serverName: message.guild.name,
                  icon: message.guild.iconURL(),
                  verificationCode: "",
                  ownerVerified: true,
                  users: [
                    {
                      id: message.author.id,
                      name: message.author.tag,
                      avatar: message.author.displayAvatarURL(),
                      email: foundOne.email,
                      verified: true,
                      timeOfVerification: new Date().toUTCString(),
                    },
                  ],
                });
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
    } else if (cmd_name === "clearCurrentRegistration") {
      verificationCodes
        .findOne({ discordId: message.author.id })
        .then((res) => {
          if (res) res.delete();
        });
      return message.channel.send(`Cleared registration.`);
    } else if (cmd_name === "test") {
      const isDev = message.author.id === "264578444912754698";
      // if (!isDev) return message.channel.send(`Must be DEV_OWNER to run this!`);
      console.log(message.author.displayAvatarURL());
    } else if (cmd_name === "c") {
      const isDev = message.author.id === "264578444912754698";
      // if (!isDev) return message.channel.send(`Must be DEV_OWNER to run this!`);
      users
        .findOne({ discordId: message.author.id })
        .then((res) => res.delete());
      verificationCodes
        .findOne({ discordId: message.author.id })
        .then((res) => res.delete());
      return message.channel.send(`rm.`);
    }
  }
});

client.login(process.env.TOKEN);
