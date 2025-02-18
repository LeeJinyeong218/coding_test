/**
 * @param {string} pattern
 * @return {string}
 */
var smallestNumber = function(pattern) {
    const l = pattern.length + 1;
    let used = new Array(10).fill(false);
    let min = Infinity;

    const dfs = (idx, sum, prev) => {
        if (sum > min) return;

        if (idx === l) {
            min = Math.min(min, sum);
        }

        const base = 10 ** (l - 1 - idx);

        if (idx === 0) {
            for (let i = 1; i < 10; i++) {
                used[i] = true;
                dfs(idx + 1, sum + base * i, i);
                used[i] = false;
            }
            return;
        }

        const command = pattern.charAt(idx - 1);

        if (command === "I") {
            for (let i = prev + 1; i < 10; i++) {
                if (!used[i]) {
                    used[i] = true;
                    dfs(idx + 1, sum + base * i, i);
                    used[i] = false;
                }
            }
        } else {
            for (let i = 1; i < prev; i++) {
                if (!used[i]) {
                    used[i] = true;
                    dfs(idx + 1, sum + base * i, i);
                    used[i] = false;
                }
            }
        }
    }

    dfs(0, 0, 0);

    return min.toString();
};