import { useState, useCallback } from "react";
import useFigureNames from "./useFigureNames.ts";
import useCheckBoxesOptions from "./useCheckBoxesOptions.ts";

import MyCheckbox from "../../components/MyCheckbox/MyCheckbox.tsx";
import MyInput from "../../components/MyInput/MyInput.tsx";
import MySlider from "../../components/MySlider/MySlider.tsx";
import MyButton from "../../components/MyButton/MyButton.tsx";

import "./Graph3DUI.css";

const Graph3DUI = ({
  scene,
  show,
  showHidePoints,
  showHideEdges,
  showHidePolygons,
  canPrintShadows,
  canPrintShadowsHandler,
  canAnimate,
  canDoAnimationHandler,
  figureChangeHandler,
  clearScene,
  figureColorChangeHandler,
  figureCountChangeHandler,
}) => {
  const [showPanel, setShowPanel] = useState(false);
  const showHidePanel = useCallback(() => {
    setShowPanel(!showPanel);
  }, [setShowPanel, showPanel]);
  const figureNames = useFigureNames();

  const checkBoxesOptions = useCheckBoxesOptions({
    show,
    canPrintShadows,
    canAnimate,
    showHidePoints,
    showHideEdges,
    showHidePolygons,
    canPrintShadowsHandler,
    canDoAnimationHandler,
  });

  return (
    <div>
      <button onClick={() => showHidePanel()}>{showPanel ? "<=" : "=>"}</button>
      {showPanel && (
        <div className="graph3d-ui">
          <div>
            {checkBoxesOptions.map(({ text, checked, callback }, index) => {
              return (
                <MyCheckbox
                  key={index}
                  text={text}
                  checked={checked}
                  onClick={callback}
                />
              );
            })}
          </div>
          <p>
            <MyButton text={"Очистить сцену"} onClick={() => clearScene()} />
          </p>
          <p>
            <select
              className="dropdown"
              onChange={(event) => figureChangeHandler(event.target.value)}
            >
              {figureNames.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </p>
          <div>
            <MyInput
              text={"цвет"}
              onKeyUp={(value) => figureColorChangeHandler(value)}
            />
            <MySlider
              text={"детализация"}
              min={3}
              max={100}
              onInput={(value) => figureCountChangeHandler(value)}
              value={scene[0]?.count}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Graph3DUI;
