/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function(nums) {
    const l = nums.length;
    var answer = 0;
    var flip = function(idx) {
        nums[idx] = 1 - nums[idx];
        nums[idx + 1] = 1 - nums[idx + 1];
        nums[idx + 2] = 1 - nums[idx + 2];
    }

    for (let i = 0; i < l - 2; i++) {
        if (nums[i] === 0) {
            flip(i);
            answer++;
        }
    }

    return nums[l - 1] === 0 || nums[l - 2] === 0 ? -1 : answer;
};