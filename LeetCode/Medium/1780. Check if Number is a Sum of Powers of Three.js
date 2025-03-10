/**
 * @param {number} n
 * @return {boolean}
 */
var checkPowersOfThree = function(n) {
    if (n === 1) return true;
    if (n % 3 === 0) {
        return checkPowersOfThree(n / 3);
    } else if (n % 3 === 1) {
        return checkPowersOfThree((n - 1) / 3);
    }

    return false;
};