import { Message, TextChannel } from "discord.js";
import mongoose from "mongoose";
import verificationCodes from "./models/verificationCodesModel";
import owners from "./models/ownersModel";
import { verifCodesSchema } from "./utils/interface";
import dotenv from "dotenv";
dotenv.config();

const { Client } = require("discord.js");
const client = new Client({
  partials: ["MESSAGE", "REACTION"],
});
const PREFIX = ".";

mongoose
  .connect(process.env.DB_CONNECT!, {
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

client.on("message", async (message:Message) => {
  if (message.author.bot) return;
  console.log(`[${message.author.tag}]: ${message.content}`);
  if (message.content.startsWith(PREFIX)) {
    const [cmd_name, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      // .split(" ");
      .split(/\s+/);

    // const isDM = message.channel.type === "dm";
    const inServer = message.channel.type = "text"; // a guild text channel

    if (cmd_name === "register") {

      if (!inServer) return message.author.send(
        "'.register' only works in servers."
      );

      if (inServer) {
        message.delete();
        message.author.send(
          "DM me '.register `YourEmail@example.com`' to start/continue the verification process."
        );

        const isDuplicates = await verificationCodes.find({
          discordTag: message.author.tag,
        });

        console.log(isDuplicates);

        let alreadyRegisteringForThisServer = false;
        isDuplicates.map((user:verifCodesSchema) => {
          const registeringForSameServer = user.serverId === message.guild!.id;
          if (registeringForSameServer) {
            alreadyRegisteringForThisServer = true;
          }
        });

        if (alreadyRegisteringForThisServer) {
          return message.author.send(
            ".registerEmail `YOUR_EMAIL` is your next step towards registering on this server."
          );
        } else {
          const verificationCode =
          Math.random().toString(36).substring(7) +
          Math.random().toString(36).substring(7);
  
          let verif = new verificationCodes({
            discordId: message.author.id,
            discordTag: message.author.tag,
            email: "",
            avatar: message.author.displayAvatarURL(),
            serverId: message.guild!.id,
            serverName: message.guild!.name,
            verificationCode: verificationCode,
            time: new Date().toUTCString(),
          });
          await verif.save();
        }
      }
    } else if (cmd_name === "clear") {
      const numArg = parseInt(args[0]);
      if (numArg > 0) return (message.channel as TextChannel).bulkDelete(numArg);
      return (message.channel as TextChannel).bulkDelete(5);
    }
  }
});

client.login(process.env.TOKEN);
