import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import { Tooltip } from 'react-tooltip'
import Tag from "../Tag";

export default function SemanaItem( {semanaEpidemologica, dataAno, verificado, enviado, editSemana, deleteSemana } ) {
    const verificadoColor = (() => {
        if (verificado === true) return "bg-red-700 text-green-700"
        else return "bg-red-300 text-red-700"
    })();

    const enviadoColor = (() => {
        if (enviado === true) return "bg-red-700 text-green-700"
        else return "bg-red-300 text-red-700"
    })();

    return (
        <tr className='min-w-full border-b border-slate-400'>
            <td className="p-1 pt-y border-r border-slate-400">{dataAno}-{semanaEpidemologica}</td>
            <td className="p-1 pt-y border-r border-slate-400"></td>
            <td className="p-1 pt-y border-r border-slate-400">
                <Tag className={verificadoColor} text="Não"/>
            </td>
            <td className="p-1 pt-y border-r border-slate-400">
                <Tag className={enviadoColor} text="Não"/>
            </td>
            <td className="flex justify-center p-1 py-2 pr-4 pl-4">
                <AiOutlineForm id="editSemana" className="cursor-pointer hover:text-blue-700 mr-2" size={24} onClick={editSemana}/>
                <Tooltip anchorSelect="#editSemana" place="top">
                    Editar
                </Tooltip>
                <MdOutlineDeleteForever id="deleteSemana" className="cursor-pointer hover:text-red-700" size={24} onClick={deleteSemana}/>
                <Tooltip anchorSelect="#deleteSemana">
                    Deletar
                </Tooltip>
            </td>
        </tr>
    )
}