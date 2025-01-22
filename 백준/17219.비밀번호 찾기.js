const fs = require('fs');
const readline = require('readline');

let reader = readline.Interface({
    input: fs.createReadStream('dev/stdin'),
    output: undefined
})

let N = null, M = null;
let answer = [];
let map = new Map();
reader.on('line', line => {
    if (N) {
        const [address, password] = line.split(" ");
        map.set(address, password);
        N--;
    } else if (M) {
        answer.push(map.get(line));
        M--;

        if (M === 0) reader.close();
    } else {
        [N, M] = line.split(" ").map(Number);
    }
})

reader.on('close', () => {
    console.log(answer.join("\n"));
})