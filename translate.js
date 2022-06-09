module.exports = function (world, type) {
    const moisFr = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

    const jourFr = ['lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi', 'dimanche'];

    if (type === "mois") {
        return moisFr[world];
    } else if (type === "jour") {
        return jourFr[world];
    }
}