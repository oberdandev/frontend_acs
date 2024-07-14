export default function button( {  id, label, onButtonClick={} } ) {
    return (
        <button id={id} className="p-2 rounded-md text-white hover:text-sky-500 duration-300 font-bold border-box bg-sky-800" 
            onClick={onButtonClick}>
                {label}
        </button>
    );
}