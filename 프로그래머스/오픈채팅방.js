function solution(record) {
    let uidMap = new Map();
    let recordArr = [];
    
    record.forEach(v => {
        const [type, uid, name] = v.split(" ");
        
        if (type === "Enter" || type === "Change") {
            uidMap.set(uid, name);
        }
        
        if (type === "Enter") {
            recordArr.push([1, uid]);
        } else if (type === "Leave") {
            recordArr.push([0, uid]);
        }
    })
    
    return recordArr.map(([type, uid]) => {
        if (type) {
            return `${uidMap.get(uid)}님이 들어왔습니다.`
        } else {
            return `${uidMap.get(uid)}님이 나갔습니다.`
        }
    })
}