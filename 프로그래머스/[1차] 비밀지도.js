function solution(n, arr1, arr2) {
    const grid1 = arrToGrid(n, arr1);
    const grid2 = arrToGrid(n, arr2);
    
    let answer = grid1.map((v1, i1) => 
                           v1.map((v2, i2) =>
                                  v2 === 0 && grid2[i1][i2] === 0 ?
                                    " " : "#"
                                 ).join("")
                          )
    
    return answer;
}

const arrToGrid = (n, arr) => {
    return arr.map(num => {
        const bin = num.toString(2).split("").map(Number);
        return [...Array(n - bin.length).fill(0), ...bin];
    });
}