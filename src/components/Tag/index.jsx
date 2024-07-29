export default function Tag({className, text}) {
    return (
        <span className={`px-2 py-1 rounded-lg h-8 text-white font-bold text-sm ${className}`}>{text}</span>
    )
}