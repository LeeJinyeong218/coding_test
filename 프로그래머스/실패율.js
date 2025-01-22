function solution(N, stages) {
    const stageLog = Array(N + 1).fill({}).map((_) => {
        return {
            notClear: 0,
            total : 0,
        }
    });
    
    stages.forEach(v => {
        if (v <= N) {
            stageLog[v].notClear++;
        
            for (let i = 1; i <= v; i++) {
                stageLog[i].total++;
            }
        } else {
            for (let i = 1; i <= N; i++) {
                stageLog[i].total++;
            }
        }
    })
 
    return Array(N).fill(0).map((_, i) => i + 1)
        .sort(
            (a, b) =>
            (stageLog[b].notClear / stageLog[b].total) -
            (stageLog[a].notClear / stageLog[a].total) 
        )
}