const client = require("../index")
const Discord = require("discord.js")
client.on("ready", () => {
    console.log(`Eu estou em execução em ${client.user.username}`)
    client.user.setActivity(`www.empreendedo.com`, { type: Discord.ActivityType.Playing });
  })