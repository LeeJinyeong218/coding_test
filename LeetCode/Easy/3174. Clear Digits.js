/**
 * @param {string} s
 * @return {string}
 */
var clearDigits = function(s) {
    let array = s.split("");
    let stack = [];

    while (array.length) {
        const cur = array.shift();

        if (isNaN(cur)) {
            stack.push(cur);
        } else {
            stack.pop();
        }
    }

    return stack.join("");
};