export default function MyButton({ text, onClick, value }) {
    return (
        <button
            onClick={() => onClick(value)}
        >
            {text}
        </button>
    )
}