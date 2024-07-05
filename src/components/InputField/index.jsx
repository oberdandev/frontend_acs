export default function InputField( {className, id, type, label, inputSize} ) {
    const finalID = (() => {
        if (id === undefined) return label;
        else return id;
    })();

    const inputSizeClasses = (() => {
        if (inputSize === "sm")
            return "w-12";
        else return "w-32";
    })();

    return (
        <div className={`flex p-2 z-0 w-3/4 mb-5 border-b border-slate-600 ${className}`}>
            <div className={`rounded w-full ${inputSize === "sm" && 'flex justify-between w-3/4'}`}>
                <label className='block'>{label}</label>
                <input id={finalID} name={finalID} className={`border border-black ${inputSizeClasses}`} type={type}/>
            </div>         
        </div>
    );
}