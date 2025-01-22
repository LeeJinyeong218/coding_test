function solution(msg) {
    let dict = new Map();
    const alpabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    
    for (let i = 0; i < 26; i++) {
        dict.set(alpabet.charAt(i), i + 1);
    }
    
    let answer = [];
    let q = msg.split("");
    let w = ""
    let idx = 27;
    
    while (q.length) {
        w += q.shift();
        const c = q[0];
        
        if (dict.has(w + c)) {
            continue;
        }
        
        if (c) {
            dict.set(w + c, idx++);
        }
        
        answer.push(dict.get(w));
        w = "";
    }
    
    return answer;
}