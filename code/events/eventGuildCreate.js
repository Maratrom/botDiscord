const importing = require('../#importing.js');

module.exports = async function (guild) {

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
    
}