module.exports = function (time) {
    const day = Math.floor(time / (24 * 60 * 60 * 1000));
    const hour = Math.floor((time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minute = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const second = Math.floor((time % (60 * 1000)) / 1000);
    console.log(`${time}ms = ${day} days, ${hour} hours, ${minute} minutes, ${second} seconds`);
    return {
        Day: day,
        Hour: hour,
        Minute: minute,
        Second: second
    }
}