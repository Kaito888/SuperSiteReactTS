import { useRef, useState, useCallback } from "react";

import MyButton from "../../components/MyButton/MyButton.tsx";

import './Graph2DUI.css';

const Graph2DUI = ({ addFunction, delFunction, setColorFunction, changeZeroAndDerivative, deleteZeroAndDerevative, changeGraph, changeZero }) => {
    const [showPanel, setShowPanel] = useState(false);
    const showHidePanel = useCallback(() => { setShowPanel(!showPanel) }, [setShowPanel, showPanel]);

    let num = 0;
    const funcsInputs = useRef(null);
    const graphColor = useRef(null);
    const graphWidth = useRef(null);

    const addFunctionHandler = () => {
        //set function
        const input = document.createElement('input');
        input.dataset.num = num;
        input.placeholder = 'функция';
        input.addEventListener('keyup', (event) => keyUpHandler(event));
        //set function color
        const inputColor = document.createElement('input');
        inputColor.placeholder = 'цвет';
        inputColor.dataset.num = num;
        inputColor.addEventListener('keyup', (event) => keyUpSetColorHandler(event));
        //set zero
        const a = document.createElement('input');
        a.placeholder = 'a';
        a.dataset.num = num;
        a.addEventListener('keyup', (event) => keyUpSegmentAHandler(event));

        const b = document.createElement('input');
        b.placeholder = 'b';
        b.dataset.num = num;
        b.addEventListener('keyup', (event) => keyUpSegmentBHandler(event));

        //checkbox
        const needDerivative = document.createElement('input');
        needDerivative.type = 'checkbox';
        needDerivative.dataset.num = num;
        needDerivative.addEventListener('click', (event) => changeZeroAndDerivativeHandler(event));

        const button = document.createElement('button');
        button.innerHTML = 'Удалить';
        button.classList.add('deleteButton');
        button.addEventListener('click', () => {
            div.removeChild(input);
            div.removeChild(inputColor);
            div.removeChild(a);
            div.removeChild(b);
            div.removeChild(button);
            div.removeChild(needDerivative);
            div.removeChild(br);
            delFunction(input.dataset.num);
        });

        const br = document.createElement('br');

        const div = funcsInputs.current;
        div.appendChild(needDerivative);
        div.appendChild(input);
        div.appendChild(inputColor);
        div.appendChild(a);
        div.appendChild(b);
        div.appendChild(button);
        div.appendChild(br);
        num++;
    }

    const keyUpHandler = (event) => {
        try {
            let f;
            eval(`f = function(x){return ${event.target.value}}`);
            addFunction(f, event.target.dataset.num);
        } catch (e) { console.log(e); }
    }

    const keyUpSetColorHandler = (event) => {
        if (event.target.value) {
            setColorFunction(event.target.value, event.target.dataset.num);
        }
    }

    const changeZeroAndDerivativeHandler = (event) => {
        if (event.target.checked) {
            changeZeroAndDerivative(event.target.dataset.num);
        } else {
            deleteZeroAndDerevative(event.target.dataset.num);
        }
    }

    const changeGraphHandler = () => {
        const width = graphWidth.current.value - 0;
        const color = graphColor.current.value;
        if (width || color) {
            changeGraph(width, color);
        }
    }

    const keyUpSegmentAHandler = (event) => {
        if (event.target.value) {
            changeZero(event.target.dataset.num, event.target.value, 'a');
        }
    }

    const keyUpSegmentBHandler = (event) => {
        if (event.target.value) {
            changeZero(event.target.dataset.num, event.target.value, 'b');
        }
    }

    return (<div>
        <button onClick={() => showHidePanel()}>
            {showPanel ? "<=" : "=>"}
        </button>
        {showPanel && (<div className="graph2d-ui">
            <div>
                <input ref={graphColor} placeholder="цвет графика" />
                <input ref={graphWidth} placeholder="толщина графика" />
                <MyButton
                    text={'Поменять'}
                    onClick={() => changeGraphHandler()}
                />
            </div>
            <div>
                <MyButton
                    text={'Добавить график'}
                    onClick={() => addFunctionHandler()}
                />
                <div ref={funcsInputs}></div>
            </div>
        </div>
        )}
    </div>)

}

export default Graph2DUI;