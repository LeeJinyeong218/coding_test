const input = require('fs').readFileSync('/dev/stdin').toString().split("\n");

const [N, M] = input[0].trim().split(" ").map(Number);
const edges = input.slice(1).filter(v => v.trim()).map(v => v.trim().split(" ").map(Number));

edges.sort((a, b) => a[2] - b[2]);

let parents = Array.from({ length: N + 1 }, (_, i) => i);

const find = (node) => {
  if (parents[node] !== node) {
    parents[node] = find(parents[node]);
  }
  return parents[node];
};

const union = (a, b) => {
  const rootA = find(a);
  const rootB = find(b);

  if (rootA !== rootB) {
    parents[rootB] = rootA;
  }
};

let totalCost = 0; 
let maxEdgeCost = 0;

for (let [u, v, c] of edges) {
  if (find(u) !== find(v)) {
    union(u, v);
    totalCost += c;
    maxEdgeCost = c;
  }
}

console.log(totalCost - maxEdgeCost);
