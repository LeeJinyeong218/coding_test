const [N, ...opers] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(v => +v.trim());

class Heap {
    constructor() {
        this.heap = [];
    }
    
    swap(idx1, idx2) {
        [this.heap[idx1], this.heap[idx2]] = [this.heap[idx2], this.heap[idx1]]
    }

    push(val) {
        this.heap.push(val);

        let i = this.heap.length - 1;
        let p = Math.floor((i - 1) / 2);

        while (
            this.heap[p] &&
            (
                Math.abs(this.heap[p]) > Math.abs(this.heap[i]) ||
                Math.abs(this.heap[p]) === Math.abs(this.heap[i]) &&
                this.heap[p] > this.heap[i]
            )
        ) {
            this.swap(p, i);

            i = p;
            p = Math.floor((i - 1) / 2);
        }
    }

    pop() {
        if (this.heap.length === 0) return 0;
        if (this.heap.length === 1) return this.heap.pop();

        const ret = this.heap[0];
        this.heap[0] = this.heap.pop();

        let i = 0;
        let l = i * 2 + 1;
        let r = i * 2 + 2;

        while (
            this.heap[l] && (
                Math.abs(this.heap[l]) < Math.abs(this.heap[i]) ||
                Math.abs(this.heap[l]) === Math.abs(this.heap[i]) &&
                this.heap[l] < this.heap[i]
            ) || this.heap[r] && (
                Math.abs(this.heap[r]) < Math.abs(this.heap[i]) ||
                Math.abs(this.heap[r]) === Math.abs(this.heap[i]) &&
                this.heap[r] < this.heap[i]
            )
        ) {
            const min = this.heap[r] &&
             (
                Math.abs(this.heap[r]) < Math.abs(this.heap[l]) ||
                Math.abs(this.heap[r]) === Math.abs(this.heap[l]) &&
                this.heap[r] < this.heap[l]
            ) ? r : l;

            this.swap(min, i);

            i = min;
            l = i * 2 + 1;
            r = i * 2 + 2;
        }

        return ret;
    }
}

let h = new Heap();
let answer = [];

for (let i = 0; i < N; i++) {
    const oper = opers[i];

    if (oper) {
        h.push(oper);
    } else {
        answer.push(h.pop())
    }
}

console.log(answer.join("\n"));
