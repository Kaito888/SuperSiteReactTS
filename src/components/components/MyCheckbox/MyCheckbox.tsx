import React from "react";
import useIDGenerator from "../../../hooks/useIDGenerator.ts";

interface IMyCheckboxProps {
  text?: string,
  checked?: boolean,
  onClick(checked: boolean): void
}

const MyCheckbox: React.FC<IMyCheckboxProps> = (IMyCheckboxProps) => {
  const id = useIDGenerator('checkbox');
  return (
    <>
      <input
        type="checkbox"
        id={id}
        defaultChecked={IMyCheckboxProps.checked}
        onClick={(event) => IMyCheckboxProps.onClick((event.target as HTMLInputElement).checked)}
      />
      <label htmlFor={id}>{IMyCheckboxProps.text}</label>
    </>
  );
}

export default MyCheckbox;