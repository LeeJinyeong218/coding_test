function solution(h1, m1, s1, h2, m2, s2) {
    const start = timeToS(h1, m1, s1);
    const end = timeToS(h2, m2, s2);
    
    return getAlarmCount(end) - getAlarmCount(start) + (isOverlap(h1, m1, s1) ? 1 : 0);
}

const timeToS = function(h, m, s) {
    return h * 60 * 60 + m * 60 + s;
}

const getAlarmCount = function(s) {
    const hour_count = Math.floor(s * 719 / (12 * 60 * 60));
    const min_count = Math.floor(s * 59 / (60 * 60));
    
    return 1 + hour_count + min_count - (s >= 12 * 60 * 60 ? 1 : 0);
}

const isOverlap = function(h, m, s) {
    const h_p = h * 30 + m * 0.5 + s * 0.5 / 60;
    const m_p = m * 6 + s / 10;
    const s_p = s * 6;
    
    return h_p === s_p || m_p === s_p
}