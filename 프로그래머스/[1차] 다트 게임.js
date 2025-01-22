function solution(dartResult) {
    const bonusObj = {
        "S": 1,
        "D": 2,
        "T": 3
    }
    
    const darts = dartResult.match(/\d+[SDT][\*\#]?/g);
    let scores = Array(darts.length).fill(0);
    for (let i = 0; i < darts.length; i++) {
        const [score, bonus, option] =
              [darts[i].match(/\d+/)[0], bonusObj[darts[i].match(/[SDT]/)], darts[i].match(/[\*\#]/)];
        if (option === null) {
            scores[i] = score ** bonus;
            continue;
        }
        
        if (option[0] === "*") {
            scores[i] = score ** bonus * 2;
            if (scores[i - 1]) scores[i - 1] *= 2;
        } else if (option[0] === "#") {
            scores[i] = score ** bonus * -1;
        }
    }
    return scores.reduce((p, n) => p + n, 0);
}