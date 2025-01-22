function solution(p) {
    // 1
    if (p.length === 0) return p;
    
    // 2
    let isCorrect = true;
    let sym = 0;
    let seper = 0;
    for (let i = 0; i < p.length; i++) {
        if (p.charAt(i) === "(") sym++;
        else if (p.charAt(i) === ")") sym--;
        
        if (sym < 0) {
            isCorrect = false;
        }
        
        if (!sym) {
            seper = i + 1;
            break;
        }
    }
    
    let u = p.slice(0, seper);
    let v = p.slice(seper);

    // 3
    if (isCorrect) return u + solution(v);

    // 4
    return `(${solution(v)})${u.slice(1, u.length - 1).split("").map(v => {
        if (v === "(") return ")";
        return "(";
    }).join("")}`
}