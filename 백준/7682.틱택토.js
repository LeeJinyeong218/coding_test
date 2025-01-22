const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const games = input.slice(0, input.length - 1).map(v => v.split(""));

const isValid = (game) => {
    let xCount = 0, oCount = 0;
    let winX = false, winO = false;

    game.forEach(v => {
        if (v === "X") xCount++;
        if (v === "O") oCount++;
    })

    if (xCount < oCount || xCount - oCount > 1) return "invalid";

    for (let i = 0; i < 3; i++) {
        if (game[i * 3] === game[i * 3 + 1] && game[i * 3] === game[i * 3 + 2]) {
            if (game[i * 3] === "X") winX = true;
            if (game[i * 3] === "O") winO = true;
        }
        if (game[i] === game[i + 3] && game[i] === game[i + 6]) {
            if (game[i] === "X") winX = true;
            if (game[i] === "O") winO = true;
        }
    }

    if (game[0] === game[4] && game[4] === game[8]) {
        if (game[0] === "X") winX = true;
        if (game[0] === "O") winO = true;
    }
    if (game[2] === game[4] && game[4] === game[6]) {
        if (game[2] === "X") winX = true;
        if (game[2] === "O") winO = true;
    }

    if (
        winX && winO ||
        winX && xCount !== oCount + 1 ||
        winO && xCount !== oCount ||
        !winX && !winO && game.includes(".")
    ) return "invalid";

    return "valid";
};

const answer = games.map(isValid);
console.log(answer.join("\n"));
