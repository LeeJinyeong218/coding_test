const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const [N, _, V] = input[0].trim().split(" ").map(Number);
const edges = input.slice(1).map(v => v.trim().split(" ").map(Number));

let graph = new Map();

edges.forEach(edge => {
    if (!graph.has(edge[0])) graph.set(edge[0], [edge[1]]);
    else graph.get(edge[0]).push(edge[1]);

    if (!graph.has(edge[1])) graph.set(edge[1], [edge[0]]);
    else graph.get(edge[1]).push(edge[0]);
})

// 각 노드의 인접 리스트를 오름차순으로 정렬
for (let [node, neighbors] of graph) {
    neighbors.sort((a, b) => a - b);
}

const bfs = (start) => {
    let ret = [];
    let visited = Array(N + 1).fill(false);

    let q = [start];
    visited[start] = true;

    while (q.length > 0) {
        const cur = q.shift();
        ret.push(cur);

        for (let next of graph.get(cur) || []) {
            if (!visited[next]) {
                visited[next] = true;
                q.push(next);
            }
        }
    }

    return ret;
}

const dfs = (start) => {
    let ret = [];
    let visited = Array(N + 1).fill(false);

    let st = [start];
    visited[start] = true;
    ret.push(start);

    while (st.length > 0) {
        const cur = st.pop();

        
        for (let next of graph.get(cur) || []) {
            if (!visited[next]) {
                st.push(cur);
                st.push(next);
                ret.push(next);
                visited[next] = true;
                break;
            }
        }
    }

    return ret;
}

console.log(dfs(V).join(" ") + "\n" + bfs(V).join(" "));
