const LENGTH = 5;
const MAN_DIST_1 = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function solution(places) {
    return places.map(place => isDist(place));
}

const isDist = (place) => {
    // 대기실을 받아 거리두기가 되어있는지 반환
    const place_grid = place.map(v => v.split(""));
    
    for (let i = 0; i < LENGTH; i++) {
        for (let j = 0; j < LENGTH; j++) {
            if (place[i][j] === 'P' && !check(place_grid, i, j)) {
                return 0;
            }
        }
    }
    
    return 1;
}

const check = (grid, x, y) => {
    // 대기실과 참가자 위치를 받아 거리두기가 되어있는지 확인
    for (let [dx, dy] of MAN_DIST_1) {
        const [nx, ny] = [x + dx, y + dy];
        
        if (nx >= 0 && nx < LENGTH && ny >= 0 && ny < LENGTH) {
            if (grid[nx][ny] === "P") return false;
            else if (grid[nx][ny] === "X") continue;
            else {
                // 빈 테이블일 때
                for (let [dx2, dy2] of MAN_DIST_1) {
                    const [nx2, ny2] = [nx + dx2, ny + dy2];
                    
                    if (
                        nx2 >= 0 && nx2 < LENGTH && ny2 >= 0 && ny2 < LENGTH &&
                        (nx2 !== x || ny2 !== y) &&
                        grid[nx2][ny2] === "P"
                    ) return false;
                }
            }
        }
    }
    
    return true;
}