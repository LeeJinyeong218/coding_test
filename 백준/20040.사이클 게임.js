var reader = require('readline').Interface({
    input: require('fs').createReadStream('dev/stdin'),
    output: undefined
})

var N, M;
var parent;
var answer = 0;
var number = 0;
reader.on('line', line => {
    if (!N && !M) {
        [N, M] = line.trim().split(" ").map(Number);
        parent = Array(N).fill(0).map((_, i) => i);
    } else {
        number++;
        let [v1, v2] = line.trim().split(" ").map(Number);

        const result = union(v1, v2);

        if (!result) {
            answer = number;
            reader.close();
        }
    }
})

reader.on('close', () => {
    console.log(answer);
})

function getParent(v) {
    if (parent[v] === v) return v;
    return parent[v] = getParent(parent[v]);
}

function union(v1, v2) {
    let p1 = getParent(v1);
    let p2 = getParent(v2);

    if (p1 === p2) return false;

    if (p1 < p2) {
        parent[p2] = p1;
    } else {
        parent[p1] = p2;
    }

    return true;
}