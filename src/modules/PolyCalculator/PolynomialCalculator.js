import Complex from "../UniCalculator/Complex";
import Member from "./Member";
import Polynomial from "./Polynomial";
import Calculator from "../../modules/UniCalculator/Calculator";

export default class PolynomialCalculator {
    polynomial(members) {
        return new Polynomial(members);
    }

    getPolynomial(str) {
        str = str.replaceAll(' ', '').replaceAll('\n', '');

        if (str) {
            const arr = str.split('+');
            const arr2 = arr.map(str => str.split('-'));

            for (let i = 0; i < arr2.length; i++) {
                if (arr2[i].length > 1) {
                    arr2[i] = arr2[i].map(
                        (elem, index) => index ? `-${elem}` : elem);
                }
            }

            const arr3 = arr2.reduce((s, arr) => s.concat(arr), []);
            return this.polynomial(arr3.map(elem => this.getMember(elem)));
        }
        return this.polynomial();
    }

    getMember(str) {
        const arr = str.split('x');
        if (arr.length === 1) {
            return new Member(arr[0] - 0);
        }
        arr[0] = arr[0].replace('*', '');
        arr[1] = arr[1].replace('^', '');
        if (arr[0] === '') arr[0] = 1;
        if (arr[0] === '-') arr[0] = -1;
        return arr[1] ?
            new Member(arr[0] - 0, arr[1] - 0) :
            new Member(arr[0] - 0, 1);
    }

    add(a, b) {
        const calc = new Calculator();
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(calc.add(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(elemB.value, elemB.power));
            }
        });
        return this.polynomial(members);
    }

    sub(a, b) {
        const calc = new Calculator();
        const members = [];
        a.poly.forEach(elemA => {
            const member = b.poly.find(elemB => elemB.power === elemA.power);
            if (member) {
                members.push(new Member(calc.sub(elemA.value, member.value), elemA.power));
            } else {
                members.push(new Member(elemA.value, elemA.power));
            }
        });
        b.poly.forEach(elemB => {
            if (!members.find(elem => elem.power === elemB.power)) {
                members.push(new Member(-elemB.value, elemB.power));
            }
        });
        return this.polynomial(members);
    }

    mult(a, b) {
        const calc = new Calculator();
        let polynomial = this.polynomial();
        a.poly.forEach(elemA => {
            const members = [];
            b.poly.forEach(elemB => {
                members.push(new Member(calc.mult(new Complex(elemA.value), new Complex(elemB.value)), elemA.power + elemB.power));
            });
            polynomial = this.add(polynomial, this.polynomial(members));
        });
        return polynomial;
    }
}