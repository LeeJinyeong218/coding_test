let answer = 0; // 안에 넣으면 더 좋을듯,,,
function solution(n) {
    dfs([], n);
    return answer;
}

const dfs = (idxs, n) => {
    const l = idxs.length;
    const validIdxs = getValidIdxs(idxs, n);
    if (l === n) {
        answer++
        return
    }
    
    validIdxs.forEach(validIdx => {
        dfs([...idxs, validIdx], n);
    })
}

const getValidIdxs = (idxs, n) => {
    const l = idxs.length;
    let check = Array(n).fill(true);
    
    idxs.forEach((idx, i) => {
        check[idx] = false;
        const diff = l - i;
        
        if (check[idx - diff]) check[idx - diff] = false;
        if (check[idx + diff]) check[idx + diff] = false;
    })
    
    return check.reduce((p, n, i) => {
        if (n) p.push(i);
        return p;
    }, [])
}