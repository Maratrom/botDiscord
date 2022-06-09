const importing = require('../#importing.js');

module.exports = async function (oldGuild, newGuild) {

    console.log(`Guild ${oldGuild.name} (id: ${oldGuild.id}) updated ➜  ${newGuild.name}`);
    let servers = JSON.parse(await readFile('./Files/servers.json')).servers;
    let server = servers.find(s => s.id == oldGuild.id);
    const indexS = servers.indexOf(server);
    servers[indexS].name = newGuild.name;
    await writeFile('./Files/servers.json', JSON.stringify({ servers: servers }, null, 2));

}