const importing = require('./#importing');

module.exports = async function (member, action, server) {
    const newUser = {
        id: member.member.user.id,
        name: member.member.user.username,
        arrival: new Date().valueOf(),
        departure: 0,
        puke: 0
    };
    if (existsSync(`./Files/users.json`)) {
        var data = await JSON.parse(await readFile(`./Files/users.json`)).users;
        var user = data.find(user => user.id == member.member.user.id ? action == 'in' ? user.arrival = new Date().valueOf() : user.departure = new Date().valueOf() : null);
        if (!user) { data.push(newUser) }
        await writeFile(`./Files/users.json`, JSON.stringify({ users: data }, null, 2));

    } else {
        data = {
            users: [newUser]
        };
        await writeFile(`./Files/users.json`, JSON.stringify(data, null, 2));
    }
    const users = await JSON.parse(await readFile(`./Files/users.json`)).users;
    let diff = 0;
    users.find(user => user.id == member.member.user.id ? action == "in" ? diff = calculTime(user.arrival - user.departure) : diff = calculTime(user.departure - user.arrival) : diff = null);

    await client.channels.cache.get(server.mainChannel).send(`\`${member.member.displayName}\`` + await setSentence(diff, action));
}