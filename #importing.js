module.exports =
    { writeFile, readFile } = require('fs').promises,
    { existsSync } = require('fs'),
    dotenv = require('dotenv'),
    Discord = require('discord.js'),
    client = new Discord.Client({
        intents: [
            Discord.Intents.FLAGS.GUILDS,
            Discord.Intents.FLAGS.GUILD_MESSAGES,
            // Discord.Intents.FLAGS.GUILD_MEMBERS,
            Discord.Intents.FLAGS.GUILD_VOICE_STATES,
            Discord.Intents.FLAGS.GUILD_INVITES
        ]
    }),
    calculTime = require('./calculTime.js'),
    setSentence = require('./setSentence.js'),
    voiceState = require('./voiceState.js'),
    translate = require('./translate.js'),
    dotenv.config();
