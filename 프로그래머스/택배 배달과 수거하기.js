// 검색 풀이
function solution(cap, n, deliveries, pickups) {
    let answer = 0;
    
    let deliveries_amount = 0;
    let pickups_amount = 0;
    
    for (let i = n - 1; i > -1; i--) {
        deliveries_amount += deliveries[i];
        pickups_amount += pickups[i];
        
        let count = 0;
        while (deliveries_amount > 0 || pickups_amount > 0) {
            deliveries_amount -= cap;
            pickups_amount -= cap; // 음수가 될 경우 다음으로 넘김
            // 하나라도 양수이면 갔다 와야한다.
            count++;
        }
        answer += (i + 1) * 2 * count;
    }
    
    return answer;
}