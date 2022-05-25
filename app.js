const { writeFile, readFile } = require('fs').promises,
    { existsSync } = require('fs'),
    Discord = require('discord.js'),
    client = new Discord.Client({
        intents: [
            Discord.Intents.FLAGS.GUILDS,
            Discord.Intents.FLAGS.GUILD_MESSAGES,
            // Discord.Intents.FLAGS.GUILD_MEMBERS,
            Discord.Intents.FLAGS.GUILD_VOICE_STATES,
        ]
    }),
    calculTime = require('./calculTime.js'),
    setSentence = require('./setSentence.js');



client.on('ready', () => {
    console.log(`Logged in as: ${client.user.tag}!`);
    client.channels.cache.get('973157908625895447').send(`Logged in as: ${client.user.toString()}!`);
});


client.on('voiceStateUpdate', async (oldMember, newMember) => {
    try {
        if (oldMember.channel == undefined) {
            const newUser = {
                arrival: new Date().valueOf(),
                departure: 0,
                id: newMember.member.user.id,
                name: newMember.member.user.username
            };
            if (existsSync(`./Files/users.json`)) {
                let data = await JSON.parse(await readFile(`./Files/users.json`)).users;
                for (let user of data) {
                    if (user.id == newMember.member.user.id) {
                        user.arrival = new Date().valueOf();
                        var find = true;
                        break;
                    }
                }
                if (!find) {
                    data.push(newUser);
                }
                await writeFile(`./Files/users.json`, JSON.stringify({ users: data }, null, 2));
            } else {
                let data = {
                    users: [newUser]
                };
                await writeFile(`./Files/users.json`, JSON.stringify(data, null, 2));
            }
            let users = await JSON.parse(await readFile(`./Files/users.json`)).users;
            console.log(users);
            let user = users.find(user => user.id == newMember.member.user.id);

            const diff = await calculTime(user.arrival - user.departure);
            client.channels.cache.get('973157908625895447').send(newMember.member.toString() + await setSentence(diff, "in"));

        } else if (newMember.channel == undefined) {
            const newUser = {
                arrival: 0,
                departure: new Date().valueOf(),
                id: oldMember.member.user.id,
                name: oldMember.member.user.username
            };
            if (existsSync(`./Files/users.json`)) {
                var data = await JSON.parse(await readFile(`./Files/users.json`)).users;
                for (let user of data) {
                    if (user.id == newMember.member.user.id) {
                        user.departure = new Date().valueOf();
                        var find = true;
                        break;
                    }
                }
                if (!find) {
                    data.push(newUser);
                }
                await writeFile(`./Files/users.json`, JSON.stringify({ users: data }, null, 2));
            } else {
                data = {
                    users: [newUser]
                };
                await writeFile(`./Files/users.json`, JSON.stringify(data, null, 2));
            }
            let users = await JSON.parse(await readFile(`./Files/users.json`)).users;
            let user = users.find(user => user.id == oldMember.member.user.id);

            const diff = await calculTime(user.departure - user.arrival);
            client.channels.cache.get('973157908625895447').send(oldMember.member.toString() + await setSentence(diff, "out"));
        }

        console.log("----------------------------------------------------");
    } catch (error) {
        console.log(error);
    }
})

client.login("OTczMzM3MzI1NjY2OTY3NjY4.G-cRMX.y8fyW7FnjxEWlNRjMIBo3mxnauPdxiADYuh1-8");