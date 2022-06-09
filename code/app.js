const importing = require('./#importing'); // Importation du fichier d'importation



client.on('ready', async () => { // Quand le bot est lancé
    await eventReady();
});


client.on('guildCreate', async guild => { // Quand le bot est ajouté à un serveur
    await eventGuildCreate(guild); 
});


client.on('guildDelete', async guild => { // Quand le bot est supprimé d'un serveur
    await eventGuildDelete(guild);
});


client.on('guildUpdate', async (oldGuild, newGuild) => { // Quand un serveur est modifié
    await eventGuildUpdate(oldGuild, newGuild);
});


client.on('messageCreate', async message => { // Quand un message est envoyé
    await eventMessageCreate(message);
});


client.on('voiceStateUpdate', async (oldMember, newMember) => { // Quand le status vocal d'un membre change
    await eventVoiceStateUpdate(oldMember, newMember);
});


client.on('inviteCreate', async (invite) => { // Quand un membre invite un autre membre
    await eventInviteCreate(invite);
})


client.login(String(process.env.TOKEN));  // Login du bot