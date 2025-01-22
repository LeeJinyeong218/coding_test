function solution(relation) {
    // 후보키의 조건
    // 1. 유일성: 겹치지 않아야함
    // 2. 유일성을 갖는 키를 하나라도 제외하면 유일성이 깨짐
    // -> 유일 조합
    const row_size = relation.length;
    const column_size = relation[0].length;
    let column_idx_array = Array(column_size).fill(0).map((_, idx) => idx);

    let cand_keys = [];
    var answer = 0;
    let size = 1;
    
    while (true) {
        if (column_idx_array.length < size) break;
        const combs = getCombs(column_idx_array, size)
        
        for (let comb of combs) {
            if (cand_keys.some(key => key.every(col => comb.includes(col)))) {
                continue;
            }
            
            const keys = relation.map(v => comb.reduce((p, c) => p + v[c], ""));
            if (keys.length === new Set(keys).size) {
                // 겹치지 않을 때
                cand_keys.push(comb);
                answer++;
            }
        }
        size++;
    }
    
    return answer;
}

const getCombs = (array, size) => {
    if (size === 1) return array.map(v => [v]);
    
    let total_combs = [];
    for (let i = 0; i < array.length - size + 1; i++) {
        const combs = getCombs(array.slice(i + 1), size - 1);
        total_combs = [...total_combs, ...combs.map(v => [array[i], ...v])];
    }
    return total_combs;
}