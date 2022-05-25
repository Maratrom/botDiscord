module.exports = function (time, action) {
    if (time.Day > 19000) {
        return `a rejoint pour la première fois un salon vocal`;
    } else if (action == "in") {
        var state = " est revenu après ";
    } else if (action == "out") {
        var state = " est resté ";
    }

    if (time.Day > 0) {
        var day = `\`${time.Day}\` **jours** `;
        if (time.Hour > 0) {
            var hour = `\`${time.Hour}\` **heures** `;
            if (time.Minute > 0) {
                var minute = `\`${time.Minute}\` **minutes** `;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **secondes** `;
                } else {
                    var second = ``;
                }
            } else {
                var minute = ``;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **secondes** `;
                } else {
                    var second = ``;
                }
            }
        } else {
            var hour = ``;
            if (time.Minute > 0) {
                var minute = `\`${time.Minute}\` **minutes** `;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **secondes** `;
                } else {
                    var second = ``;
                }
            } else {
                var minute = ``;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **secondes** `;
                } else {
                    var second = ``;
                }
            }
        }
    } else {
        var day = ``;
        if (time.Hour > 0) {
            var hour = `\`${time.Hour}\` **heures** `;
            if (time.Minute > 0) {
                var minute = `\`${time.Minute}\` **minutes** `;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **secondes** `;
                } else {
                    var second = ``;
                }
            } else {
                var minute = ``;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **secondes** `;
                } else {
                    var second = ``;
                }
            }
        } else {
            var hour = ``;
            if (time.Minute > 0) {
                var minute = `\`${time.Minute}\` **minutes** `;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **secondes** `;
                } else {
                    var second = ``;
                }
            } else {
                var minute = ``;
                if (time.Second > 0) {
                    var second = `\`${time.Second}\` **secondes** `;
                } else {
                    var second = ``;
                }
            }
        }
    }
    return `${state}${day}${hour}${minute}${second}dans un salon vocal`;

}