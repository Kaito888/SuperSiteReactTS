import useIDGenerator from "../../../hooks/useIDGenerator";

export default function MyCheckbox({ text, checked, onClick }) {
  const id = useIDGenerator('checkbox');
  return (
    <>
      <input
        type="checkbox"
        id={id}
        defaultChecked={checked}
        onClick={(event) => onClick(event.target.checked)}
      />
      <label htmlFor={id}>{text}</label>
    </>
  )
}