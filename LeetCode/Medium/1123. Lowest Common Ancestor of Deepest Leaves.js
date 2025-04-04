/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var lcaDeepestLeaves = function(root) {
    var parents = new Map();
    var deepest = [root];
    var maxD = 0;

    // 제일 깊은 노드 구하기
    var q = [[root, 0]];
    while (q.length) {
        const [node, d] = q.shift();

        if (node.left) {
            parents.set(node.left, node);
            q.push([node.left, d + 1]);
            if (d + 1 > maxD) {
                maxD = d + 1
                deepest = [];
            }
            if (d + 1 === maxD) {
                deepest.push(node.left);
            }
        }
        if (node.right) {
            parents.set(node.right, node);
            q.push([node.right, d + 1]);
            if (d + 1 > maxD) {
                maxD = d + 1
                deepest = [];
            }
            if (d + 1 === maxD) {
                deepest.push(node.right);
            }
        }
    }

    // 공통 조상 노드 구하기  

    while (deepest.length > 1) {
        const node = deepest.shift();
        const p = parents.get(node);
        if (!deepest.includes(p)) {
            deepest.push(p);
        }
    }

    return deepest[0];
};