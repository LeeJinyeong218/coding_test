function solution(n, k) {
    const strs = n.toString(k).split(/0+/);
    
    return strs.filter(v => isPrime(+v)).length;
}

const isPrime = n => {
    if (n < 2) return false;
    
    for (let i = 2; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) return false;
    }
    
    return true;
}