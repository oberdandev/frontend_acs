import { useState } from "react"

export default function Modal({children, isOpen}) {
    if (isOpen === true) {
        return (
            <div className="absolute bg-white border border-slate-600">
                {children}
            </div>
        );
    }
    return null;
}