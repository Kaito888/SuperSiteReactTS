export default class RealCalculator {
    add(a, b) {
        return a + b;
    }

    sub(a, b) {
        return a - b;
    }

    mult(a, b) {
        return a * b;
    }

    div(a, b) {
        return a / b;
    }

    prod(p, a) {
        return p * a;
    }

    pow(a, p) {
        let c = 1;
        for (let i = 0; i < p; i++) {
            c = a * c;
        }
        return c;
    }

    one() {
        return 1;
    }

    zero() {
        return 0;
    }
}