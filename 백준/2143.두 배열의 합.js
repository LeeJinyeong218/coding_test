var input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
var T = +input[0];
var [n, m] = [+input[1], +input[3]];
var A = input[2].trim().split(" ").map(Number);
var B = input[4].trim().split(" ").map(Number);

var AMap = getSumMap(A, n);
var BMap = getSumMap(B, m);
var result = 0;

for (let [key, value] of AMap) {
    if (BMap.has(T - key)) {
        result += value * BMap.get(T - key);
    }
}
console.log(result);

function getSumMap(arr, arr_length){
    var sum_map = new Map();
    var sum_arr = new Array(arr_length);
    var sum = 0;
    for (var i = 0; i < arr_length; i++) {
        sum += arr[i];
        sum_arr[i] = sum;
    }

    for (let i = arr_length - 1; i >= 0; i--) {
        sum_map.set(sum_arr[i], (sum_map.get(sum_arr[i]) || 0) + 1);
        for (let j = 0; j < i; j++) {
            const s = sum_arr[i] - sum_arr[j];
            sum_map.set(s, (sum_map.get(s) || 0) + 1);
        }
    }
    return sum_map;
}