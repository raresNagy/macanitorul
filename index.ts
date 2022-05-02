import DiscordJS, { Intents, Options } from 'discord.js'
import dotenv from 'dotenv'
import fs from 'fs'
dotenv.config()

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
    ]
})

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'))

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
        if (sezon == data.FreightFrenzy.number || sezon == data.FreightFrenzy.year || sezon == data.FreightFrenzy.span || sezon == data.FreightFrenzy.name) {
            interaction.reply({
                content: 'Robot Xeo ' + data.FreightFrenzy.team[14278].bot,
                ephemeral: false,
            })
        }
        else if (sezon =='5' || sezon == '2020' || sezon == 'Ultimate Goal') {
            interaction.reply({
                content: 'Robotul din sezonul ' + sezon + ' ' + data.UltimateGoal.team[14278].bot,
                ephemeral: false,
            })
        }
        else if (sezon == data.Skystone.number || sezon == data.Skystone.year || sezon == data.Skystone.span || sezon == data.Skystone.name) {
            interaction.reply({
                content: 'Robotul din sezonul ' + sezon + ' ' + data.Skystone.team[14278].bot,
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