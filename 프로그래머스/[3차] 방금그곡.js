class Music {
    constructor(start, end, title, scales) {
        this.title = title
        this.play_time = end - start;
        
        const converted_scales = convertSharpToLower(scales);
        // 재생 시간만큼 나오는 음계 모두 저장
        this.total_scales = 
            converted_scales.repeat(Math.floor(this.play_time / converted_scales.length)) 
            + converted_scales.slice(0, this.play_time % converted_scales.length);
    }
}

// #이 붙으면 그 음계를 소문자로 변환
const convertSharpToLower = scales => {
    return scales.replace(/[A-Z]#/g, c => c[0].toLowerCase());
}

// 시각 분으로 통일
const convertTime = t_str => {
    const [h, m] = t_str.split(":").map(Number);
    return h * 60 + m;
}

function solution(m, musicinfos) {
    const m_converted = convertSharpToLower(m);
    const musics = musicinfos.reduce((arr, next) => {
        const [start, end, title, scales] = next.split(",");
        arr.push(new Music(convertTime(start), convertTime(end), title, scales));
        return arr;
    }, []);
    
    // convert된 m을 포함하는 지 확인
    const containsM = scales => {
        if (scales.includes(m_converted)) return true;
        return false;
    }
    
    let title = null;
    let play_time = 0;

    for (let music of musics) {
        if (containsM(music.total_scales)) {
            if (!title || play_time < music.play_time) {
                title = music.title;
                play_time = music.play_time;
            }
        }
    }
    
    return title ? title : "(None)";
}