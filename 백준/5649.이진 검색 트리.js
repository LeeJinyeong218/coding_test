const nums = require('fs').readFileSync('dev/stdin').toString().trim().split("\n").map(Number);

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.head = null;
    }

    addNode(node) {
        if (this.head === null) {
            this.head = node;
            return;
        }

        const val = node.val;
        let cur = this.head;

        while (true) {
            if (cur.val === val) return;

            if (cur.val > val) {
                if (cur.left === null) {
                    cur.left = node;
                    break;
                }

                cur = cur.left;
                continue;
            }

            if (cur.val < val) {
                if (cur.right === null) {
                    cur.right = node;
                    break;
                }

                cur = cur.right;
                continue;
            }
        }
    }

    getPostorder() {
        return this.getPostorderFromNode(this.head).join("\n");
    }

    getPostorderFromNode(node) {
        let result = [];

        if (node.left) result = [...result, ...this.getPostorderFromNode(node.left)];
        if (node.right) result = [...result, ...this.getPostorderFromNode(node.right)];
        result.push(node.val);

        return result;
    }
}

const tree = new Tree();

nums.forEach(v => {
    tree.addNode(new Node(v));
})

console.log(tree.getPostorder());