const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

let str = input[0].trim();
const coms = input.slice(2);

let left = [...str];
let right = [];

coms.forEach(com => {
    const [command, char] = com.split(" ");
    switch (command) {
        case "L":
            if (left.length > 0) right.push(left.pop());
            break;
        case "D":
            if (right.length > 0) left.push(right.pop());
            break;
        case "B":
            if (left.length > 0) left.pop();
            break;
        case "P":
            left.push(char);
            break;
    }
})

console.log(left.join("") + right.reverse().join(""));