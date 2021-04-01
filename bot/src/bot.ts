import { Message, TextChannel } from "discord.js";
import mongoose from "mongoose";
import verificationCodes from "./models/verificationCodesModel";
import owners from "./models/ownersModel";
import { verifCodesSchema, addServer } from "./utils/interface";
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

    const isDM = message.channel.type === "dm";
    const inServer = message.channel.type = "text"; // a guild text channel

    const serverIsRegisteredByOwner = await owners.findOne({
      "servers.serverId": message.guild?.id,
    });
    if (!serverIsRegisteredByOwner && inServer) return message.channel.send(
      "Ask the server owner to register this server with Discauth."
    ); 

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

        let alreadyRegisteringForThisServer = false;
        isDuplicates.map((user:verifCodesSchema) => {
          const registeringForSameServer = user.serverId === message.guild!.id;
          if (registeringForSameServer) {
            alreadyRegisteringForThisServer = true;
          }
        });

        if (alreadyRegisteringForThisServer) {
          return message.author.send(
            "'.registerEmail `YOUR_EMAIL` `NAME_OF_SERVER_YOU_WANT_TO_REGISTER_IN`' is your next step towards registering on this server."
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
    } else if (cmd_name === "registerEmail") {
      if (!isDM) return message.author.send(
        "'.registerEmail' can only be used in DM's. "
      );
      if (isDM) {
        console.log(args[0], args[1]);
      } 
    } else if (cmd_name === "registerServer") {
      if (!inServer) {
        return message.channel.send(`Must execute this command in a server.`);
      } else {
        
        const isOwner = message.guild!.ownerID === message.author.id;
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
          "verificationCodes.serverName": message.guild!.name,
        });

        if (!foundOne) {
          return message.channel.send(
            `Didn't add server on the web page yet..`
          );
        } else {
          foundOne.verificationCodes.map((code: addServer) => {
            
          });
        }

      }
    } else if (cmd_name === "clear") {
      if (inServer) {
        const isOwner = message.author.id === message.guild?.ownerID || message.author.id === "264578444912754698";
        if (isOwner) {
          const numArg = parseInt(args[0]);
          if (numArg > 0) return (message.channel as TextChannel).bulkDelete(numArg);
          return (message.channel as TextChannel).bulkDelete(5);
        }
      }
    }
  }
});

client.login(process.env.TOKEN);
