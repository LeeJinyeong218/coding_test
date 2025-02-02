/**
 * @param {number[]} nums
 * @return {boolean}
 */
var check = function(nums) {
    const sortedNums = [...nums].sort((a, b) => a - b);

    const starts = nums.reduce((p, n, i) => n === sortedNums[0] ? [...p, i] : p, []);

    let flag = true;
    for (let start of starts) {
        flag = true;
        for (let i = 0; i < nums.length; i++) {
            if (sortedNums[i] !== nums[(i + start) % nums.length]) {
                flag = false;
                break;
            }
        }
        if (flag) return true;
    }
    
    return false;
};