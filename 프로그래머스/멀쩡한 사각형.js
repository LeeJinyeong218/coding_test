function solution(w, h) {
    const gcd = getGCD(w, h);
    return w * h - (w + h - gcd) // 공식
}

const getGCD = (a, b) => {
    if (b) return getGCD(b, a % b);
    return a;
}