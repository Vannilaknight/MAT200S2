var bigInt = require('big-integer');

var numMessage = [];

for (var i = 0, len = message.length; i < len; i++) {
    numMessage.push(message.charCodeAt(i));
}

var RSA = {};

RSA.generate = function () {
    function modular_multiplicative_inverse(a, n) {
        var t = 0,
            nt = 1,
            r = n,
            nr = a % n;
        if (n < 0) {
            n = -n;
        }
        if (a < 0) {
            a = n - (-a % n);
        }
        while (nr !== 0) {
            var quot = (r / nr) | 0;
            var tmp = nt;
            nt = t - quot * nt;
            t = tmp;
            tmp = nr;
            nr = r - quot * nr;
            r = tmp;
        }
        if (r > 1) {
            return -1;
        }
        if (t < 0) {
            t += n;
        }
        return t;
    }

    function random_prime(min, max) {
        var p = Math.floor(Math.random() * ((max - 1) - min + 1)) + min;
        if (bigInt(p).isPrime() === true) {
            return p;
        } else {
            return random_prime(min, max);
        }
    }

    var p = random_prime(1, 255),
        q = random_prime(1, 255),
        n = p * q,
        t = (p - 1) * (q - 1),
        e = random_prime(1, t),
        d = modular_multiplicative_inverse(e, t);
    return {
        n: n,
        e: e,
        d: d
    };
};

RSA.encrypt = function (m, n, e) {
    var fullMessage = '';
    for(var x = 0; x < m.length; x++){
        fullMessage += String.fromCharCode(bigInt(m[x]).pow(e).mod(n));
    }
    return fullMessage;
};

RSA.decrypt = function (mEnc, d, n) {
    var decyptedNums = [];

    for (var k = 0, len = mEnc.length; k < len; k++) {
        decyptedNums.push(mEnc.charCodeAt(k));
    }

    var fullMessage = '';
    for(var x = 0; x < decyptedNums.length; x++){
        fullMessage += String.fromCharCode(bigInt(decyptedNums[x]).pow(d).mod(n));
    }

    return fullMessage;
};

module.exports = RSA;