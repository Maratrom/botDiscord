const importing = require('../../#importing.js');

module.exports = async function (message, commandArgs, servers, indexS) {

    var updatedS = false;

    if (commandArgs.length == 0 || message.mentions.users.first() == undefined) {
        message.reply(`Vous devez spécifier un membre ! Ex: \n\`${servers[indexS].prefix}voctime \`${client.user.toString()}`);

    } else {
        const userTarget = message.mentions.users.first();
        if (servers[indexS].users.find(u => u.id == userTarget.id)) {
            const duration = calculTime(servers[indexS].users.find(u => u.id == userTarget.id).vocTime);
            message.reply(`\`${userTarget.username}\`${setSentence(duration, "vocTime")}`);
        } else {
            message.reply(`\`${userTarget.username}\` n'a **jamais** passé de temps dans un salon vocal  ┬─┬ ノ( ゜-゜ノ)`);
        }

        return [updatedS, servers];

    }



}