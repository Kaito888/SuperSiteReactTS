export default class Matrix {
    values: Array<Array<number>>;

    constructor(values = [[]]) {
        this.values = [];
        values.forEach((arr, i) => {
            this.values[i] = [];
            arr.forEach(elem => this.values[i].push(elem));
        });
    }

    toString() {
        return `[${this.values.map((arr) => arr.map(val => val.toString()).join('; ')).join(' |\n')}]`;
    }

    module() {
        const val  = this.values;
        return (val.length === 1) ? 
                val[0] :
            (val.length === 2) ? 
                val[0][0] * val[1][1] - val[1][0] * val[0][1] :
            (val.length === 3) ? 
                val[0][0] * (val[1][1] * val[2][2] - val[2][1] * val[1][2])
                - val[0][1] * (val[1][0] * val[2][2] - val[2][0] * val[1][2]) 
                + val[0][2] * (val[1][0] * val[2][1] - val[2][0] * val[1][1]) 
            : null;
    }
}