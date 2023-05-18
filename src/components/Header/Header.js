const Header = ({showComponent}) => {
    const tabs = [
        {
            name: 'UniCalculator',
            text: 'Калькулятор'
        }, {
            name: 'PolyCalculator',
            text: 'Калькулятор полиномов'
        }, {
            name: 'Graph2D',
            text: 'Графики'
        }, {
            name: 'Graph3D',
            text: '3Д сцена'
        },
    ];

    return (<div className='header'>
            {tabs.map((tab, index) => <button
                key={index}
                onClick={() => showComponent(tab.name)}>{tab.text}</button>)}
        </div>)
}

export default Header;