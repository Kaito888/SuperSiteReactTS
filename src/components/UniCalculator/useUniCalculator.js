import Calculator from "../../modules/UniCalculator/Calculator";

export default function useUniCalculator(refA, refB) {
    const calc = new Calculator();
    return (operand) => {
        if (refA && refB) {
            const a = calc.getEntity(refA.current.value);
            const b = calc.getEntity(refB.current.value);
            refA.current.value = calc[operand](a, b).toString();
            refB.current.value = '';
        }
    }
}