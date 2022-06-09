const importing = require('../#importing.js');

module.exports = async function (guild) {

    console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
    let servers = JSON.parse(await readFile('./Files/servers.json')).servers;
    let server = servers.find(s => s.id == guild.id);
    const indexS = servers.indexOf(server);
    servers.splice(indexS, 1);
    await writeFile('./Files/servers.json', JSON.stringify({ servers: servers }, null, 2));

}