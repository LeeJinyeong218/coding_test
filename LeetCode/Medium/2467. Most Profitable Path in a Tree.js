/**
 * @param {number[][]} edges
 * @param {number} bob
 * @param {number[]} amount
 * @return {number}
 */
var mostProfitablePath = function(edges, bob, amount) {
    const n = edges.length + 1;
    let edgeList = Array.from(Array(n), () => []);

    edges.forEach(([a, b], idx) => {
        edgeList[a].push(b);
        edgeList[b].push(a);
    })

    // get bob path
    let bob_path = [bob];
    let bob_visited = new Set();
    bob_visited.add(bob);
    function getBobPath(node) {
        if (node === 0) return true;

        for (const next of edgeList[node] || []) {
            if (!bob_visited.has(next)) {
                bob_path.push(next);
                bob_visited.add(next);
                if (getBobPath(next)) return true;
                bob_visited.delete(next);
                bob_path.pop();
            }
        }

        return false;
    }
    getBobPath(bob);

    // calc max profit
    let alice_visited = new Set();
    alice_visited.add(0);
    let opened = new Set();
    opened.add(0);
    opened.add(bob);
    let max = -Infinity;

    function getMax(alice, time, score) {
        if (edgeList[alice].filter(v => !alice_visited.has(v)).length === 0) {
            max = Math.max(max, score);
            return;
        }

        opened.add(bob_path[time]);

        for (let next of edgeList[alice]) {
            if (!alice_visited.has(next)) {
                let cost = amount[next];
                
                alice_visited.add(next);
                if (next === bob_path[time + 1]) {
                    cost = amount[next] / 2;
                }

                getMax(next, time + 1, opened.has(next) ? score : score + cost);
                alice_visited.delete(next);
                
            }
        }

        opened.delete(bob_path[time]);
    }

    getMax(0, 0, amount[0]);

    return max;
};