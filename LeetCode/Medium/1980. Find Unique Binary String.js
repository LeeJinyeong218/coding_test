/**
 * @param {string[]} nums
 * @return {string}
 */
var findDifferentBinaryString = function(nums) {
    var l = nums[0].length;
    var set = new Set(nums);

    var max = 2 ** l;

    for (let i = 0; i < max; i++) {
        const b = i.toString(2).padStart(l, 0);
        if (!set.has(b)) return b;
    }
};