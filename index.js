require("./discord-bot/index.js")
const fs = require("fs")
fs.readdir('./discord-bot/events', (err, file) => {
    file.forEach(event => {
        require(`./discord-bot/events/${event}`)
    })
})