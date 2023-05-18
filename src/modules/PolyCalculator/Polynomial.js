import Calculator from "../UniCalculator/Calculator";

export default class Polynomial {
    constructor(poly = []) {
        this.poly = poly;
        this.poly.sort((a, b) => b.power - a.power);
    }

    getValue(x) {
        const calc = new Calculator();
        return this.poly.reduce(
            (s, elem) => calc.add(
                s,
                calc.prod(elem.value, calc.pow(x, elem.power))
            ),
            calc.zero(null, x)
        );
    }

    toString() {
        if (this.poly.length === 0) return '0';
        if (this.poly.length === 1) return this.poly[0].toString();
        return this.poly
            .map((elem, index) =>
                ` ${elem.value > 0 && index ? '+' : ''}${elem.toString()}`)
            .join('');
    }
}