module.exports = function (time, action) {
    if (time.Day > 19000) {
        return `a rejoint pour la première fois un salon vocal`;
    } else if (action == "in") {
        var state = " est revenu après ";
    } else if (action == "out") {
        var state = " est resté ";
    } else if (action == "vocTime") {
        var state = " a passé ";
    }

    if (time.Day > 0) {
        var day = `\`${time.Day}\` **jour${time.Day > 1 ? "s" : ""}** `;
        if (time.Hour > 0) {
            var hour = `\`${time.Hour}\` **heure${time.Hour > 1 ? "s" : ""}** `;
            if (time.Minute > 0) {
                var minute = `\`${time.Minute}\` **minute${time.Minute > 1 ? "s" : ""}** `;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **seconde${time.Second > 1 ? "s" : ""}** `;
                } else {
                    var second = ``;
                }
            } else {
                var minute = ``;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **seconde${time.Second > 1 ? "s" : ""}** `;
                } else {
                    var second = ``;
                }
            }
        } else {
            var hour = ``;
            if (time.Minute > 0) {
                var minute = `\`${time.Minute}\` **minute${time.Minute > 1 ? "s" : ""}** `;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **seconde${time.Second > 1 ? "s" : ""}** `;
                } else {
                    var second = ``;
                }
            } else {
                var minute = ``;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **seconde${time.Second > 1 ? "s" : ""}** `;
                } else {
                    var second = ``;
                }
            }
        }
    } else {
        var day = ``;
        if (time.Hour > 0) {
            var hour = `\`${time.Hour}\` **heure${time.Hour > 1 ? "s" : ""}** `;
            if (time.Minute > 0) {
                var minute = `\`${time.Minute}\` **minute${time.Minute > 1 ? "s" : ""}** `;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **seconde${time.Second > 1 ? "s" : ""}** `;
                } else {
                    var second = ``;
                }
            } else {
                var minute = ``;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **seconde${time.Second > 1 ? "s" : ""}** `;
                } else {
                    var second = ``;
                }
            }
        } else {
            var hour = ``;
            if (time.Minute > 0) {
                var minute = `\`${time.Minute}\` **minute${time.Minute > 1 ? "s" : ""}** `;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **seconde${time.Second > 1 ? "s" : ""}** `;
                } else {
                    var second = ``;
                }
            } else {
                var minute = ``;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **seconde${time.Second > 1 ? "s" : ""}** `;
                } else {
                    var second = ``;
                }
            }
        }
    }
    return `${state}${day}${hour}${minute}${second}dans un salon vocal`;

}