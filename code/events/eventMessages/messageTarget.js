const importing = require('../../#importing.js');

module.exports = async function (message, commandArgs, servers, indexS) {

    var updatedS = false;

    if (commandArgs.length == 0) {
        message.reply(`Vous devez spécifier une action et un utilisateur ! Ex: \`${servers[indexS].prefix}target add \`${client.user.toString()}`);

    } else if (commandArgs[0] != "add" && commandArgs[0] != "remove" && commandArgs[0] != "all" && commandArgs[0] != "list") {
        message.reply(`Vous devez spécifier une action valide ! Ex: \`${servers[indexS].prefix}target add \`${client.user.toString()}`);

    } else if ((commandArgs[0] == "add" || commandArgs[0] == "remove") && (commandArgs[1] == undefined || (commandArgs[1] != "all" && !commandArgs[1].startsWith('<@') && !commandArgs[1].endsWith('>')))) {
        if ((commandArgs[1] == undefined || !commandArgs[1].startsWith('<@') || !commandArgs[1].endsWith('>'))) {
            if (commandArgs[1] != "all") {
                message.reply(`Vous devez spécifier un utilisateur ! Ex: \`${servers[indexS].prefix}target add \`${client.user.toString()}`);
            }
        }


    } else {
        if (commandArgs[0] == "add") {
            const userTarget = message.mentions.users.first();
            if (userTarget) {
                if (servers[indexS].target[0] == "all") {
                    servers[indexS].target.splice(0, 1);
                    updatedS = true;
                }

                if (servers[indexS].target.find(id => id == userTarget.id)) {
                    message.reply(`Target is already in the list !`);
                } else {
                    servers[indexS].target.push(userTarget.id);
                    updatedS = true;
                }

            } else if (commandArgs[1] == "all") {
                servers[indexS].target = ["all"];
                updatedS = true;
            }

            if (updatedS) {
                message.reply(`**New target !** (╯°□°）╯︵ ┻━┻\n➜ ${commandArgs[1] == "all" ? "\`all\`" : `\`${userTarget.username}\``}`);
            }


        } else if (commandArgs[0] == "remove") {
            const userTarget = message.mentions.users.first();
            if (userTarget) {
                if (!servers[indexS].target.find(id => id == userTarget.id)) {
                    message.reply(`This user is not in the list !`);

                } else {
                    servers[indexS].target.splice(servers[indexS].target.indexOf(userTarget.id), 1);
                    updatedS = true;
                }

            } else if (commandArgs[1] == "all") {
                servers[indexS].target = [];
                updatedS = true;
            }

            if (updatedS) {
                message.reply(`**Target deleted** ┬─┬ ノ( ゜-゜ノ)\n➜ ${servers[indexS].target.length == 0 ? "\`no more target\`" : `\`${userTarget.username}\``}`);
            }


        } else if (commandArgs[0] == "all") {
            servers[indexS].target = ["all"];
            updatedS = true;
            message.reply(`**New target !** (╯°□°）╯︵ ┻━┻\n➜ \`all\``);


        } else if (commandArgs[0] == "list") {
            let list = [];
            if (servers[indexS].target[0] != "all") {
                for (user of servers[indexS].target) {
                    await message.guild.members.fetch(user).then(member => {
                        list.push(`\`${member.user.username}\``);
                    });
                }
            }
            message.reply(`**Target list :** ${list.length == 0 ? servers[indexS].target[0] == "all" ? "➜\n\`all users\`" : "➜\n\`no target\`" : "\n ➜ " + list.join("\n ➜ ")}`);
        }
    }

    return [updatedS, servers];

}