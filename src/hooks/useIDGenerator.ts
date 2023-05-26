export default function useIDGenerator(text = 'object') {
    return `${text}-${Math.round(Math.random() * 1000000000)}`;
}