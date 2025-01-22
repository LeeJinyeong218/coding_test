function solution(s) {
    const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const reg = new RegExp("[0-9]|"+ words.join("|"), "g");
    return +s.match(reg).map(i => isNaN(i) ? words.indexOf(i) : i).join("")
}