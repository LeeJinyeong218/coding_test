/**
 * @param {number[][]} grid
 * @param {number} x
 * @return {number}
 */
var minOperations = function(grid, x) {
    var flat = grid.flat(); 
    flat.sort((a, b) => a - b);

    var median = flat[Math.floor(flat.length / 2)];

    let operations = 0;
    
    for (let num of flat) {
        let diff = Math.abs(num - median);
        if (diff % x !== 0) return -1;
        operations += diff / x;
    }

    return operations;
};