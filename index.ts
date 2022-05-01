// Imports
import { userMention } from '@discordjs/builders';
import DiscordJS, { Intents, Interaction, InteractionCollector, Message, MessageAttachment, Options, User } from 'discord.js'
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

    const guildId = '816709720894472215'
    const guild = client.guilds.cache.get(guildId)
    let commands

    if (guild)
        commands = guild.commands
    else
        commands = client.application?.commands

    commands?.create({
        name: 'ping',
        description: 'Replies with pong.',
    })

    commands?.create({
        name: 'robot',
        description: 'Vezi un robot Xeo din sezonul precizat',
        options: [
            {
                name: 'sezon',
                description: 'Numele sau numarul sezonului.',
                required: true,
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING
            }
        ]
    })
})


client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction
    var FreightFrenzy = []
    const FreightFrenzyFolder = fs.readdirSync('FreightFrenzy')

    for (const file of FreightFrenzyFolder) {
        FreightFrenzy.push('./FreightFrenzy/' + file)
    }


    if (commandName === 'ping') {
        interaction.reply({
            content: 'pong',
            ephemeral: true,
        })
    }
    else if (commandName === 'robot') {
        const sezon = options.getString('sezon')
        if (sezon === '6' || sezon === '2021' || sezon === 'Freight Frenzy') {
            interaction.reply({
                content: 'Uite https://imgur.com/a/gJRE1gs',
                ephemeral: false,
            })
        }
        else {
            interaction.reply({
                content: 'Sezonul acesta nu exista\n scrie numele, numarul, sau anul sezonului',
                ephemeral: true,

            })

        }
    }
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