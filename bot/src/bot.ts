require("dotenv").config();

const { Client } = require("discord.js");
const client = new Client({
  partials: ["MESSAGE", "REACTION"],
});
const PREFIX = ".";

import verificationCodes from "./models/verificationCodesModel";
import owners from "./models/ownersModel";
import {verifCodesSchema} from "./utils/interface";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("message", async (message:any) => {
  if (message.author.bot) return;
  console.log(`[${message.author.tag}]: ${message.content}`);
  if (message.content.startsWith(PREFIX)) {
    const [cmd_name, ...args] = message.content
      .trim()
      .substring(PREFIX.length)
      // .split(" ");
      .split(/\s+/);

    const isDM = message.channel.type === "dm";

    const verificationCode =
    Math.random().toString(36).substring(7) +
    Math.random().toString(36).substring(7);

    if (cmd_name === "register") {
      const isDuplicates = await verificationCodes.find({
        discordTag: message.author.tag,
      });

      // isDuplicates.map((user:verifCodesSchema) => {
      //   if (user.)
      // });

      if (!isDM /*&& !isDuplicates*/) {
        message.delete();
        message.author.send(
          "DM me '.register `YourEmail@example.com`' to start/continue the verification process."
        );

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
        await verif.save();
      }
      // if (isDuplicates && isDM) {

      // }
    } else if (cmd_name === "clear") {
      const numArg = parseInt(args[0]);
      if (numArg > 0) return message.channel.bulkDelete(numArg);
      return message.channel.bulkDelete(5);
    }
  }
});

client.login(process.env.TOKEN);
