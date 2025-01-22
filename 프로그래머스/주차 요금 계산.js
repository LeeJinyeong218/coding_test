function solution(fees, records) {
    const close_time = 23 * 60 + 59;
    let totalTime = new Map();
    let park = new Map();
    let cars = new Set();
    
    let q = [...records];
    while (q.length > 0) {
        const [time, car, type] = q.shift().split(" ");
        const t = getTime(time);
        
        if (type === "IN") {
            park.set(car, t);
            cars.add(car);
        } else {
            totalTime.set(car, (totalTime.get(car) || 0) + t - park.get(car));
            park.delete(car);
        }
    }
    
    for (let [car, in_time] of park.entries()) {
        totalTime.set(car, (totalTime.get(car) || 0) + close_time - in_time);
    }

    return [...cars].sort((a, b) => a - b).map(v => getFee(fees, totalTime.get(v)));
}

const getTime = (time_str) => {
    const [h, m] = time_str.split(":").map(Number);
    return m + 60 * h;
}

const getFee = (fees, time) => {
    if (time <= fees[0]) return fees[1];
    
    return Math.ceil((time - fees[0])/fees[2]) * fees[3] + fees[1];
}