var [str1, str2] = require('fs').readFileSync('dev/stdin').toString().trim().split('\n');

var table = Array.from(Array(str1.length + 1), () => Array(str2.length + 1).fill(""));

for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
        if (str1[i - 1] === str2[j - 1]) {
            table[i][j] = table[i - 1][j - 1] + str1[i - 1];
        } else {
            table[i][j] = table[i - 1][j].length > table[i][j - 1].length ? table[i - 1][j] : table[i][j - 1];
        }
    }
}

console.log(table[str1.length][str2.length].length);
console.log(table[str1.length][str2.length]);