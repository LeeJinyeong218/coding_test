/**
 * @param {number[]} nums
 * @return {number}
 */
var longestMonotonicSubarray = function(nums) {
    let max = 0;
    // find increasing
    let l = 0;
    let r = 0;

    while (l < nums.length) {
        while (nums[r + 1] && nums[r] < nums[r + 1]) {
            r++;
        }
        max = Math.max(max, r - l + 1);
        l = r + 1;
        r = l;
    }

    // decreasing
    l = 0;
    r = 0;

    while (l < nums.length) {
        while (nums[r + 1] && nums[r] > nums[r + 1]) {
            r++;
        }
        max = Math.max(max, r - l + 1);
        l = r + 1;
        r = l;
    }

    return max;
};