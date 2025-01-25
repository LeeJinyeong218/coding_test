/**
 * @param {number[][]} graph
 * @return {number[]}
 */
var eventualSafeNodes = function(graph) {
    const n = graph.length;
    const reversedGraph = Array.from({ length: n }, () => []);
    const outdegree = new Array(n).fill(0);
    const queue = [];
    const safeNodes = [];

    // outgoing 세고 reverse 그래프 구현
    for (let i = 0; i < n; i++) {
        for (const neighbor of graph[i]) {
            reversedGraph[neighbor].push(i);
        }
        outdegree[i] = graph[i].length;
    }

    // terminal 구하기
    for (let i = 0; i < n; i++) {
        if (outdegree[i] === 0) {
            queue.push(i);
        }
    }

    // terminal에서 reverse로 이어지는 노드 구하기
    while (queue.length > 0) {
        const node = queue.shift();
        safeNodes.push(node);
        for (const neighbor of reversedGraph[node]) {
            outdegree[neighbor]--;
            if (outdegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }

    return safeNodes.sort((a, b) => a - b);
};