// chatgpt 풀이
/**
 * @param {number[][]} grid
 * @param {number[]} queries
 * @return {number[]}
 */
var maxPoints = function(grid, queries) {
    const m = grid.length, n = grid[0].length;
    const directions = [[-1, 0], [1, 0], [0, 1], [0, -1]];
    
    // Min Heap을 위한 Priority Queue (최소 힙)
    class MinHeap {
        constructor() {
            this.heap = [];
        }
        push(val) {
            this.heap.push(val);
            let i = this.heap.length - 1;
            while (i > 0 && this.heap[i][0] < this.heap[Math.floor((i - 1) / 2)][0]) {
                [this.heap[i], this.heap[Math.floor((i - 1) / 2)]] = [this.heap[Math.floor((i - 1) / 2)], this.heap[i]];
                i = Math.floor((i - 1) / 2);
            }
        }
        pop() {
            if (this.heap.length === 1) return this.heap.pop();
            const min = this.heap[0];
            this.heap[0] = this.heap.pop();
            let i = 0;
            while (2 * i + 1 < this.heap.length) {
                let j = 2 * i + 1;
                if (j + 1 < this.heap.length && this.heap[j][0] > this.heap[j + 1][0]) j++;
                if (this.heap[i][0] <= this.heap[j][0]) break;
                [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
                i = j;
            }
            return min;
        }
        peek() {
            return this.heap.length ? this.heap[0] : null;
        }
        size() {
            return this.heap.length;
        }
    }

    // 방문 여부
    const visited = Array.from({ length: m }, () => Array(n).fill(false));
    visited[0][0] = true;

    // Min Heap (BFS 탐색용)
    const minHeap = new MinHeap();
    minHeap.push([grid[0][0], 0, 0]);

    // 쿼리 정렬 (오름차순)
    const sortedQueries = [...queries].map((v, i) => [v, i]).sort((a, b) => a[0] - b[0]);
    const result = new Array(queries.length);

    let count = 0; // 현재까지 방문한 노드 수
    let maxValue = 0; // 현재 BFS로 탐색한 최대 값

    for (let [query, index] of sortedQueries) {
        while (minHeap.size() && minHeap.peek()[0] < query) {
            let [val, x, y] = minHeap.pop();
            count++;

            for (let [dx, dy] of directions) {
                const nx = x + dx, ny = y + dy;
                if (nx >= 0 && nx < m && ny >= 0 && ny < n && !visited[nx][ny]) {
                    minHeap.push([grid[nx][ny], nx, ny]);
                    visited[nx][ny] = true;
                }
            }
        }
        result[index] = count;
    }

    return result;
};
