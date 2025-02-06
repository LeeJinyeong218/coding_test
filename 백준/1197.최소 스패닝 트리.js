const reader = require('readline').Interface({
    input: require('fs').createReadStream('dev/stdin'),
    output: undefined
})

let V, E;
let dist;
let edges;

reader.on('line', line => {
    if (V === undefined && E === undefined) {
        [V, E] = line.trim().split(" ").map(Number);
        dist = Array.from(Array(N + 1), () => Array(N + 1).fill(Infinity));
        edges = Array.from(Array(N + 1), () => []);
    } else {
        const [s, e, w] = line.trim().split(" ").map(Number);

        if (dist)
        edges[s].push([e, w]);
        edges[e].push([s, w]);
    }
})

reader.on('close', () => {


})