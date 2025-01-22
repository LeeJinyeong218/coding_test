const [S, T] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const S_length = S.length;

let st = [T];
let result = 0;

while (st.length) {
    const current = st.pop();

    if (current === S) {
        result = 1;
        break;
    }

    if (current.length === S_length) continue;

    if (current[current.length - 1] === "A") {
        st.push(current.slice(0, current.length - 1));
    }

    if (current[0] === "B") {
        st.push(current.slice(1).split("").reverse().join(""));
    }
}

console.log(result);