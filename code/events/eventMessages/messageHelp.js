const { UserFlags } = require('discord.js');
const importing = require('../../#importing.js');

module.exports = async function (message, commandArgs, servers, index) {

    var updatedS = false;

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
    ➜ \`${servers[index].prefix}voctime\` : Affiche le temps passé dans un salon vocal par l'utilisateur mentionné 
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
            case "voctime":
                const member = await message.guild.members.fetch(client.user);
                if (member.joinedAt.valueOf() > process.env.VOCTIME_RELEASE_TIMESTAMP) {
                    var since = `${member.joinedAt.getDate()} ${translate(member.joinedAt.getMonth(), "mois")} ${member.joinedAt.getFullYear()}`
                } else {
                    var since = `${process.env.VOCTIME_RELEASE_DAY} ${translate(process.env.VOCTIME_RELEASE_MONTH - 1, "mois")} ${process.env.VOCTIME_RELEASE_YEAR}`
                }

                message.reply(`Affiche le temps passé dans un salon vocal par l'utilisateur mentionné (depuis le \`${since}\`)\nPar exemple : \`${servers[index].prefix}voctime \`${client.user.toString()}`);
                break;
            default:
                message.reply(`Commande inconnue \`bouffon\``);
                break;
        }
    }
    
    return [updatedS, servers];

}