class MinHeap {
    constructor() {
        this.heap = [];
    }

    swap(i1, i2) {
        [this.heap[i1], this.heap[i2]] = [this.heap[i2], this.heap[i1]];
    }

    push(val) {
        this.heap.push(val);

        let i = this.heap.length - 1;
        let p = Math.floor((i - 1) / 2);

        while (this.heap[p] && this.heap[p] > this.heap[i]) {
            this.swap(i, p);
            i = p;
            p = Math.floor((i - 1) / 2);
        }
    }

    pop() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        let result = this.heap[0];

        this.heap[0] = this.heap.pop();

        let i = 0;
        let l = 2 * i + 1;
        let r = 2 * i + 2;

        while (this.heap[l] && this.heap[l] < this.heap[i] || this.heap[r] && this.heap[r] < this.heap[i]) {
            const min = this.heap[r] && this.heap[r] < this.heap[l] ? r : l;

            this.swap(min, i);
            i = min;
            l = 2 * i + 1;
            r = 2 * i + 2;
        }

        return result;
    }

    peek() {
        if (this.heap.length === 0) return -1;
        return this.heap[0];
    }
}


var NumberContainers = function() {
    this.indexToNum = new Map();
    this.numToIndex = new Map();
};

/** 
 * @param {number} index 
 * @param {number} number
 * @return {void}
 */
NumberContainers.prototype.change = function(index, number) {
    if (!this.numToIndex.has(number)) this.numToIndex.set(number, new MinHeap());
    this.numToIndex.get(number).push(index);
    this.indexToNum.set(index, number);
};

/** 
 * @param {number} number
 * @return {number}
 */
NumberContainers.prototype.find = function(number) {
    if (!this.numToIndex.has(number)) return -1;

    let result = this.numToIndex.get(number).peek();
    while (this.indexToNum.get(result) !== number) {
        this.numToIndex.get(number).pop();
        result = this.numToIndex.get(number).peek();
        if (result === -1) return result;
    }
    return result;
};

/** 
 * Your NumberContainers object will be instantiated and called as such:
 * var obj = new NumberContainers()
 * obj.change(index,number)
 * var param_2 = obj.find(number)
 */