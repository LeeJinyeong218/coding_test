const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const [p, m] = input[0].split(" ").map(Number);
let players = input.slice(1).map(i => i.trim().split(" "));

let rooms = [];
let ranges = [];

while (players.length) {
    const [level, player] = players.shift();
    let entered = false;

    for (let i = 0; i < rooms.length; i++) {
        const room = rooms[i];
        const [min, max] = ranges[i];
        if (
            room.length > 0 && room.length < m &&
            +level >= min && +level <= max
        ) {
            entered = true;
            room.push([level, player]);
            break;
        }
    }

    if (!entered) {
        rooms.push([[level, player]]);
        ranges.push([+level - 10, +level + 10]);
    }
}

console.log(rooms.map(room => {
    const players = room.sort((a, b) => {
        if (a[1] < b[1]) {
            return -1;
        } else {
            return 1;
        }
    }).map(i => i.join(" "));
    const state = room.length === m ? "Started!" : "Waiting!"
    return state + "\n" + players.join("\n");
}).join("\n"))

