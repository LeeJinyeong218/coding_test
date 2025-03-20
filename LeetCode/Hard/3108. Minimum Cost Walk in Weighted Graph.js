// solution 참고
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[][]} query
 * @return {number[]}
 */
var parent;
var merge = v => {
    if (parent[v] !== v) parent[v] = merge(parent[v]);
    return parent[v];
}
var minimumCost = function(n, edges, query) {
    var MAX = 131071;
    parent = [];
    var costs = [];
    for (let i = 0; i < n; i++) {
        parent[i] = i;
        costs[i] = MAX;
    }

    for (const [u, v, w] of edges) {
        const p1 = merge(u);
        const p2 = merge(v);

        parent[p1] = p2;
        costs[p1] = costs[p2] = costs[p1] & costs[p2] & w;
    }

    for (let i = 0; i < n; i++) {
        parent[i] = merge(i);
    }

    var result = [];
    for (const [s, t] of query) {
        if (s === t) result.push(0);
        else if (parent[s] === parent[t]) {
            result.push(costs[parent[s]])
        }
        else result.push(-1);
    }

    return result;
};