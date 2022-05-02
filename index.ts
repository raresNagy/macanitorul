import DiscordJS, { Intents, Options } from 'discord.js'
import dotenv from 'dotenv'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})

client.on('ready', () => {
    console.log('bot is ready')

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
                type: DiscordJS.Constants.ApplicationCommandOptionTypes.STRING,
            }
        ]
    })
})

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) {
        return
    }

    const { commandName, options } = interaction

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
                content: 'Robotul din sezonul ' + sezon + ' https://imgur.com/a/gJRE1gs',
                ephemeral: false,
            })
        }
        else if (sezon === '5' || sezon === '2020' || sezon === 'Ultimate Goal') {
            interaction.reply({
                content: 'Robotul din sezonul ' + sezon + ' https://imgur.com/a/2vOFlMC',
                ephemeral: false,
            })
        }
        else if (sezon === '4' || sezon === '2019' || sezon === 'Skystone') {
            interaction.reply({
                content: 'Robotul din sezonul ' + sezon + ' https://imgur.com/a/ZtkN6l1',
                ephemeral: false,
            })
        }
        else {
            interaction.reply({
                content: 'Sezonul acesta nu există/nu a fost adăugat încă\nScrie numele, numarul, sau anul altui sezon',
                ephemeral: true,

            })

        }
    }
})

client.on('messageCreate', (message) => {
    if (message.content.includes('auto'))
        message.reply({
            content: 'MAC!'
        })
})

client.login(process.env.TOKEN)