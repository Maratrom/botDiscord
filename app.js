const importing = require('./#importing');

client.on('ready', async () => {
    let servers = JSON.parse(await readFile('./Files/servers.json')).servers;
    for (server of servers) {
        if (server.online) {
            client.channels.cache.get(server.mainChannel).send((`Logged in as: ${client.user.toString()}!`));
        }
    }
    console.log(`Logged in as: ${client.user.tag} in ${servers.length} server${servers.length > 1 ? "s" : ""}!`);
});


client.on('guildCreate', async guild => {
    console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
    let servers = JSON.parse(await readFile('./Files/servers.json')).servers;
    let newServer = {
        id: guild.id,
        name: guild.name,
        prefix: "!",
        mainChannel: guild.channels.cache.find(channel => channel.type == "GUILD_TEXT").id,
        target: ["all"],
        online: true,
        users: []
    }
    servers.push(newServer);
    await writeFile('./Files/servers.json', JSON.stringify({ servers: servers }, null, 2));
    client.channels.cache.get(newServer.mainChannel).send((`Logged in as: ${client.user.toString()}!\n!help pour voir les commandes.`));
});

client.on('guildDelete', async guild => {
    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    let servers = JSON.parse(await readFile('./Files/servers.json')).servers;
    let server = servers.find(s => s.id == guild.id);
    const index = servers.indexOf(server);
    servers.splice(index, 1);
    await writeFile('./Files/servers.json', JSON.stringify({ servers: servers }, null, 2));
});

client.on('guildUpdate', async (oldGuild, newGuild) => {
    console.log(`Guild ${oldGuild.name} (id: ${oldGuild.id}) updated ➜  ${newGuild.name}`);
    let servers = JSON.parse(await readFile('./Files/servers.json')).servers;
    let server = servers.find(s => s.id == oldGuild.id);
    const index = servers.indexOf(server);
    servers[index].name = newGuild.name;
    await writeFile('./Files/servers.json', JSON.stringify({ servers: servers }, null, 2));
});



