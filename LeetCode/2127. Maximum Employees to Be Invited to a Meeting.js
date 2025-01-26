// 솔루션
const initializeGraph = (n) => { let g = []; for (let i = 0; i < n; i++) { g.push([]); } return g; };
const mx = Math.max;

const maximumInvitations = (a) => {
    let n = a.length, res = 0, visit = new Set(), g = initializeGraph(n), deg = Array(n).fill(0), dp = Array(n).fill(1);
    for (let i = 0; i < n; i++) g[a[i]].push(i); // generate graph
    for (let i = 0; i < n; i++) { // case 2: has cycle, result is the length of the cycle
        if (!visit.has(i)) {
            let t = [];
            let j = i;
            while (!visit.has(j)) {
                visit.add(j);
                t.push(j);
                j = a[j];
            }
            for (let k = 0; k < t.length; k++) {
                if (t[k] == j) res = mx(res, t.length - k);
            }
        }
    }
	// case 1: no cycle, result is the sum
    let q = [];
    for (let i = 0; i < n; i++) deg[a[i]]++; // prepare indegree, mock topological Sort process
    for (let i = 0; i < n; i++) { // all nodes with no incoming edges 
        if (deg[i] == 0) q.push(i);
    }
    while (q.length) { // start BFS
        let cur = q.shift();
        dp[a[cur]] = mx(dp[a[cur]], dp[cur] + 1);
		 // -- : remove an edge from cur to child, == 0 : child has no other incoming edges, add to q for next bfs
        if (--deg[a[cur]] == 0) q.push(a[cur]);
    }
    let sum = 0;
    for (let i = 0; i < n; i++) {
        if (a[a[i]] == i && a[i] > i) {
            sum += dp[i] + dp[a[i]];
        }
    }
    return mx(sum, res);
};