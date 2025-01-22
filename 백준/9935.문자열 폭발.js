const [str1, str2] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const sol = (str1, str2) => {
    const l = str2.length;
    let stack = [];

    for (let i = 0; i < str1.length; i++) {
        if (str1[i] === str2[l - 1] && stack.length >= l - 1) {
            if (stack.slice(stack.length - l + 1).join("") + str1[i] === str2) {
                for (let k = 0; k < l - 1; k++) {
                    stack.pop();
                }
                continue;
            }
        }
        stack.push(str1[i]);
    }

    return stack.length > 0 ? stack.join("") : "FRULA";
}

console.log(sol(str1, str2))