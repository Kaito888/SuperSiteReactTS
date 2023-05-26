import Calculator from '../../../modules/UniCalculator/Calculator';
import PolynomialCalculator from '../../../modules/PolyCalculator/PolynomialCalculator.ts';

export default function usePolyCalculatorPoint(polyPoint, polyA) {
    const calc = new PolynomialCalculator();
    const pointCalc = new Calculator();
    return () => {
        if (polyPoint && polyA) {
            const a = calc.getPolynomial(polyA.current.value);
            const x = pointCalc.getEntity(polyPoint.current.value);

            polyPoint.current.value = a.getValue(x).toString();
        }
    }
}