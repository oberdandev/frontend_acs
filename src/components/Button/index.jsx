export default function button( {  id, className, label, color, onButtonClick={} } ) {
    return (
        <button id={id} className={`p-2 rounded-md text-white hover:text-sky-500 duration-300 font-bold border-box bg-sky-800 
            ${color === "gray" && "bg-slate-700 hover:text-slate-400"} disabled:text-slate-100 disabled:bg-slate-300 ${className}`}
            onClick={onButtonClick}>
                {label}
        </button>
    );
}