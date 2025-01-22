function solution(n) {
    let pyramid = Array(n).fill([]).map((_, i) => Array(i + 1).fill(null));
    const MAX = n * (n + 1) / 2;
    
    const d = [[1, 0], [0, 1], [-1, -1]];
    
    let x = 0, y = 0;
    let num = 0;
    let direction = 0;
    
    while (true) {
        num++;
        if (num > MAX) break;
        
        pyramid[x][y] = num;
        
        let nx = x + d[direction][0], ny = y + d[direction][1];
        
        if (pyramid[nx] && pyramid[nx][ny] === null) {
            x = nx;
            y = ny;
            continue;
        }
        
        direction = (direction + 1) % 3;
        
        x += d[direction][0];
        y += d[direction][1];
    }
    
    return pyramid.flat();
}