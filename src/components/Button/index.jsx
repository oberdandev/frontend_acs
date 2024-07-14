export default function button( {  id, label, color, onButtonClick={} } ) {
    return (
        <button id={id} className={`p-2 rounded-md text-white hover:text-sky-500 duration-300 font-bold border-box bg-sky-800 
            ${color === "gray" && "bg-gray-700 hover:text-gray-500"}`}
            onClick={onButtonClick}>
                {label}
        </button>
    );
}