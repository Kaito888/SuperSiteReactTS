import React from "react";

import { EPAGES } from "../../App.tsx";

interface IHeaderProps {
    showComponent: Function,
}

const Header: React.FC<IHeaderProps> = (IHeaderProps) => {
    const tabs = [
        {
            name: EPAGES.UNICALCULATOR,
            text: 'Калькулятор'
        }, {
            name: EPAGES.POLYCALCULATOR,
            text: 'Калькулятор полиномов'
        }, {
            name: EPAGES.GRAPH_2D,
            text: 'Графики'
        }, {
            name: EPAGES.GRAPH_3D,
            text: '3Д сцена'
        },
    ];

    return (<div className='header'>
            {tabs.map((tab, index) => <button
                key={index}
                onClick={() => IHeaderProps.showComponent(tab.name)}>{tab.text}</button>)}
        </div>)
}

export default Header;