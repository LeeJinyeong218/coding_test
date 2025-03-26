var N = +require('fs').readFileSync('dev/stdin').toString().trim();

var primes = [];

for (var i = 2; i <= N; i++) {
    if (isPrime(i)) {
        primes.push(i);
    }
}

var L = primes.length;
var l = 0;
var r = 0;
var sum = primes[0];
var result = 0;
while (l < L && r < L) {
    while (r < L && sum < N) {
        r++;
        sum += primes[r];
    }

    if (sum === N) {
        result++;
    }
    sum -= primes[l];
    l++;
}

console.log(result);

function isPrime(n) {
    if (n < 2) {
        return false;
    }
    var limit = Math.floor(Math.sqrt(n));

    for (var i = 2; i <= limit; i++) {
        if (n % i === 0) {
            return false;
        }
    }

    return true;
}