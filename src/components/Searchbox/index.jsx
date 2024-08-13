import { FaSearch } from "react-icons/fa";

export default function Searchbox() {
    return (
        <div className="p-4 space-x-2 flex h-8 border-2 border-slate-300 bg-slate-100 items-center rounded-lg">
            <FaSearch className="pr-2 border-r border-slate-300 items-center text-slate-600" size={24}/>
            <input type="date" className="bg-slate-100"/>
        </div>
    );
}