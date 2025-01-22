function solution(diffs, times, limit) {
    // 숙련도의 최솟값
    let l = 1;
    let r = 100000;
    let min = 100000;
    
    while (l <= r) {
        const mid = Math.floor((l + r) / 2);
        
        const t = getTime(mid, diffs, times);
        
        if (t > limit) {
            l = mid + 1;
        } else {
            r = mid - 1;
            min = mid;
        }
    }
    
    return min;
}

const getTime = (level, diffs, times) => {
    let time = 0;
    for (let i = 0; i < diffs.length; i++) {
        if (level >= diffs[i]) {
            time += times[i];
        } else {
            time += (times[i - 1] + times[i]) * (diffs[i] - level) + times[i];
        }
    }
    return time;
}