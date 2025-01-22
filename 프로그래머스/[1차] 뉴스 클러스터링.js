function solution(str1, str2) {
    const set1 = getSet(str1);
    const set2 = getSet(str2);
    
    return getJ(set1, set2);
}

const getSet = (str) => {
    const lstr = str.toLowerCase();
    const reg = /[a-z]{2}/;
    const set = { sum: 0 };
    for (let i = 1; i < str.length; i++) {
        const slice = lstr.slice(i - 1, i + 1)
        if (reg.test(slice)) {
            if (!set[slice]) {
                set[slice] = 1;
            } else {
                set[slice]++;
            }
            set.sum++;
        }
    }
    return set;
}

const getJ = (set1, set2) => {
    if (!set1.sum && !set2.sum) return 65536;

    let inter = 0;
    for (let key of Object.keys(set1)) {
        if (key !== 'sum') {
            inter += Math.min(set1[key], set2[key] ? set2[key] : 0);
        }
    }
    const union = set1.sum + set2.sum - inter;
    
    return Math.floor(inter / union * 65536);
}