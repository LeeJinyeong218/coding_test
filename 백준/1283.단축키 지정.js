const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const N = +input[0].trim();
const options = input.slice(1);

let shortcuts = new Set();
let answer = [];

options.forEach(option => {
    let words = option.split(" ");

    let flag = false;
    for (let [idx, word] of words.entries()) {
        const char = word.charAt(0);
        if (shortcuts.has(char.toLowerCase()) || shortcuts.has(char.toUpperCase())) {
            // 이미 단축키가 있을 때
            continue;
        }

        shortcuts.add(char);
        words[idx] = `[${char}]${word.slice(1)}`;
        flag = true;
        break;
    }
    
    if (!flag) {
        // 모든 단어의 앞 글자가 단축어일 때
        for (let [idx, word] of words.entries()) {
            for (let i = 1; i < word.length; i++) {
                const char = word.charAt(i);
                if (shortcuts.has(char.toLowerCase()) || shortcuts.has(char.toUpperCase())) {
                    // 이미 단축키가 있을 때
                    continue;
                }
                shortcuts.add(char);
                words[idx] = word.slice(0, i) + `[${char}]` + word.slice(i + 1)
                flag = true;
                break;
            }
            if (flag) break;
        }
    }

    answer.push(words.join(" "));
})

console.log(answer.join("\n"));