const importing = require('../../#importing.js');

module.exports = async function (message, commandArgs, servers, indexS) {

    var updatedS = false;

    if (commandArgs.length == 0) {
        message.reply(`Le prefixe est ➜ \`${servers[indexS].prefix}\``);


    } else {
        servers[indexS].prefix = String(commandArgs.join(''));
        updatedS = true;
        message.reply(`**New prefix !** (╯°□°）╯︵ ┻━┻\n➜ \`${servers[indexS].prefix}\``);
    }

    return [updatedS, servers];

}