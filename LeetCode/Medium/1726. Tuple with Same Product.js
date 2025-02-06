/**
 * @param {number[]} nums
 * @return {number}
 */
var tupleSameProduct = function(nums) {
    let dots = {};
    let moreThan1 = new Set();

    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            const dot = nums[i] * nums[j];

            if (dots[dot] === undefined) dots[dot] = 1;
            else {
                dots[dot]++;
                moreThan1.add(dot);
            }
        }
    }

    let result = 0;

    for (let dot of moreThan1) {
        const n = dots[dot];
        result += n * (n - 1) / 2 * 8
    }

    return result
};