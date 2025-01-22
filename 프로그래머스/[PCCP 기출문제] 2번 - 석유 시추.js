function solution(land) {
    const [n, m] = [land.length, land[0].length];
    const d = [[-1, 0], [1, 0], [0, -1], [0, 1]];
    let sectionMap = new Map(); // key에 넓이 저장할 맵
    
    // 탐색 - 해당 섹션을 모두 key(num)으로 바꾸고 넓이를 셈
    const bfs = (i, j, num) => {
        let count = 1;
        let q = [[i, j]];
        land[i][j] = num;
        
        while (q.length > 0) {
            const [x, y] = q.shift();
            
            for (let [dx, dy] of d) {
                const [nx, ny] = [x + dx, y + dy];
                
                if (nx >= 0 && nx < n && ny >= 0 && ny < m && land[nx][ny] === 1) {
                    land[nx][ny] = num;
                    count++;
                    q.push([nx, ny]);
                }
            }
        }
        
        return count;
    }

    // 순회하며 sectionMap 완성
    let key = 2;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (land[i][j] === 1) {
                sectionMap.set(key, bfs(i, j, key));
                key++;
            }
        }
    }

    // 왼쪽부터 시추
    let max = 0;
    for (let i = 0; i < m; i++) {
        const keys = new Set(land.map(r => r[i]).filter(v => v > 0));
        max = Math.max(
            max,
            [...keys].reduce((sum, v) => sum + sectionMap.get(v), 0)
        )
    }
    return max;
}