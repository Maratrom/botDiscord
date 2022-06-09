module.exports =
    // Imports
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

    // Code files
    voiceState = require('./voiceState.js'),

    // Events files
    eventReady = require('./events/eventReady.js'),
    eventGuildCreate = require('./events/eventGuildCreate.js'),
    eventGuildDelete = require('./events/eventGuildDelete.js'),
    eventGuildUpdate = require('./events/eventGuildUpdate.js'),
    eventVoiceStateUpdate = require('./events/eventVoiceStateUpdate.js'),
    eventInviteCreate = require('./events/eventInviteCreate.js'),
    eventMessageCreate = require('./events/eventMessageCreate.js'),

    // eventMessages
    messageFeur = require('./events/eventMessages/messageFeur.js'),
    messagePrefix = require('./events/eventMessages/messagePrefix.js'),
    messageTest = require('./events/eventMessages/messageTest.js'),
    messageHelp = require('./events/eventMessages/messageHelp.js'),
    messagePuke = require('./events/eventMessages/messagePuke.js'),
    messageHere = require('./events/eventMessages/messageHere.js'),
    messageTarget = require('./events/eventMessages/messageTarget.js'),
    messageOnline = require('./events/eventMessages/messageOnline.js'),
    messageVoctime = require('./events/eventMessages/messageVoctime.js'),

    // Modules
    calculTime = require('./modules/calculTime.js'),
    setSentence = require('./modules/setSentence.js'),
    translate = require('./modules/translate.js'),

    // .env config
    dotenv.config({ path: './Files/.env' });
