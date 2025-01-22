function solution(name) {
    let name_split = name.split('');
    return name_split.reduce((p, n) => p + getConvertAlphabetCount('A', n), 0)
    + getMoveCount(name_split);
}

const getMoveCount = name_split => {
    const l = name_split.length;
    let moveCost = l - 1; // 초기값: 오른쪽 끝까지 이동

    for (let i = 0; i < l; i++) {
        let nextIdx = i + 1;
        while (nextIdx < l && name_split[nextIdx] === 'A') {
            nextIdx++;
        }

        // 최적 경로 계산
        // i : 현재까지의 카운트
        // l - nextIdx : A가 아닌 곳까지의 맨 끝에서 카운트
        // Math.min(i, l - nextIdx) : 돌아가면서 다시 카운트하는 부분
        moveCost = Math.min(
            moveCost,
            i + (l - nextIdx) + Math.min(i, l - nextIdx)
        );
    }

    return moveCost;
}

const getConvertAlphabetCount = (current, target) => {
    const cur_code = current.charCodeAt();
    const tar_code = target.charCodeAt();
    
    const diff = Math.abs(cur_code - tar_code);
    
    return Math.min(diff, 26 - diff);
}