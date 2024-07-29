import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";

export default function SemanaItem( {semanaEpidemologica, verificado, enviado, editSemana, deleteSemana } ) {
    const verificadoColor = (() => {
        if (verificado === true) return "bg-green-700"
        else return "bg-red-700"
    })();

    const enviadoColor = (() => {
        if (enviado === true) return "bg-green-700"
        else return "bg-red-700"
    })();

    return (
        <tr className='min-w-full border-b border-slate-400'>
            <td className="p-1 pt-2 border-r border-slate-400">{semanaEpidemologica}</td>
            <td className="p-1 pt-2 border-r border-slate-400"></td>
            <td className="p-1 pt-2 border-r border-slate-400">
                <span className={`inline-block w-6 h-6 rounded-full ${verificadoColor}`} ></span>
            </td>
            <td className="p-1 pt-2 border-r border-slate-400">
                <span className={`inline-block w-6 h-6 rounded-full ${enviadoColor}`} ></span>
            </td>
            <td className="flex space-x-4 p-1 pt-2 pr-4 pl-4">
                <AiOutlineForm className="cursor-pointer hover:text-blue-700" size={24} onClick={editSemana}/>
                <MdOutlineDeleteForever className="cursor-pointer hover:text-red-700" size={24} onClick={deleteSemana}/>
            </td>
        </tr>
    )
}