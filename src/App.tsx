import React, { useState } from "react";

import Header from "./components/Header/Header.tsx";
import UniCalculator from "./components/UniCalculator/UniCalculator";
import PolyCalculator from "./components/PolyCalculator/PolyCalculator";
import Graph2D from "./components/Graph2D/Graph2D";
import Graph3D from "./components/Graph3D/Graph3D";

import "./App.css";

export enum EPAGES {
  UNICALCULATOR,
  POLYCALCULATOR,
  GRAPH_2D,
  GRAPH_3D
}

const App: React.FC = () => {
  const [showComponent, setShowComponent] = useState<EPAGES>(EPAGES.GRAPH_3D);

  return (
    <div className="App">
      <Header showComponent={setShowComponent} />
      {
        showComponent === EPAGES.UNICALCULATOR ? <UniCalculator /> :
          showComponent === EPAGES.POLYCALCULATOR ? <PolyCalculator /> :
            showComponent === EPAGES.GRAPH_2D ? <Graph2D /> :
              showComponent === EPAGES.GRAPH_3D ? <Graph3D /> :
                <></>
      }
    </div>
  );
}

export default App;