client.on('messageCreate', async message => {
    let formatedMessage = message.content.toLowerCase().replace(/\_|\-|\.|\+|\*|\?|\^|\!|\[|\]|\(|\)|\{|\}|\<|\>|\||\/|\%|\=|\:|\;|\,|\'|\"|\#|\~|\`|\¤| /g, "");
    if (formatedMessage.endsWith("quoi") || formatedMessage.endsWith("quois") || formatedMessage.endsWith("koi") || formatedMessage.endsWith("kwa")) {
        const random = Math.floor(Math.random() * 50);
        console.log(random);
        if (random == 25) {
            message.reply({
                files: ['Files/FEUR_intro_3D.mp4']
            });
        } else {
            message.reply("feur");
        }
    } else if (formatedMessage.endsWith("porque")) {
        message.reply("quette");
    }

    if (message.author.bot) return;

    let servers = JSON.parse(await readFile('./Files/servers.json')).servers;
    const server = servers.find(s => s.id == message.guild.id);
    const index = servers.indexOf(server);
    let updated = false;

    if (message.content.startsWith(`${servers[index].prefix}`)) {
        var command = message.content.replace(`${servers[index].prefix}`, '');
        var commandArray = command.split(' ');
        commandArray.find(part => part == "" ? commandArray.splice(commandArray.indexOf(part), 1) : null);
        var commandName = commandArray[0];
        var commandArgs = commandArray.slice(1);
        if (commandName == "prefix") {
            if (commandArgs.length == 0) {
                message.reply(`Le prefixe est ➜ \`${servers[index].prefix}\``);
            } else {
                servers[index].prefix = String(commandArgs.join(''));
                updated = true;
                writeFile('./Files/servers.json', JSON.stringify({ servers: servers }, null, 2));
                message.reply(`**New prefix !** (╯°□°）╯︵ ┻━┻\n➜ \`${servers[index].prefix}\``);
            }
        }
        else if (commandName == "test") {
            message.reply(`Ca marche?`);
            message.guild.channels.cache.get(servers[index].mainChannel).send(`${message.author.toString()} <#${servers[index].mainChannel}> est le salon principal du serveur ${servers[index].name}`);

        }

        else if (commandName == "help") {
            if (commandArgs.length == 0) {
                message.reply(`
            **Commandes disponibles :**
            ➜ \`${servers[index].prefix}prefix\` : Change le prefixe du bot 
            ➜ \`${servers[index].prefix}help\` : Affiche les commandes disponibles
                    ➜ \`${servers[index].prefix}help [command]\` : Affiche les détails de la command sélectionnée
            ➜ \`${servers[index].prefix}test\` : Teste si le bot marche
            ➜ \`${servers[index].prefix}here\` : Defini ce salon comme salon principal du bot
            ➜ \`${servers[index].prefix}target\` : Defini l'utilisateur cible du bot (\`all\`, \`@user\`)
            ➜ \`${servers[index].prefix}online\` : Defini si le bot est en ligne ou non (\`true\`, \`false\`)
            `);
            } else {
                switch (commandArgs[0]) {
                    case "prefix":
                        message.reply(`Change le prefix pour acceder aux commandes du bot\nPar exemple : \`${servers[index].prefix}prefix [\`    remplace le prefix \`${servers[index].prefix}\` par \`[\``);
                        break;
                    case "help":
                        message.reply(`Affiche les commandes disponibles\nPlus de détails pour chaque commande avec \`${servers[index].prefix}help [commande]\``);
                        break;
                    case "test":
                        message.reply(`Teste si le bot marche\nPar exemple : \`${servers[index].prefix}test\``);
                        break;
                    case "here":
                        message.reply(`Defini ce salon comme salon principal du bot\nPar exemple : \`${servers[index].prefix}here\`\nLes commandes sont cependant toujours disponibles dans les autres salons`);
                        break;
                    case "target":
                        message.reply(`\`${servers[index].prefix}target add @user\` ajoute un utilisateur à la liste des cibles\n\`${servers[index].prefix}target remove @user\` retire un utilisateur de la liste des cibles\n\`all\` à la place de \`@user\` ajoute ou retire **toutes** les cibles disponibles\n\`${servers[index].prefix}target list\` affiche la liste des cibles\n`);
                        break;
                    case "puke":
                        message.reply(`:star_of_david: ***Commande mysterieuse*** :star_of_david:\n     ➜ :breast_feeding::skin-tone-1: ***Rentrez le bon type d'argument pour une fonctionnalité secrète*** :breast_feeding::skin-tone-1: `);
                        break;
                    case "online":
                        message.reply(`Défini si le bot envoie un message quand il est en ligne : \`${servers[index].prefix}online [true/false]\``);
                        break;
                    default:
                        message.reply(`Commande inconnue \`bouffon\``);
                        break;
                }
            }
        }

        else if (commandName == "puke") {
            let users = JSON.parse(await readFile('./Files/users.json')).users;
            let user = users.find(u => u.id == message.author.id);
            if (user == undefined) {
                let newUser = {
                    id: message.author.id,
                    name: message.author.username,
                    arrival: 0,
                    departure: 0,
                    puke: 0
                }
                users.push(newUser);
                await writeFile('./Files/users.json', JSON.stringify({ users: users }, null, 2));
                user = users.find(u => u.id == message.author.id);
            }
            const indexUser = users.indexOf(user);

            if (commandArgs.length == 0) {
                message.delete().then(() => { message.channel.send(`https://tenor.com/view/vomissements-rolltide-gif-14908741`) });
                users[indexUser].puke += 1;
                writeFile('./Files/users.json', JSON.stringify({ users: users }, null, 2));

            } else if (commandArgs[0].startsWith('<@') && commandArgs[0].endsWith('>')) {
                const userTarget = message.mentions.users.first();
                let userPuke = users.find(u => u.id == userTarget.id);
                if (userPuke == undefined) {
                    users.push({
                        id: userTarget.id,
                        name: userTarget.username,
                        arrival: 0,
                        departure: 0,
                        puke: 0
                    });
                    writeFile('./Files/users.json', JSON.stringify({ users: users }, null, 2));
                    userPuke = users.find(u => u.id == userTarget.id);
                }
                const indexUserTarget = users.indexOf(userPuke);
                message.reply(`<@${users[indexUserTarget].id}> a gerbé \`${users[indexUserTarget].puke}\` fois`);
            }
        }

        else if (commandName == "here") {
            servers[index].mainChannel = message.channel.id;
            updated = true;
            writeFile('./Files/servers.json', JSON.stringify({ servers: servers }, null, 2));
            message.reply(`**New main channel !** (╯°□°）╯︵ ┻━┻\n➜ <#${servers[index].mainChannel}>`);
        }

        else if (commandName == "target") {
            if (commandArgs.length == 0) {
                message.reply(`Vous devez spécifier une action et un utilisateur ! Ex: \`${servers[index].prefix}target add \`${client.user.toString()}`);
            } else if (commandArgs[0] != "add" && commandArgs[0] != "remove" && commandArgs[0] != "all" && commandArgs[0] != "list") {
                message.reply(`Vous devez spécifier une action valide ! Ex: \`${servers[index].prefix}target add \`${client.user.toString()}`);
            } else if ((commandArgs[0] == "add" || commandArgs[0] == "remove") && (commandArgs[1] == undefined || (commandArgs[1] != "all" && !commandArgs[1].startsWith('<@') && !commandArgs[1].endsWith('>')))) {
                if ((commandArgs[1] == undefined || !commandArgs[1].startsWith('<@') || !commandArgs[1].endsWith('>'))) {
                    if (commandArgs[1] != "all") {
                        message.reply(`Vous devez spécifier un utilisateur ! Ex: \`${servers[index].prefix}target add \`${client.user.toString()}`);
                    }
                }
            }
            else {
                if (commandArgs[0] == "add") {
                    if (commandArgs[1].startsWith("<@") && commandArgs[1].endsWith(">")) {
                        var userId = commandArgs[1].replace("<@", "").replace(">", "");
                        if (servers[index].target[0] == "all") {
                            servers[index].target.splice(0, 1);

                        }
                        if (servers[index].target.find(id => id == userId)) {
                            message.reply(`Target is already in the list !`);
                        } else {
                            servers[index].target.push(userId);
                            updated = true;
                        }
                    } else if (commandArgs[1] == "all") {
                        servers[index].target = ["all"];
                        updated = true;
                    }
                    if (updated) {
                        writeFile('./Files/servers.json', JSON.stringify({ servers: servers }, null, 2));
                        message.reply(`**New target !** (╯°□°）╯︵ ┻━┻\n➜ ${commandArgs[1] == "all" ? "\`all\`" : `<@${userId}>`}`);
                    }

                } else if (commandArgs[0] == "remove") {
                    if (commandArgs[1].startsWith("<@") && commandArgs[1].endsWith(">")) {
                        const userId = commandArgs[1].replace("<@", "").replace(">", "");
                        if (servers[index].target[0] == "all") {
                            servers[index].target.splice(0, 1);
                            updated = true;
                        }
                        if (!servers[index].target.find(id => id == userId)) {
                            message.reply(`This user is not in the list !`);
                        } else {
                            servers[index].target.splice(servers[index].target.indexOf(userId), 1);
                            updated = true;
                        }
                    } else if (commandArgs[1] == "all") {
                        servers[index].target = [];
                        updated = true;
                    }
                    if (updated) {
                        writeFile('./Files/servers.json', JSON.stringify({ servers: servers }, null, 2));
                        message.reply(`**Target deleted** ┬─┬ ノ( ゜-゜ノ)\n➜ ${servers[index].target.length == 0 ? "\`no more target\`" : `${commandArgs[1]}`}`);
                    }
                } else if (commandArgs[0] == "all") {
                    servers[index].target = ["all"];
                    updated = true;
                    writeFile('./Files/servers.json', JSON.stringify({ servers: servers }, null, 2));
                    message.reply(`**New target !** (╯°□°）╯︵ ┻━┻\n➜ \`all\``);

                } else if (commandArgs[0] == "list") {
                    var list = [];
                    if (servers[index].target[0] != "all") {
                        for (user of servers[index].target) {
                            list.push(`<@${user}>`);
                        }
                    }
                    message.reply(`**Target list :** ${list.length == 0 ? servers[index].target[0] == "all" ? "➜\n\`all users\`" : "➜\n\`no target\`" : "\n ➜ " + list.join("\n ➜ ")}`);

                }
            }
        } else if (commandName == "online") {
            if (commandArgs.length == 0) {
                message.reply(`Vous devez spécifier un état ! Ex: \n\`${servers[index].prefix}online true\`\n\`${servers[index].prefix}online false\``);
            } else if (commandArgs[0] != "true" && commandArgs[0] != "false") {
                message.reply(`Vous devez spécifier un état valide ! Ex: \n\`${servers[index].prefix}online true\`\n\`${servers[index].prefix}online false\``);
            } else {
                if (commandArgs[0] == "true") {
                    servers[index].online = true;
                    updated = true;
                    message.reply(`**Online message will be sent** (╯°□°）╯︵ ┻━┻`)

                } else if (commandArgs[0] == "false") {
                    servers[index].online = false;
                    updated = true;
                    message.reply(`**Online message wont be sent** ┬─┬ ノ( ゜-゜ノ)`)
                }
                if (updated) {
                    writeFile('./Files/servers.json', JSON.stringify({ servers: servers }, null, 2));
                }
            }
        }
    }
});


client.on('voiceStateUpdate', async (oldMember, newMember) => {
    try {
        let servers = JSON.parse(await readFile('./Files/servers.json')).servers;
        let server = servers.find(s => s.id == oldMember.guild.id);
        const index = servers.indexOf(server);

        if (oldMember.channel && !newMember.channel) {
            var member = oldMember,
                action = "out";
        } else if (!oldMember.channel && newMember.channel) {
            var member = newMember,
                action = "in";
        }

        if (member) {
            if (servers[index].users.indexOf(member.member.user.id) == -1) {
                servers[index].users.push(member.member.user.id);
                await writeFile('./Files/servers.json', JSON.stringify({ servers: servers }, null, 2));
            }

            if (servers[index].target == "all" || servers[index].target.find(u => u == member.member.user.id)) {
                await voiceState(member, action, servers[index]);
            } else { throw "Not the target" }
        }

    } catch (err) {
        console.log(err);
    }
});

client.on('inviteCreate', async (invite) => {
    try {
        let servers = JSON.parse(await readFile('./Files/servers.json')).servers;
        let server = servers.find(s => s.id == invite.guild.id);
        const index = servers.indexOf(server);

        if (invite.inviter.id) {
            let msg = await client.channels.cache.get(servers[index].mainChannel).send(`${invite.inviter.toString()} vient de créer une invitation pour le serveur **${invite.guild.name}**
            \rEn voici le lien : ${invite.url}
            \n**POURQUOI?**`);
            await invite.guild.members.fetch("238693220400234496").then(member => {
                member.send(`${invite.inviter.toString()} vient de créer une invitation pour le serveur **${invite.guild.name}**
                 \n${msg.url}`);
            });
        }
    } catch (err) {

        console.log(err);
    }
})

client.login("OTc5NjQ1MDY1NTk5MjU4NjI2.G8eTy_.ioOQ57y02ubmL1bEVyUJHCLeyau_AfheJHCsIc"); 