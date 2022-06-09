const importing = require('../../#importing.js');

module.exports = async function (message, commandArgs, servers, indexS) {

    var updatedS = false;

    if (commandArgs.length == 0) {
        message.reply(`Vous devez spécifier un état ! Ex: \n\`${servers[indexS].prefix}online true\`\n\`${servers[indexS].prefix}online false\``);
        
    } else if (commandArgs[0] != "true" && commandArgs[0] != "false") {
        message.reply(`Vous devez spécifier un état valide ! Ex: \n\`${servers[indexS].prefix}online true\`\n\`${servers[indexS].prefix}online false\``);
    } else {
        if (commandArgs[0] == "true") {
            servers[indexS].online = true;
            message.reply(`**Online message will be sent** (╯°□°）╯︵ ┻━┻`)

        } else if (commandArgs[0] == "false") {
            servers[indexS].online = false;
            message.reply(`**Online message wont be sent** ┬─┬ ノ( ゜-゜ノ)`)
        }
        updatedS = true;
    }

    return [updatedS, servers];

}