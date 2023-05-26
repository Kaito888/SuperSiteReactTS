import Calculator from "../UniCalculator/Calculator";
import Member from "./Member";

export default class Polynomial {
    poly: Member[];

    constructor(poly: Member[] = []) {
        this.poly = poly;
        this.poly.sort((a, b) => b.power - a.power);
    }

    getValue(x: Member): number {
        const calc = new Calculator();
        return this.poly.reduce(
            (s, elem) => calc.add(
                s,
                calc.prod(elem.value, calc.pow(x, elem.power))
            ),
            calc.zero(null, x)
        );
    }

    toString(): string {
        if (this.poly.length === 0) return '0';
        if (this.poly.length === 1) return this.poly[0].toString();
        return this.poly
            .map((elem, index) =>
                ` ${elem.value > 0 && index ? '+' : ''}${elem.toString()}`)
            .join('');
    }
}