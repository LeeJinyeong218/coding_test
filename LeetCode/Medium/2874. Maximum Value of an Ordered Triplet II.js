/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumTripletValue = function(nums) {
    var maxI = 0, maxJ = 0, maxK = 0;

    for (let i = 0; i < nums.length; i++) {
        if (maxJ * nums[i] > maxK) maxK = maxJ * nums[i];
        if (maxI - nums[i] > maxJ) maxJ = maxI - nums[i];
        if (nums[i] > maxI) maxI = nums[i];
    }
    
    return maxK;
};