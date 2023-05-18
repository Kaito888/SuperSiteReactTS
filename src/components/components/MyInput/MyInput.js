export default function MyInput({ type = 'text', onKeyUp, text }) {
    return (
        <input
            type={type}
            placeholder={text}
            onKeyUp={(event) => onKeyUp(event.target.value)}
        />
    )
}