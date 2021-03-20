require("dotenv").config();

const { Client } = require("discord.js");
const client = new Client({
  partials: ["MESSAGE", "REACTION"],
});
const PREFIX = ".";

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in.`);
});

client.on("message", (message:any) => {
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
    }
  }
});

client.login(process.env.TOKEN);
