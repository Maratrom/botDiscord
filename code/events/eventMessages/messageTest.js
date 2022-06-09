const importing = require('../../#importing.js');

module.exports = async function (message, commandArgs, servers, indexS) {

    var updatedS = false;

    message.reply(`Ca marche?`);
    message.guild.channels.cache.get(servers[indexS].mainChannel)
        .send(`${message.author.toString()} <#${servers[indexS].mainChannel}> est le salon principal du serveur ${servers[indexS].name}`);

    return [updatedS, servers];

}