const Discord = require("discord.js")
const config = require("../config.json")
const fs = require("fs")
const client = new Discord.Client({
  intents: [ 
    Discord.IntentsBitField.Flags.Guilds,
    Discord.IntentsBitField.Flags.GuildModeration,
    Discord.IntentsBitField.Flags.GuildIntegrations,
    Discord.IntentsBitField.Flags.GuildWebhooks,
    Discord.IntentsBitField.Flags.GuildInvites,
    Discord.IntentsBitField.Flags.GuildVoiceStates,
    Discord.IntentsBitField.Flags.GuildMessages,
    Discord.IntentsBitField.Flags.GuildPresences,
    Discord.IntentsBitField.Flags.GuildMessageReactions,
    Discord.IntentsBitField.Flags.GuildMessageTyping,
    Discord.IntentsBitField.Flags.DirectMessages,
    Discord.IntentsBitField.Flags.DirectMessageReactions,
    Discord.IntentsBitField.Flags.DirectMessageTyping,
    Discord.IntentsBitField.Flags.MessageContent
  ],
  partials: [
    Discord.Partials.User,
    Discord.Partials.Message,
    Discord.Partials.Reaction,
    Discord.Partials.Channel,
    Discord.Partials.GuildMember
  ]
})
/*
function getNextProjectImageURL(subdirectory) {
    const totalImages = 11;
    const nextImageIndex = (currentImageIndex % totalImages) + 1;
    currentImageIndex = nextImageIndex;
    return projectImagesPath + subdirectory + '/' + nextImageIndex + '.png';
}

setInterval(async () => {
  let nextImageURL = await getNextProjectImageURL('img');

  let guild = await client.guilds.fetch(config.serverID);

  await guild.edit({ icon: nextImageURL })
  .then(async sucess => {
    console.log(`Imagem de logo da comunidade foi alterada: ${sucess}`);
  })
  .catch(async err => {
    console.log(`Erro ao tentar editar a comunidade: ${err}`);
  })

}, 1500); */
/**
 * Código em JavaScript para fazer login de um cliente usando um token de configuração.
 */
module.exports = client;
process.on('uncaughtException', (err, origin) => { console.log(err, origin) });
client.login(config.token);