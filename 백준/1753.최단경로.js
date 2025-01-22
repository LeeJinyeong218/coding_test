class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(node) {
        this.heap.push(node);
        let i = this.heap.length - 1;
        while (i > 0) {
            const parent = Math.floor((i - 1) / 2);
            if (this.heap[parent][1] <= this.heap[i][1]) break;
            [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
            i = parent;
        }
    }

    pop() {
        if (this.heap.length === 1) return this.heap.pop();
        const top = this.heap[0];
        this.heap[0] = this.heap.pop();
        let i = 0;
        while (true) {
            const left = 2 * i + 1;
            const right = 2 * i + 2;
            let smallest = i;

            if (left < this.heap.length && this.heap[left][1] < this.heap[smallest][1]) {
                smallest = left;
            }
            if (right < this.heap.length && this.heap[right][1] < this.heap[smallest][1]) {
                smallest = right;
            }
            if (smallest === i) break;

            [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
            i = smallest;
        }
        return top;
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

const readline = require("readline");
const reader = require('readline').Interface({
    input: require('fs').createReadStream('dev/stdin'),
    output: undefined
})

let V, E, K;
let edges;

reader.on("line", (line) => {
    if (V === undefined && E === undefined) {
        [V, E] = line.split(" ").map(Number);
        edges = Array.from({ length: V + 1 }, () => []);
    } else if (K === undefined) {
        K = parseInt(line);
    } else {
        const [start, end, weight] = line.split(" ").map(Number);
        edges[start].push([end, weight]);
    }
});

reader.on("close", () => {
    const dist = Array(V + 1).fill(Infinity);
    const minHeap = new MinHeap();

    dist[K] = 0;
    minHeap.push([K, 0]);

    while (!minHeap.isEmpty()) {
        const [curNode, curDist] = minHeap.pop();

        if (curDist > dist[curNode]) continue;

        for (const [next, weight] of edges[curNode]) {
            if (dist[next] > curDist + weight) {
                dist[next] = curDist + weight;
                minHeap.push([next, dist[next]]);
            }
        }
    }

    console.log(dist.slice(1).map((d) => (d === Infinity ? "INF" : d)).join("\n"));
});
