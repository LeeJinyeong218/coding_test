const input = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');

const n = +input[0].trim();
const edges = input.slice(1).map(i => i.trim().split(" ").map(Number));
const graph = Array.from({ length: n + 1 }, () => []);

edges.forEach(([n1, n2]) => {
    graph[n1].push(n2);
    graph[n2].push(n1);
})
const parents = Array(n + 1).fill(0); 
const visited = Array(n + 1).fill(false);

let q = [1];
visited[1] = true; 

// bfs
while (q.length) {
  const node = q.shift();
  
  for (const next of graph[node]) {
    if (!visited[next]) {
      visited[next] = true;
      parents[next] = node;
      q.push(next);
    }
  }
}

console.log(parents.slice(2).join('\n'));
