const importing = require('../#importing.js');

module.exports = async function () {

    let servers = JSON.parse(await readFile('./Files/servers.json')).servers;
    for (server of servers) {
        if (server.online) {
            client.channels.cache.get(server.mainChannel).send((`Logged in as: ${client.user.toString()}!`));
        }
    }
    console.log(`Logged in as: ${client.user.tag} in ${servers.length} server${servers.length > 1 ? "s" : ""}!`);
    
}