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
 */
var FindElements = function(root) {   
    this.root = root;
    this.set = new Set();
    this.root.val = 0;
    this.set.add(0);
    let q = [this.root];

    while (q.length) {
        const cur = q.shift();
        if (cur.left && cur.left.val === -1) {
            cur.left.val = cur.val * 2 + 1;
            this.set.add(cur.left.val);
            q.push(cur.left);
        }

        if (cur.right && cur.right.val === -1) {
            cur.right.val = cur.val * 2 + 2;
            this.set.add(cur.right.val);
            q.push(cur.right);
        }
    }
};

/** 
 * @param {number} target
 * @return {boolean}
 */
FindElements.prototype.find = function(target) {
    return this.set.has(target)
};

/** 
 * Your FindElements object will be instantiated and called as such:
 * var obj = new FindElements(root)
 * var param_1 = obj.find(target)
 */