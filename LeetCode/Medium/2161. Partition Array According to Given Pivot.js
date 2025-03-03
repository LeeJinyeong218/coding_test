/**
 * @param {number[]} nums
 * @param {number} pivot
 * @return {number[]}
 */
var pivotArray = function(nums, pivot) {
    let left = [];
    let medium = [];
    let right = [];

    for (let num of nums) {
        if (num === pivot) medium.push(num);
        else if (num < pivot) left.push(num);
        else right.push(num);
    }

    return [...left, ...medium, ...right];
};