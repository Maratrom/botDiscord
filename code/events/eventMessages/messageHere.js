const importing = require('../../#importing.js');

module.exports = async function (message, commandArgs, servers, indexS) {

    var updatedS = false;

    servers[indexS].mainChannel = message.channel.id;
    updatedS = true;
    message.reply(`**New main channel !** (╯°□°）╯︵ ┻━┻\n➜ <#${servers[indexS].mainChannel}>`);

    return [updatedS, servers];

}