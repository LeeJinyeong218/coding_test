function solution(expression) {
    const opers = ['*', '+', '-'].filter(v => expression.includes(v)); // 연산자 골라내기
    const exp_seper = expression.match(/\d+|[\*\-\+]/g); // 숫자와 연산자로 분리
    
    const order_combs = getComb(opers); // 순열...
    let max = 0;
    
    for (let comb of order_combs) {
        let deq = [...exp_seper];
        for (let oper of comb) { // 연산자 순서대로 계산
            let next_deq = [];
            
            for (let i = 0; i < deq.length; i++) {
                if (deq[i] === oper) {
                    i++;
                    switch (oper) {
                        case "+":
                            next_deq.push(+next_deq.pop() + +deq[i]);
                            break;
                        case "*":
                            next_deq.push(+next_deq.pop() * +deq[i]);
                            break;
                        case "-":
                            next_deq.push(+next_deq.pop() - +deq[i]);
                            break;
                    }
                    continue;
                }
                
                next_deq.push(deq[i]);
            }
            
            deq = [...next_deq];
        }
        
        max = Math.max(Math.abs(deq[0]), max);
    }
    return max
}

const getComb = arr => {
    // arr의 조합 구하기
    if (arr.length === 1) return arr;
    
    let return_combs = [];
    
    for (let item of arr) {
        const sub_combs = getComb(arr.filter(v => v !== item));
        
        return_combs.push(...sub_combs.map(v => [item, ...v]));
    }
    
    return return_combs;
}