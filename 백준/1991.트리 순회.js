const input = require('fs').readFileSync('dev/stdin').toString().trim().split("\n");

const N = +input[0];
const node_states = input.slice(1).map(v => v.split(" "));

class Node {
    constructor(name) {
        this.name = name;
        this.left = null;
        this.right = null;
    }
}

let nodes = new Map();
const root = new Node('A');
nodes.set('A', root); // 항상 루트 노드

node_states.forEach(([p, l, r]) => {
    if (!nodes.has(p)) nodes.set(p, new Node(p));
    const parent = nodes.get(p);

    if (l !== '.') {
        nodes.set(l, new Node(l));
        parent.left = nodes.get(l);
    }
    if (r !== '.') {
        nodes.set(r, new Node(r));
        parent.right = nodes.get(r);
    }
})

let 전위순회_결과 = "";
let 중위순회_결과 = "";
let 후위순회_결과 = "";

const 전위순회 = node => {
    전위순회_결과 += node.name;
    if (node.left) 전위순회(node.left);
    if (node.right) 전위순회(node.right);
}

const 중위순회 = node => {
    if (node.left) 중위순회(node.left);
    중위순회_결과 += node.name;
    if (node.right) 중위순회(node.right);
}

const 후위순회 = node => {
    if (node.left) 후위순회(node.left);
    if (node.right) 후위순회(node.right);
    후위순회_결과 += node.name;
}

전위순회(root);
중위순회(root);
후위순회(root);

console.log(전위순회_결과 + "\n" + 중위순회_결과 + "\n" + 후위순회_결과);