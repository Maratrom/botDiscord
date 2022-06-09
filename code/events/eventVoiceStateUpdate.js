const importing = require('../#importing.js');

module.exports = async function (oldMember, newMember) {

    try {
        let servers = JSON.parse(await readFile('./Files/servers.json')).servers;
        let server = servers.find(s => s.id == oldMember.guild.id);
        const indexS = servers.indexOf(server);

        let users = JSON.parse(await readFile('./Files/users.json')).users;

        if (oldMember.channel && !newMember.channel) {
            var member = oldMember,
                action = "out";
        } else if (!oldMember.channel && newMember.channel) {
            var member = newMember,
                action = "in";
        }

        if (member) {
            if (server.users.find(u => u.id == member.member.user.id) == undefined) {
                servers[indexS].users.push({
                    id: member.member.user.id,
                    vocTime: 0
                });

            } else {
                if (action == "out") {
                    servers[indexS].users.find(u => u.id == member.member.user.id).vocTime += new Date().valueOf() - users.find(us => us.id == member.member.user.id).arrival;
                }
            }
            writeFile('./Files/servers.json', JSON.stringify({ servers: servers }, null, 2));

            await voiceState(member, action, servers[indexS]);
        }

    } catch (err) {
        console.log(err);
    }

}