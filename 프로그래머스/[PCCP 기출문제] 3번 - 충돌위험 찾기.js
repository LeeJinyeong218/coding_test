function solution(points, routes) {
    const n = routes.length;
    let pointMap = points.reduce((p, n, i) => {
        p[i + 1] = n;
        return p;
    }, {});
    
    let dest = routes.map(([_, ...e]) => e);
    let current = routes.map(([s, _]) => pointMap[s]);
    let count = 0;
    
    while (current.length) {
        // 중복된 좌표 확인 후 카운트 증가
        let check = {};
        current.forEach(cur => {
            const key = cur.join(" ");
            check[key] = (check[key] || 0) + 1;
        })
        for (let key in check) {
            if (check[key] > 1) count++;
        }
        
        // 이동
        let i = 0;
        let new_current = [];
        let new_dest = [];
        for (let i = 0; i < current.length; i++) {
            let [nx, ny] = move(current[i], pointMap[dest[i][0]]);
            
            if (nx === null && ny === null) {
                // 목적지와 좌표가 같을 때
                dest[i].shift();
                if (dest[i].length > 0) {
                    const [dx, dy] = move(current[i], pointMap[dest[i][0]]);
                    new_current.push([dx, dy]);
                    new_dest.push(dest[i]);
                }
            } else {
                new_current.push([nx, ny]);
                new_dest.push(dest[i]);
            }
        }
        current = new_current;
        dest = new_dest;
    }
    
    return count;
}

// 이동 함수: 한 번에 한 방향으로만 이동
const move = (current, dest) => {
    if (current[0] !== dest[0])
        return current[0] < dest[0] ?
            [current[0] + 1, current[1]] : [current[0] - 1, current[1]];
    if (current[1] !== dest[1])
        return current[1] < dest[1] ?
            [current[0], current[1] + 1] : [current[0], current[1] - 1];
    
    return [null, null];
}
