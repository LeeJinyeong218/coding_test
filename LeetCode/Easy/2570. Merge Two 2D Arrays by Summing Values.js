/**
 * @param {number[][]} nums1
 * @param {number[][]} nums2
 * @return {number[][]}
 */
var mergeArrays = function(nums1, nums2) {
    var output = [];
    var l1 = nums1.length, l2 = nums2.length;

    var i = 0;
    var j = 0;
    while (i < l1 && j < l2) {
        if (nums1[i][0] === nums2[j][0]) {
            output.push([nums1[i][0], nums1[i][1] + nums2[j][1]]);
            i++;
            j++;
            continue;
        }

        if (nums1[i][0] < nums2[j][0]) {
            output.push(nums1[i]);
            i++;
            continue;
        }

        output.push(nums2[j]);
        j++;
    }

    while (i < l1) {
        output.push(nums1[i++]);
    }

    while (j < l2) {
        output.push(nums2[j++]);
    }

    return output
};