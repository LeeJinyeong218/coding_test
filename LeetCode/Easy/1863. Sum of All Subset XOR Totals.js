/**
 * @param {number[]} nums
 * @return {number}
 */
var subsetXORSum = function(nums) {
    var sum = 0;
    
    var getXORs = (nums) => {
        if (nums.length === 1) return nums;
        var prev = getXORs(nums.slice(1));
        return [nums[0], ...prev, ...prev.map(v => v ^ nums[0])];
    }

    return getXORs(nums).reduce((p, n) => p + n);
};