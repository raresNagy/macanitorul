import { SlashCommandBuilder } from "@discordjs/builders";
const { REST } = require('@discordjs/rest')
import Routes from 'discord-api-types/v10'
import dotenv from 'dotenv'
dotenv.config()

const commands = [
    new SlashCommandBuilder().setName('robot').setDescription('Shows Xeo Robot from requested season'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
	new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),
]

    .map(comand => comand.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

rest.put(Routes.application(process.env.CLIENTID, process.env.GUILDID))
