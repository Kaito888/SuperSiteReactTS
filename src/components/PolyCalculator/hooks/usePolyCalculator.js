import PolynomialCalculator from '../../../modules/PolyCalculator/PolynomialCalculator';

export default function usePolyCalculator(polyA, polyB) {
    const calc = new PolynomialCalculator();
    return (operand) => {
        if (polyA && polyB) {
            const a = calc.getPolynomial(polyA.current.value);
            const b = calc.getPolynomial(polyB.current.value);
            polyA.current.value = calc[operand](a, b).toString();
            polyB.current.value = '';
        }
    }
}