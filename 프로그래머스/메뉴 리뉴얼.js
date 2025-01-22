// chatgpt
function solution(orders, course) {
    const menus = {};

    orders.forEach(order => {
        const sortedOrder = order.split("").sort().join("");
        for (const c of course) {
            if (c <= sortedOrder.length) {
                const combs = getCombs(sortedOrder, c);
                combs.forEach(comb => {
                    menus[comb] = (menus[comb] || 0) + 1;
                });
            }
        }
    });

    const result = [];

    course.forEach(c => {
        let maxCount = 0;
        const candidates = [];

        for (const [comb, count] of Object.entries(menus)) {
            if (comb.length === c && count > 1) {
                if (count > maxCount) {
                    maxCount = count;
                    candidates.length = 0;
                    candidates.push(comb);
                } else if (count === maxCount) {
                    candidates.push(comb);
                }
            }
        }

        result.push(...candidates);
    });

    return result.sort();
}

function getCombs(order, num) {
    const result = [];
    
    function combine(prefix, start) {
        if (prefix.length === num) {
            result.push(prefix);
            return;
        }
        for (let i = start; i < order.length; i++) {
            combine(prefix + order[i], i + 1);
        }
    }

    combine("", 0);
    return result;
}
