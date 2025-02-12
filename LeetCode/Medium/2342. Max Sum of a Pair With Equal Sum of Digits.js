/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumSum = function(nums) {
    const n = nums.length;
    let answer = -1;

    const getSumDigits = function(num) {
        let sum = 0;
        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }

        return sum;
    }

    let map = new Map();

    for (let num of nums) {
        const sum = getSumDigits(num);

        if (!map.has(sum)) {
            map.set(sum, num);
        } else {
            answer = Math.max(answer, num + map.get(sum));

            if (num > map.get(sum)) {
                map.set(sum, num);
            }
        }

    }

    return answer;
};