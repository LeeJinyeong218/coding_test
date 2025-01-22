const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const N = +input[0];
const edges = input.slice(1).map(line => line.split(" ").map(Number));

const tree = Array.from({ length: N + 1 }, () => []);
edges.forEach(([parent, child, cost]) => {
    tree[parent].push([child, cost]);
    tree[child].push([parent, cost]);
});

const bfs = (start) => {
    const dist = Array(N + 1).fill(Infinity);
    dist[start] = 0;

    const q = [start];
    let farthestNode = start;

    while (q.length) {
        const node = q.shift();

        for (const [next, cost] of tree[node]) {
            if (dist[next] > dist[node] + cost) {
                dist[next] = dist[node] + cost;
                q.push(next);

                if (dist[next] > dist[farthestNode]) {
                    farthestNode = next;
                }
            }
        }
    }

    return [farthestNode, dist[farthestNode]];
};

const [nodeA] = bfs(1);
const [, diameter] = bfs(nodeA);

console.log(diameter);
