function solution(cacheSize, cities) {
    const CACHE_HIT = 1;
    const CACHE_MISS = 5;
    
    if (cacheSize === 0) return cities.length * CACHE_MISS;
    
    let page = Array(cacheSize).fill(null);
    let t = 0;
    
    for (let city of cities) {
        const lCity = city.toLowerCase();
        if (!page.includes(lCity)) {
            t += CACHE_MISS;
            page.shift();
            page.push(lCity);
        } else {
            const idx = page.indexOf(lCity);
            page = [...page.slice(0, idx), ...page.slice(idx + 1), lCity];
            t += CACHE_HIT;   
        }
    }
    return t;
}