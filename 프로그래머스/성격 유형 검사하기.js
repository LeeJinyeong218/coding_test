function solution(survey, choices) {
    const type = [["R", "T"], ["C", "F"], ["J", "M"], ["A", "N"]];
    let score = {};
    
    survey.forEach((str, idx) => {
        const [l, r] = str.split("");
        const ans = choices[idx];
        
        switch(ans) {
            case 1:
            case 2:
            case 3:
                score[l] = (score[l] || 0) + 4 - ans;
                break;
            case 5:
            case 6:
            case 7:
                score[r] = (score[r] || 0) + ans - 4;
                break;
        }
    })

    return type.map(([a, b]) => {
        if (!score[a] && !score[b] ||
            score[a] && !score[b] ||
           score[a] && score[b] && score[a] >= score[b]) return a;
        else return b;
    }).join("");
}