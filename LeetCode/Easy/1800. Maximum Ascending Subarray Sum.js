/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAscendingSum = function(nums) {
    let max = nums[0];

    let l = 0;
    let r = l;

    while (l < nums.length) {
        let sum = nums[r];
        while (nums[r] < nums[r + 1]) {
            r++;
            sum += nums[r];
        }

        max = Math.max(max, sum);
        l = r + 1;
        r = l;
    }

    return max;
};