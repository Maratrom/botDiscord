const importing = require('../#importing.js');


module.exports = async function (message) {

    messageFeur(message); // Vérifie la fin du message pour envoyer "feur" ou "quette" si nécessaire

    if (message.author.bot) return; // Si le message est envoyé par un bot, on sort de la fonction

    let servers = JSON.parse(await readFile('./Files/servers.json')).servers; // On récupère les serveurs
    const server = servers.find(s => s.id == message.guild.id); // On récupère le serveur du message
    const indexS = servers.indexOf(server); // On récupère l'index du serveur
    let updatedS = false; // updated est un booléen qui permet de savoir des données des .json ont été modifiées

    let users = JSON.parse(await readFile('./Files/users.json')).users;
    let user = users.find(u => u.id == message.author.id);
    const indexU = users.indexOf(user);
    let updatedU = false;

    if (message.content.startsWith(`${servers[indexS].prefix}`)) { // Si le message commence par le préfix du serveur

        var command = message.content.replace(`${servers[indexS].prefix}`, '');
        var commandArray = command.split(' ');
        commandArray.find(part => part == "" ? commandArray.splice(commandArray.indexOf(part), 1) : null);
        var commandName = commandArray[0];
        var commandArgs = commandArray.slice(1);

        if (commandName == "prefix") {
            [updatedS, servers] = await messagePrefix(message, commandArgs, servers, indexS);

        } else if (commandName == "test") {
            [updatedS, servers] = await messageTest(message, commandArgs, servers, indexS);

        } else if (commandName == "help") {
            [updatedS, servers] = await messageHelp(message, commandArgs, servers, indexS);

        } else if (commandName == "puke") {
            [updatedU, users] = await messagePuke(message, commandArgs, users, user, indexU);

        } else if (commandName == "here") {
            [updatedS, servers] = await messageHere(message, commandArgs, servers, indexS);

        } else if (commandName == "target") {
            [updatedS, servers] = await messageTarget(message, commandArgs, servers, indexS);

        } else if (commandName == "online") {
            [updatedS, servers] = await messageOnline(message, commandArgs, servers, indexS);

        } else if (commandName == "voctime") {
            [updatedS, servers] = await messageVoctime(message, commandArgs, servers, indexS);
        }


        if (updatedS) { await writeFile('./Files/servers.json', JSON.stringify({ servers: servers }, null, 2)); }

        if (updatedU) { await writeFile('./Files/users.json', JSON.stringify({ users: users }, null, 2)); }
    }

}