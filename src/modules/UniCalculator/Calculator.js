import RealCalculator from "./RealCalculator";
import Complex from "./Complex";
import ComplexCalculator from "./ComplexCalculator";
import Vector from "./Vector";
import VectorCalculator from "./VectorCalculator";
import Matrix from "./Matrix";
import MatrixCalculator from "./MatrixCalculator";

export default class Calculator {
    complex(re, im) {
        return new Complex(re, im);
    }

    vector(values) {
        return new Vector(values);
    }

    matrix(values) {
        return new Matrix(values);
    }

    getEntity(str) {
        str = str.replaceAll(' ', '').replaceAll('\n', '');
        if (str[0] === '(') {
            return this.getVector(str);
        }
        if (str[0] === '[') {
            return this.getMatrix(str);
        }
        return this.getComplex(str);
    }

    getComplex(str) {
        const arr = str.replaceAll(' ', '').replaceAll('\n', '').split('i');
        if (arr.length === 2) {
            if (arr[0]) {
                const ch = arr[0].substr(arr[0].length - 1);
                arr[0] = arr[0].slice(0, -1);
                if (arr[1] === '') arr[1] = '1';
                if (ch === '-') {
                    arr[1] = ch + arr[1];
                }
                return new Complex(arr[0] - 0, arr[1] - 0);
            }
            return new Complex(0, arr[1] - 0 === 0 ? 1 : arr[1] - 0);
        }
        return new Complex(arr[0] - 0, 0);
    }

    getVector(str) {
        if (str[1] !== '(' && str[1] !== '[') {
            const arr = str.replaceAll('(', '').replaceAll(')', '').split(',');
            const values = [];
            arr.forEach((elem, i) => values[i] = this.getComplex(elem));
            return new Vector(values);
        }
        str = str.replace(str[0], '').slice(0, -1);
        let count = 0;
        let start = 0;
        const arr = [];
        let i = 0;
        while (i < str.length) {
            if (str[i] === '(' || str[i] === '[') {
                count++;
            }
            if (str[i] === ')' || str[i] === ']') {
                count--;
            }
            if (count === 0) {
                arr.push(str.substr(start, i + 1 - start));
                start = i + 2;
                i++;
            }
            i++;
        }
        const values = [];
        arr.forEach(elem => values.push(this.getEntity(elem)));
        return new Vector(values);
    }

    getMatrix(str) {
        if (str[1] !== '(' && str[1] !== '[') {
            const arr = str.replaceAll('[', '').replaceAll(']', '').split('|');
            const valuesstr = [];
            arr.forEach((elem, i) => {
                valuesstr[i] = elem.split(';');
            })
            const values = [];
            valuesstr.forEach((str, i) => {
                values[i] = [];
                str.forEach(elem => values[i].push(this.getComplex(elem)));
            });
            return new Matrix(values);
        }
        str = str.replace(str[0], '').slice(0, -1);
        let count = 0;
        let start = 0;
        const arr = [];
        arr.push([]);
        let line = 0;
        let i = 0;
        while (i < str.length) {
            if (str[i] === '(' || str[i] === '[') {
                count++;
            }
            if (str[i] === ')' || str[i] === ']') {
                count--;
            }
            if (count === 0) {
                arr[line].push(str.substr(start, i + 1 - start));
                if (str[i + 1] === '|') {
                    arr.push([]);
                    line++;
                }
                start = i + 2;
                i++;
            }
            i++;
        }
        const values = [];
        arr.forEach((row, i) => {
            values[i] = [];
            row.forEach(elem => values[i].push(this.getEntity(elem)));
        })
        return new Matrix(values);
    }

    get(elem) {
        if (elem instanceof Matrix) return new MatrixCalculator(this.get(elem.values[0][0]));
        if (elem instanceof Vector) return new VectorCalculator(this.get(elem.values[0]));
        if (elem instanceof Complex) return new ComplexCalculator();
        return new RealCalculator();
    }

    add(a, b) {
        return this.get(a).add(a, b);
    }
    sub(a, b) {
        return this.get(a).sub(a, b);
    }
    mult(a, b) {
        return this.get(a).mult(a, b);
    }
    div(a, b) {
        return this.get(a).div(a, b);
    }
    prod(p, a) {
        return this.get(a).prod(p, a);
    }
    pow(a, p) {
        return this.get(a).pow(a, p);
    }

    zero(type, elem) {
        type = type ? type : elem ? elem.constructor.name : null;
        switch (type) {
            case 'Vector': return this.get(this.vector()).zero(elem.values.length);
            case 'Matrix': return this.get(this.matrix()).zero(elem.values.length);
            default: return this.get(this.complex()).zero();
        }
    }

    one(type, elem) {
        type = type ? type : elem ? elem.constructor.name : null;
        switch (type) {
            case 'Complex': return this.get(this.Complex()).one();
            case 'Vector': return this.get(this.Vector()).one(elem.values.length);
            case 'Matrix': return this.get(this.Matrix()).one(elem.values.length);
            default: return this.get().one();
        }
    }
}