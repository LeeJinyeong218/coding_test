/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumTripletValue = function(nums) {
    var l = nums.length;
    var max = 0;
    for (let i = 0; i < l - 2; i++) {
        for (let j = i + 1; j < l - 1; j++) {
            for (let k = j + 1; k < l; k++) {
                max = Math.max(max, (nums[i] - nums[j]) * nums[k]);
            }
        }
    }
    return max;
};