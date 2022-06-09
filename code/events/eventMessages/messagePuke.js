const importing = require('../../#importing.js');

module.exports = async function (message, commandArgs, users, user, indexU) {

    var updatedU = false;

    if (user == undefined) {
        let newUser = {
            id: message.author.id,
            name: message.author.username,
            arrival: 0,
            departure: 0,
            puke: 0
        }
        users.push(newUser);
        updatedU = true;
    }


    if (commandArgs.length == 0) {
        message.delete().then(() => { message.channel.send(`https://tenor.com/view/vomissements-rolltide-gif-14908741`) });
        users[indexU].puke += 1;
        var updatedU = true;

    } else if (message.mentions.users.first()) {
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

            updatedU = true;
            userPuke = users.find(u => u.id == userTarget.id);
        }
        
        const indexUserTarget = users.indexOf(userPuke);
        message.reply(`\`${users[indexUserTarget].name}\` a gerbé \`${users[indexUserTarget].puke}\` fois`);
    }
    
    return [updatedU, users];    

}