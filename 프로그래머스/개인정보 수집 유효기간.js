const MIN_YEAR = 2000;
const MAX_MONTH = 12;
const MAX_DAY = 28;
function solution(today, terms, privacies) {
    let answer = []
    const today_n = getNum(today);
    const termObj = {};
    terms.forEach(v => {
        const [name, month] = v.split(" ");
        termObj[name] = +month;
    })
    
    privacies.forEach((pr, idx) => {
        const [dateStr, termName] = pr.split(" ");
        const start_n = getNum(dateStr);
        const end_n = addTerm(start_n, termObj[termName]);
        if (today_n > end_n) {
            answer.push(idx + 1);
        }
    })
    
    return answer;
}

const getNum = (str) => {
    const [year, month, day] = str.split(".").map(Number);
    return ((year - MIN_YEAR) * MAX_MONTH + month) * MAX_DAY + day;
}

const addTerm = (num, term) => {
    return num + term * MAX_DAY - 1;
}