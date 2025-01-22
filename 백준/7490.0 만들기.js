const [T, ...N_arr] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(Number);

let answer = [];

const calc = str => {
    const eq = str.replaceAll(" ", "").match(/(\d+)|\+|\-/g);
    let result = +eq[0];
    for (let i = 1; i < eq.length; i += 2) {
        if (eq[i] === "+") result += +eq[i + 1];
        if (eq[i] === "-") result -= +eq[i + 1];
    }
    return result;
}

N_arr.forEach(v => {
    
    let sub_answer = [];
    
    const dfs = (N, cur, eq) => {
        cur++;

        if (cur > N) {
            if (calc(eq) === 0) {
                sub_answer.push(eq); 
            }
            return;
        }

        dfs(N, cur, eq + " " + cur);
        dfs(N, cur, eq + "+" + cur);
        dfs(N, cur, eq + "-" + cur);
    }

    dfs(v, 1, "1");

    answer.push(sub_answer.join("\n"));
})

console.log(answer.join("\n\n"));