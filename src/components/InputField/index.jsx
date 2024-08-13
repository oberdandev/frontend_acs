import { useState } from "react";

export default function InputField( {className, id, type, label, inputSize, labelPos, inputOnChange} ) {
    const finalID = (() => {
        if (id === undefined) return label;
        else return id;
    })();

    const inputSizeClasses = (() => {
        if (inputSize === "sm")
            return "w-12";
        if (inputSize === "lg")
            return "w-96";
        else return "w-48";
    })();

    return (
        <div className={`flex p-1 z-0 w-3/4 mb-5 border-b border-slate-400 ${className}`}>
            <div className={`rounded w-full ${labelPos === "side" && 'flex justify-between w-3/4'}`}>
                <label className='block'>{label}</label>
                <input id={finalID} name={finalID} 
                    className={`pl-1 pr-1 text-left border rounded-md border-slate-400 ${inputSizeClasses} ${inputSize === "sm" && 'text-center'}`} 
                    type={type}
                    onChange={inputOnChange}/>
            </div>         
        </div>
    );
}
