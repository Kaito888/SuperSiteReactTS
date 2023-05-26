import Vector from "./Vector.ts";
import ComplexCalculator from "./ComplexCalculator.js";

export default class VectorCalculator extends ComplexCalculator {
    constructor(calc = new ComplexCalculator()) {
        super();
        this.calc = calc;
    }

    div() {
        return null;
    }

    add(a, b) {
        return new Vector(a.values.map((elem, i) => this.calc.add(elem, b.values[i])));
    }

    sub(a, b) {
        return new Vector(a.values.map((elem, i) => this.calc.sub(elem, b.values[i])));
    }

    mult(a, b) {
        const { mult, sub } = this.calc;
        return new Vector([
            sub(mult(a.values[1], b.values[2]), mult(a.values[2], b.values[1])),
            sub(mult(a.values[2], b.values[0]), mult(a.values[0], b.values[2])),
            sub(mult(a.values[0], b.values[1]), mult(a.values[1], b.values[0]))
        ]);
    }

    prod(p, a) {
        return new Vector(a.values.map(elem => this.calc.prod(p, elem)));
    }

    pow(a, p) {
        if (p === 0) {
            return this.one(3);
        }
        if(p===1) {
            return a;
        }
        return this.zero(3);
    }

    one(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(super.prod(1 / Math.sqrt(length), super.one()));
        }
        return new Vector(values);
    }

    zero(length) {
        const values = [];
        for (let i = 0; i < length; i++) {
            values.push(super.zero());
        }
        return new Vector(values);
    }
}