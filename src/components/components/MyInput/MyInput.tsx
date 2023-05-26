import React from "react"

interface IMyInputProps {
    type?: string,
    onKeyUp(value: string): void;
    text: string
}

const MyInput: React.FC<IMyInputProps> = (IMyInputProps) => {
    return (
        <input
            type={IMyInputProps.type ? IMyInputProps.type : 'text'}
            placeholder={IMyInputProps.text}
            onKeyUp={(event) => IMyInputProps.onKeyUp((event.target as HTMLInputElement).value)}
        />
    )
}

export default MyInput;