// Imports
import DiscordJS, { Intents } from 'discord.js'
import dotenv from 'dotenv'
// Get token
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})

client.on('ready', () => {
    console.log('MAC MAC MAC')
})

client.on('messageCreate', (message) => {
    if (message.content === 'mac?') {
        message.reply({
            content: 'MAC!'
        })
    }
})

client.login(process.env.TOKEN)