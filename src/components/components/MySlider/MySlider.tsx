import React from "react";
import useIDGenerator from "../../../hooks/useIDGenerator.ts";

interface IMySliderProps {
    type?: string,
    text: string,
    min: number,
    max: number,
    onInput(value: string): void,
    value: number
}

const MySlider: React.FC<IMySliderProps> = (IMySliderProps) => {
    const id = useIDGenerator('slider');
    return (
        <>
            <input
                type={IMySliderProps.type ? IMySliderProps.type : 'range'}
                min={IMySliderProps.min}
                max={IMySliderProps.max}
                id={id}
                defaultValue={IMySliderProps.value}
                onInput={(event) => IMySliderProps.onInput((event.target as HTMLInputElement).value)}
            />
            <label htmlFor={id}>{IMySliderProps.text}</label>
        </>
    )
}

export default MySlider;