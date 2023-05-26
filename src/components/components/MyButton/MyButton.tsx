import React from "react";

interface IMyButtonProps {
    text: string,
    onClick(value: string | Event): void,
    value?: string | Event
}
const MyButton: React.FC<IMyButtonProps> = (IMyButtonProps) => {
    return (<button
        onClick={() => IMyButtonProps.onClick(IMyButtonProps.value ? IMyButtonProps.value : '')}
    >
        {IMyButtonProps.text}
    </button>);
}

export default MyButton;