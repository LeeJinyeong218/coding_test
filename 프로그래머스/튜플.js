function solution(s) {
    let sets = s.slice(2, s.length - 2).split("},{").map(v => v.split(",").map(Number));
    const n = sets.length;
    
    let answer = [];
    
    sets.forEach(set => {
        if (answer.length > set.length) {
            answer = [...set.sort((a, b) => answer.indexOf(a) - answer.indexOf(b)), ...answer.filter(v => !set.includes(v))];
        } else {
            answer = [...answer, ...set.filter(v => !answer.includes(v))];
        }
    })
    
    return answer;
}