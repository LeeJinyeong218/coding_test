/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var shortestCommonSupersequence = function(str1, str2) {
    var m = str1.length, n = str2.length;
    var dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(''));

    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (str1[i - 1] === str2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + str1[i - 1];
            } else {
                dp[i][j] = dp[i - 1][j].length > dp[i][j - 1].length ? dp[i - 1][j] : dp[i][j - 1];
            }
        }
    }

    var lcs = dp[m][n];

    var i = 0, j = 0, k = 0;
    var result = "";

    for (let c of lcs) {
        while (i < m && str1[i] !== c) result += str1[i++];
        while (j < n && str2[j] !== c) result += str2[j++];
        result += c;
        i++;
        j++;
    }

    result += str1.slice(i) + str2.slice(j);

    return result;
};