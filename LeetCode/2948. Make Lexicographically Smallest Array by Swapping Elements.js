// 솔루션
/**
 * @param {number[]} nums
 * @param {number} limit
 * @return {number[]}
 */
var lexicographicallySmallestArray = function(nums, limit) {
    const N = nums.length;

    const sortedArray = nums.map((num, index) => [num, index]);
    sortedArray.sort(([num1, index1], [num2, index2]) => num1 - num2);

    const groupedElements = [];
    let group = [sortedArray[0]];
    for (let i = 1; i < N; i++) {
        const element1 = group[group.length - 1],
            element2 = sortedArray[i];

        if (Math.abs(element1[0] - element2[0]) <= limit) {
            group.push(element2);
        } else {
            groupedElements.push(group);
            group = [element2];
        }
    }

    if (group.length) {
        groupedElements.push(group);
    }

    for (const groupedElement of groupedElements) {
        const indicesInCurrentGroup = [], M = groupedElement.length;
        for (const [, index] of groupedElement) {
            indicesInCurrentGroup.push(index);
        }

        indicesInCurrentGroup.sort((a, b) => a - b);

        for (let i = 0; i < M; i++) {
            const index = indicesInCurrentGroup[i];
            nums[index] = groupedElement[i][0];
        }
    }

    return nums;
};