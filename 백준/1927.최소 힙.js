class MinHeap {
    constructor() {
        this.heap = [];
    }

    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]];
    }

    push(val) {
        this.heap.push(val);

        let i = this.heap.length - 1;
        let p = Math.floor((i - 1) / 2);

        while (i > 0 && this.heap[p] && this.heap[p] > this.heap[i]) {
            this.swap(p, i);
            i = p;
            p = Math.floor((i - 1) / 2);
        }
    }

    pop() {
        if (this.heap.length === 0) return 0;
        if (this.heap.length < 2) return this.heap.pop();

        let ret = this.heap[0];
        this.heap[0] = this.heap.pop();

        let i = 0;
        const length = this.heap.length;

        while (true) {
            const l = i * 2 + 1;
            const r = i * 2 + 2;
            let smallest = i;

            if (l < length && this.heap[l] < this.heap[smallest]) {
                smallest = l;
            }
            if (r < length && this.heap[r] < this.heap[smallest]) {
                smallest = r;
            }
            if (smallest === i) break;

            this.swap(i, smallest);
            i = smallest;
        }

        return ret;
    }
}

const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const inps = input.slice(1).map(v => +v.trim());

let h = new MinHeap();
let answer = [];
inps.forEach(inp => {
    if (inp > 0) {
        h.push(inp);
    } else {
        answer.push(h.pop()); 
    }
})

console.log(answer.join("\n"));