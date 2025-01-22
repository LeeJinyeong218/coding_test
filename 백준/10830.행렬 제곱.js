const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const row1 = input[0].split(" ");
const N = +row1[0];
const B = BigInt(row1[1]);
const arr = input.slice(1).map(v => v.split(" ").map(v => +v % 1000));

const getPow = (arr, k) => {
    if (k === BigInt(1)) return arr;
    if (k % BigInt(2) === BigInt(1)) {
        const temp = getPow(arr, (k - BigInt(1))/ BigInt(2));
        return getMultiple(getMultiple(temp, temp), arr);
    }
    const temp = getPow(arr, k / BigInt(2));
    return getMultiple(temp, temp);
}

const getMultiple = (arr1, arr2) => {
    let result = Array.from(Array(arr1.length), () => Array(arr2.length).fill(0));
    for (let i = 0; i < arr1.length; i++) {
        for (let j = 0; j < arr2.length; j++) {
            for (let k = 0; k < arr1[0].length; k++) {
                result[i][j] += arr1[i][k] * arr2[k][j];
                result[i][j] %= 1000
            }
        }
    }
    return result;
}

console.log(getPow(arr, B).map(v => v.join(" ")).join("\n"));