const importing = require('../#importing.js');

module.exports = async function (invite) {

    try {
        let servers = JSON.parse(await readFile('./Files/servers.json')).servers;
        let server = servers.find(s => s.id == invite.guild.id);
        const indexS = servers.indexOf(server);

        if (invite.inviter.id) {
            let msg = await client.channels.cache.get(servers[indexS].mainChannel).send(`${invite.inviter.toString()} vient de créer une invitation pour le serveur **${invite.guild.name}**
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

}