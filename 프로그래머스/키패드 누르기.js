function solution(numbers, hand) {
    const LEFT = "L";
    const RIGHT = "R";
    
    const keypad = [[1, 2, 3], [4, 5, 6], [7, 8, 9], ["*", 0, "#"]];
    const locate = [
        [3, 1], [0, 0], [0, 1], [0, 2], 
        [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
    
    let l = [3, 0];
    let r = [3, 2];
    
    const getDist = (coord1, coord2) => {
        return Math.abs(coord2[1] - coord1[1]) + Math.abs(coord2[0] - coord1[0]);
    }
    
    let answer = ""
    numbers.forEach(n => {
        switch (n) {
            case 1:
            case 4:
            case 7:
                l = locate[n];
                answer += LEFT;
                break;
            case 3:
            case 6:
            case 9:
                r = locate[n];
                answer += RIGHT;
                break;
            default:
                const ld = getDist(locate[n], l);
                const rd = getDist(locate[n], r);
                
                if (ld < rd || ld === rd && hand === "left") {
                    l = locate[n];
                    answer += LEFT;
                } else {
                    r = locate[n];
                    answer += RIGHT;
                }
        }
    })
    
    return answer;
}