function solution(queue1, queue2) {
    const totalq = [...queue1, ...queue2];
    const target = totalq.reduce((p, n) => p + n, 0) / 2;
    
    if (!Number.isInteger(target)) return -1;
    
    let count = 0;
    let left = 0;
    let right = queue1.length;
    let sum = queue1.reduce((p, n) => p + n, 0);
    
    while (count < totalq.length * 2) {
        if (sum === target) return count;

        if (sum > target) {
            sum -= totalq[left++];
        } else {
            sum += totalq[right % totalq.length];
            right++;
        }
        count++;
    }
    
    return -1;
}