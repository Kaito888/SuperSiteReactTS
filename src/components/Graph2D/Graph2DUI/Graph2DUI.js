import { useRef, useState, useCallback } from "react";

import GraphSettings from "./GraphSettings/GraphSettings";
import MyButton from "../../components/MyButton/MyButton";

import './Graph2DUI.css';

const Graph2DUI = ({ addFunction, delFunction, setColorFunction, changeZeroAndDerivative, deleteZeroAndDerevative, changeGraph, changeZero }) => {
    const [showPanel, setShowPanel] = useState(false);
    const showHidePanel = useCallback(() => { setShowPanel(!showPanel) }, [setShowPanel, showPanel]);

    let num = 0;
    const funcsInputs = useRef(null);
    const graphColor = useRef(null);
    const graphWidth = useRef(null);

    const addFunctionHandler = () => {
        const funcSettings = GraphSettings({ num, keyUpHandler, keyUpSetColorHandler, keyUpSegmentAHandler, keyUpSegmentBHandler, changeZeroAndDerivativeHandler, delFunction });
        console.log(funcSettings);
        funcsInputs.current.appendChild(funcSettings);
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