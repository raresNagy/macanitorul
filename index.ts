// Imports
import DiscordJS, { Intents} from 'discord.js'
import dotenv from 'dotenv'
import fs from 'node:fs';
dotenv.config()
const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
    const command = require('./commands/${file}')
    commands.push(command.data.toJSON());
}

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
    // Test
    if (message.content === 'mac?') {
        message.reply({
            content: 'MAC!'
        })
    }
    // else if (message.content)
})


client.on('messageCreate', (message) => {
    if (message.content.includes('auto'))
        message.reply({
            content: 'MAC!'
        })
})

client.login(process.env.TOKEN)