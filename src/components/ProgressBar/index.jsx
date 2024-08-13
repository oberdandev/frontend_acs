import { useState } from "react"

export default function ProgressBar( { progress, steps, className } ) {
    const progressWidth = 100 / steps.length * (progress + 1);

    let i = 0;
    const stepsElements = steps.map((step) => {
        let classList = "duration-500 font-bold text-slate-600";
        if (progress > i) {
            classList = classList.concat(" text-sky-800").replace("text-slate-600", "");
        }
        else if (progress === i) {
            classList = classList.concat(" text-sky-500").replace("text-slate-600", "");
        }

        i++;
        return (
            <b key={i} className={classList}>{step}</b>
        )
    })

    return (
        <div className={`rounded-lg shadow-md p-2 pr-4 pl-4 ${className}`}>
            <div className="flex justify-around">
                {stepsElements}
            </div>
            
            <div className="bg-slate-600 rounded-lg h-4 overflow-hidden">
                <div className="bg-sky-700 h-4 duration-500" style={{width: progressWidth + "%"}}>

                </div>
            </div>
        </div>
    )
}