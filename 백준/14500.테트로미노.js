const [[N, M], ...board] = require('fs').readFileSync('dev/stdin').toString().trim().split("\n")
.map(v => v.split(" ").map(Number));

// 수평선 대칭
const symHor = tetro => {
    const { size, cell } = tetro;

    return {
        size: size,
        cell: cell.map(([r, c]) => [r * -1 + size[0] - 1, c])
    }
}

// 수직선 대칭
const symVer = tetro => {
    const { size, cell } = tetro;

    return {
        size: size,
        cell: cell.map(([r, c]) => [r, c * -1 + size[1] - 1])
    }
}

// 전치(대칭 및 회전)
const transpose = tetro => {
    const { size, cell } = tetro;

    return {
        size: [size[1], size[0]],
        cell: cell.map(([r, c]) => [c, r])
    }
}

// 기본 테트로미노
let tetros = [
    {
        size: [1, 4],
        cell: [[0, 0], [0, 1], [0, 2], [0, 3]]
    },
    {
        size: [2, 2],
        cell: [[0, 0], [0, 1], [1, 1], [1, 0]]
    },
    {
        size: [3, 2],
        cell: [[0, 0], [1, 0], [2, 0], [2, 1]]
    },
    {
        size: [3, 2],
        cell: [[0, 0], [1, 0], [1, 1], [2, 1]]
    },
    {
        size: [2, 3],
        cell: [[0, 0], [0, 1], [0, 2], [1, 1]]
    }
];

// 1 
tetros.push(transpose(tetros[0]));

// 3
let new_tet3 = transpose(tetros[2]);
tetros.push(new_tet3);
new_tet3 =  symHor(new_tet3);
tetros.push(new_tet3);
new_tet3 = symVer(new_tet3);
tetros.push(new_tet3);
new_tet3 = symHor(new_tet3);
tetros.push(new_tet3);
new_tet3 = transpose(new_tet3);
tetros.push(new_tet3);
new_tet3 = symVer(new_tet3);
tetros.push(new_tet3);
tetros.push(symHor(new_tet3));

// 4
let new_tet4 = transpose(tetros[3]);
tetros.push(new_tet4);
tetros.push(symVer(new_tet4));
tetros.push(symVer(tetros[3]));

// 5
let new_tet5 = transpose(tetros[4]);
tetros.push(new_tet5);
tetros.push(symVer(new_tet5));
tetros.push(symHor(tetros[4]));

// sol
// 해당 idx의 테트로미노 최댓값 확인
const iterate = tetro_idx => {
    const { size, cell } = tetros[tetro_idx];

    for (let i = 0; i <= N - size[0]; i++) {
        for (let j = 0; j <= M - size[1]; j++) {
            answer = Math.max(answer,
                cell.reduce((p, n) => p + board[i + n[0]][j + n[1]], 0)
            )
        }
    }
}

const sol = () => {
    let answer = 0;
    for (let i = 0; i < tetros.length; i++) {
        iterate(i);
    }
    console.log(answer);
}

sol();