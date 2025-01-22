function solution(friends, gifts) {
    const N = friends.length;
    let friends_obj = {}
    friends.forEach((v, i) => {
        friends_obj[v] = i;
    })
    
    let scores = Array(N).fill(0);
    let table = Array.from(Array(N), () => Array(N).fill(0));
    
    gifts.forEach(g => {
        const [from, to] = g.split(" ").map(v => +friends_obj[v]);
        scores[from]++;
        scores[to]--;
        table[from][to]++;
    })
    
    let next_week = Array(N).fill(0);
    
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            if (table[i][j] > table[j][i]) {
                next_week[i]++;
            } else if (table[i][j] < table[j][i]) {
                next_week[j]++;
            } else {
                if (scores[i] !== scores[j]) {
                    next_week[scores[i] > scores[j] ? i : j]++;
                }
            }
        }
    }
    
    return Math.max(...next_week);
}