function solution(files) {    
    const objs = files.map((file, idx) => seperateFilename(file, idx));

    return objs.sort((a, b) => {
        const headCom = compareString(a.HEAD, b.HEAD);
        if (headCom !== 0) return headCom;
        else if (a.NUMBER !== b.NUMBER) return a.NUMBER - b.NUMBER;
        else return a.idx - b.idx;
    }).map(v => v.total);
}

// 파일명 -> HEAD, TAIL, idx, name으로 분리
const seperateFilename = (name, idx) => {
    const regex = new RegExp("^(\\D+)(\\d+)(.*)$");
    const [HEAD, NUMBER, _] = name.match(regex).slice(1, 4);
    
    return {
        HEAD,
        NUMBER: +NUMBER,
        idx: idx,
        total: name
    };
}

// 대문자, 소문자 상관없이 비교
const compareString = (a, b) => {
    const aL = a.toLowerCase();
    const bL = b.toLowerCase();
    
    if (aL > bL) return 1;
    else if (aL < bL) return -1;
    else return 0;
}