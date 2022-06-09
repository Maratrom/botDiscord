const importing = require('../../#importing.js');

module.exports = async function (message) {

    let formatedMessage = message.content.toLowerCase().replace(/\_|\-|\.|\+|\*|\?|\^|\!|\[|\]|\(|\)|\{|\}|\<|\>|\||\/|\%|\=|\:|\;|\,|\'|\"|\#|\~|\`|\¤| /g, "");
    if (formatedMessage.endsWith("quoi") || formatedMessage.endsWith("quois") || formatedMessage.endsWith("koi") || formatedMessage.endsWith("kwa")) {
        const random = Math.floor(Math.random() * 50);
        console.log(random);
        if (random == 25) {
            message.reply({
                files: ['Files/FEUR_intro_3D.mp4']
            });
        } else {
            message.reply("feur");
        }
    } else if (formatedMessage.endsWith("porque")) {
        message.reply("quette");
        
    } else if (formatedMessage.endsWith("why")) {
        message.reply("fu                                                                                                                                              UwU");
    }

}