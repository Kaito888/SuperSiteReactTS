import { useRef } from "react";

import usePolyCalculatorPoint from "./hooks/usePolyCalculatorPoint";
import usePolyCalculator from "./hooks/usePolyCalculator";
import MyButton from "../components/MyButton/MyButton.tsx";

const PolyCalculator = () => {
    const polyA = useRef(null);
    const polyB = useRef(null);
    const polyPoint = useRef(null);

    const calc = usePolyCalculator(polyA, polyB);
    const calcPoint = usePolyCalculatorPoint(polyPoint, polyA);

    const operands = [
        {
            operand: 'add',
            text: '+',
        }, {
            operand: 'sub',
            text: '-',
        }, {
            operand: 'mult',
            text: '*',
        },
    ];

    return (<>
        <div>
            <input ref={polyA} placeholder="полином 1" />
            <input ref={polyB} placeholder="полином 2" />
            <textarea ref={polyPoint} placeholder="точка"></textarea>
        </div>
        {operands.map((op, index) =>
            <MyButton
                key={index}
                text={op.text}
                operand={op.operand}
                onClick={() => calc(op.operand)}
            />
        )}
        <button onClick={() => calcPoint()}>значение в ∙</button>
    </>)
}

export default PolyCalculator;