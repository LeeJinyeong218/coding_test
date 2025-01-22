const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");
const N = +input[0].trim();
const towers = input[1].trim().split(" ").map(Number);

const answer = Array(N).fill(0);

let st = [];

for (let i = 0; i < N; i++) {
    // 스택의 맨 마지막 요소가 현재 요소보다 클 때까지 빼기
    while (st.length && towers[st[st.length - 1]] <= towers[i]) {
        st.pop();
    }

    // 스택에 요소가 있다면 마지막 인덱스 + 1을 현재 인덱스 값에 넣기
    if (st.length) {
        answer[i] = st[st.length - 1] + 1;
    }

    // 스택에 추가 -> 뒤에 뭐가 올지 모름
    st.push(i);
}

console.log(answer.join(" "));