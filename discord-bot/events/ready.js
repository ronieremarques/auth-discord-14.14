const client = require("../index")
client.on("ready", () => {
    console.log(`Eu estou em execução em ${client.user.username}`)
  })