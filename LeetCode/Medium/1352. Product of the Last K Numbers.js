
var ProductOfNumbers = function() {
    this.dots = [1];
};

/** 
 * @param {number} num
 * @return {void}
 */
ProductOfNumbers.prototype.add = function(num) {
    if (num === 0) {
        this.dots = [1];
    } else {
        this.dots.push(this.dots[this.dots.length - 1] * num)
    }
};

/** 
 * @param {number} k
 * @return {number}
 */
ProductOfNumbers.prototype.getProduct = function(k) {
    const l = this.dots.length;
    return k < l ? this.dots[l - 1] / this.dots[l - k - 1] : 0;
};

/** 
 * Your ProductOfNumbers object will be instantiated and called as such:
 * var obj = new ProductOfNumbers()
 * obj.add(num)
 * var param_2 = obj.getProduct(k)
 */