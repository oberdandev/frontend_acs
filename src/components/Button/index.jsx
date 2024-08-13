export default function button( {  id, className, icon, label, color, onButtonClick } ) {
    return (
        <button id={id} className={`flex items-center p-2 rounded-md text-white duration-300 font-bold border-box bg-sky-700
            hover:text-sky-500 hover:bg-sky-800 ${color === "gray" && "bg-slate-700 hover:text-slate-400 hover:bg-slate-800"} 
            disabled:text-slate-100 disabled:bg-slate-300 space-x-4 ${className}`}
            onClick={onButtonClick}>
                {icon}{label}
        </button>
    );
}