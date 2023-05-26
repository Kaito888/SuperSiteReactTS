export default class Vector {
    values: number[];

    constructor(values: number[] = []) {
        this.values = [];
        values.forEach(elem => this.values.push(elem));
    }

    toString() {
        return `(${this.values.map(val => val.toString()).join(', ')})`;
    }

    module() {
        let m = 0;
        this.values.forEach(elem => m += elem ** 2);
        return Math.sqrt(m);
    }
}