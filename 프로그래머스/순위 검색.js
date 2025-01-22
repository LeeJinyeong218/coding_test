// 검색 풀이
function solution(info, query) {
    // info를 "javafrontendjuniorpizza": 150 형태로 저장
    const infos = info.reduce((p, i) => {
        let seper = i.split(" ");
        const score = +seper.pop();
        const key = seper.join("");
        
        if (!p[key]) p[key] = [];
        p[key].push(score);
        
        return p;
    }, {});
    
    // 점수 정렬
    for (let [key, value] of Object.entries(infos)){
        infos[key] = value.sort((a, b) => a - b);
    }
    
    return query.map(q => {
        // query의 조건을 ["java", "backend", ...]로 입력, 점수는 별도
        const [cond, score] = q.replaceAll(" and ", "|").split(" ");
        return getCount(infos, cond.split("|").filter(v => v !== "-"), +score);
    })
}

const getCount = (infos, cond, score) => {
    return Object.keys(infos)
    .filter(i => cond.every(c => i.includes(c))) // 조건을 모두 문자열에 포함하고 있는 key만 선별
    .reduce((p, k) => {
        const arr = infos[k];
        return p + arr.length - binarySearch(arr, score);
    }, 0); // 배열 중 score과 같거나 큰 위치를 찾아서 길이에서 뺀다.
    // -> arr.length - (score 이상이 아닌 제일 큰 인덱스 idx - 1) + 1
}

const binarySearch = (arr, target) => {
    // target보다 작은 수의 idx
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return left; 
};
