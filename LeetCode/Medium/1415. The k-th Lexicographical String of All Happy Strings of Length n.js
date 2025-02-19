/**
 * @param {number} n
 * @param {number} k
 * @return {string}
 */
var getHappyString = function(n, k) {
    var letters = ['a', 'b', 'c'];
    var max = 3 * 2 ** (n - 1);

    const list = [];

    const dfs = function(idx, str) {
        if (idx === n) {
            list.push(str);
            return;
        }

        for (let letter of letters) {
            if (idx === 0 || str[idx - 1] !== letter) {
                dfs(idx + 1, str + letter);
            }
        }
    }

    dfs(0, "");

    return list.length < k ? "" : list[k - 1];
};