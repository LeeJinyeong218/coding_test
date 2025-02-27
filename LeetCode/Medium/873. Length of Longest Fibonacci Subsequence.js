/**
 * @param {number[]} arr
 * @return {number}
 */
var lenLongestFibSubseq = function(arr) {
    let index = new Map();
    let n = arr.length;
    let dp = new Map();
    let maxLen = 0;

    for (let i = 0; i < n; i++) {
        index.set(arr[i], i);
    }

    for (let j = 1; j < n; j++) {
        for (let i = 0; i < j; i++) {
            let k = index.get(arr[j] - arr[i]);
            if (k !== undefined && k < i) {
                let len = dp.get(`${k},${i}`) || 2;
                dp.set(`${i},${j}`, len + 1);
                maxLen = Math.max(maxLen, len + 1);
            }
        }
    }

    return maxLen >= 3 ? maxLen : 0;
};
