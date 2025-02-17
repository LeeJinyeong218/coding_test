/**
 * @param {string} tiles
 * @return {number}
 */
var numTilePossibilities = function(tiles) {
    var l = tiles.length;
    var obj = {};
    obj[""] = l;

    tiles.split("").forEach(c => {
        if (!obj[c]) obj[c] = 0;
        obj[c]++;
    })

    var set = new Set();
    var keys = Object.keys(obj);

    const dfs = (idx, str) => {
        if (idx === l) {
            set.add(str);
            return;
        }

        for (let key of keys) {
            if (obj[key]) {
                obj[key]--;
                dfs(idx + 1, str + key);
                obj[key]++;
            }
        }
    }

    dfs(0, "");
    return set.size - 1;
};