import MyCheckbox from "../../../components/MyCheckbox/MyCheckbox";
import MyInput from "../../../components/MyInput/MyInput";
import MyButton from "../../../components/MyButton/MyButton";

const GraphSettings = ({ num, keyUpHandler, keyUpSetColorHandler, keyUpSegmentAHandler, keyUpSegmentBHandler, changeZeroAndDerivativeHandler, delFunction }) => {
    function deleteDiv(event) {
        event.target.parentNode.innerHTML = '';
        delFunction(num);
    }

    const div = document.createElement('div');
    div.innerHTML = ``;

    return (<>
        <MyCheckbox
            onClick={(event) => changeZeroAndDerivativeHandler(event)}
            data-num={num}
        />
        <MyInput
            text={'функция'}
            onKeyUp={() => keyUpHandler()}
            data-num={num}
        />
        <MyInput
            text={'цвет'}
            onKeyUp={() => keyUpSetColorHandler()}
            data-num={num}
        />
        <MyInput
            text={'a'}
            onKeyUp={() => keyUpSegmentAHandler()}
            data-num={num}
        />
        <MyInput
            text={'b'}
            onKeyUp={() => keyUpSegmentBHandler()}
            data-num={num}
        />
        <MyButton
            text={'Удалить'}
            onClick={(event) => deleteDiv(event)}
            className={'deleteButton'}
        />
    </>);
}

export default GraphSettings;