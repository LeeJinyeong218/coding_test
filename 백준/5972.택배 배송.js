// 검색 풀이
const [[N, M], ...ABC] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(v => v.trim().split(" ").map(Number));

// 최소 거리로 0 -> N - 1

class HeapQ {
    // 코스트 정렬
    constructor() {
        this.heap = [];
    }

    check() {
        return Boolean(this.heap.length)
    }

    swap(i1, i2) {
        [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]]
    }

    push(val) {
        this.heap.push(val);

        let i = this.heap.length - 1;
        let p = Math.floor((i - 1) / 2);

        while (this.heap[p] && this.heap[p][1] > this.heap[i][1]) {
            this.swap(p, i);

            i = p;
            p = Math.floor((i - 1) / 2);
        }
    }

    pop() {
        if (!this.check) return null;
        if (this.heap.length === 1) return this.heap.pop();

        let ret = this.heap[0];
        this.heap[0] = this.heap.pop();

        let i = 0;
        let l = i * 2 + 1;
        let r = i * 2 + 2;

        while (this.heap[l] && this.heap[l][1] < this.heap[i][1] ||
            this.heap[r] && this.heap[r][1] < this.heap[i][1]
        ) {
            let minIdx = this.heap[r] < this.heap[l] ? r : l;

            this.swap(minIdx, i);

            i = minIdx;
            l = i * 2 + 1;
            r = i * 2 + 2;
        }

        return ret;
    }
}

const graph = {};
ABC.forEach(([a, b, c]) => {
    if (!graph[a - 1]) graph[a - 1] = [];
    if (!graph[b - 1]) graph[b - 1] = [];

    graph[a - 1].push([b - 1, c]);
    graph[b - 1].push([a - 1, c]);
})

let dist = Array(N).fill(Infinity);

let heapq = new HeapQ();

heapq.push([0, 0]);

while (heapq.check()) {
    const [cur, count] = heapq.pop();

    if (dist[cur] < count) continue; // 이미 저장된 거리보다 크면 넘어감

    for (let [next, next_count] of graph[cur]) {
        if (count + next_count < dist[next]) { // 이미 저장된 거리보다 작으면 heapq에 추가
            dist[next] = count + next_count;
            heapq.push([next, count + next_count]);
        }
    }
}

console.log(dist[N - 1]);