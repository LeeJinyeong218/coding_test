// solution 풀이
/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumIndex = function(a) {
    let n = a.length

    let f = {}
    let maxf, maxfe
    for (let e of a) {
        f[e] = (f[e] || 0) + 1
        if (
        maxf === undefined || //
        f[e] > maxf
        ) {
        maxf = f[e]
        maxfe = e
        }
    }

    let an = -1

    let lf = 0
    let rf = maxf
    let ln = 0
    let rn = n
    a.some((e, i) => {
        ln++
        rn--
        if (e === maxfe) {
        lf++
        rf--
        if (lf * 2 > ln && rf * 2 > rn) {
            an = i
            return true
        }
        }
    })

    return an
};