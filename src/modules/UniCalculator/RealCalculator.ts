export default class RealCalculator {
    add(a: number, b: number): number {
        return a + b;
    }

    sub(a: number, b: number): number {
        return a - b;
    }

    mult(a: number, b: number): number {
        return a * b;
    }

    div(a: number, b: number): number {
        return a / b;
    }

    prod(p: number, a: number): number {
        return p * a;
    }

    pow(a: number, p: number): number {
        let c = 1;
        for (let i = 0; i < p; i++) {
            c = a * c;
        }
        return c;
    }

    one(): number {
        return 1;
    }

    zero(): number {
        return 0;
    }
}