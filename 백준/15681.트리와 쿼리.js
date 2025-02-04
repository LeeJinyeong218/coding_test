const reader = require('readline').Interface({
    input: require('fs').createReadStream('dev/stdin'),
    output: undefined,
})

let N, R, Q;
let edges;
let query = [];

class Node {
    constructor(val) {
        this.val = val;
        this.parent = null;
        this.child = [];
        this.count = -1;
    }
}

reader.on('line', line => {
    if (N === undefined) {
        [N, R, Q] = line.trim().split(" ").map(Number);
        edges = Array.from(Array(N + 1), () => []);
    } else {
        let [start, end] = line.trim().split(" ").map(Number);
        if (end === undefined) query.push(+line.trim());
        else {
            edges[start].push(end);
            edges[end].push(start);
        }
    }
})

reader.on('close', () => {
    // 트리 만들기
    let nodes = Array(N + 1).fill(null);
    for (let i = 1; i <= N; i++) {
        nodes[i] = new Node(i);
    }

    let q = [R];

    while (q.length) {
        const cur = q.shift();
        const node = nodes[cur];

        for (let next of edges[cur]) {
            if (node.parent === null || next !== node.parent) {
                node.child.push(next);
                nodes[next].parent = cur;
                q.push(next);
            }
        }
    }
    console.log(query.map(q => getCount(nodes[q])).join("\n"));

    function getCount(node) {
        if (node.count === -1) {
            if (node.child.length === 0) node.count = 1;
            else node.count = node.child.reduce((p, n) => p + getCount(nodes[n]), 1);
        }
    
        return node.count;
    }
})

