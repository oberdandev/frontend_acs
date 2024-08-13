import { MdOutlineDeleteForever } from "react-icons/md";
import { AiOutlineForm } from "react-icons/ai";
import { FaCheck, FaTrashAlt, FaEdit } from "react-icons/fa";
import { Tooltip } from 'react-tooltip'
import Tag from "../Tag";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SemanaItem( {id, semanaEpidemologica, dataInicio, dataFim, verificado, 
        enviado, sendSemana, deleteSemana } ) { 
    let navigate = useNavigate();

    const verificadoColor = (() => {
        if (verificado === true) return "bg-red-700 text-green-700"
        else return "bg-red-300 text-red-700"
    })();

    const enviadoColor = (() => {
        if (enviado === true) return "bg-red-700 text-green-700"
        else return "bg-red-300 text-red-700"
    })();

    const displayDataInicio = new Date(dataInicio).toLocaleDateString();
    const displayDataFim = new Date(dataFim).toLocaleDateString();

    function editSemana() {
        localStorage.setItem("editWeek", id);
        navigate('/form');
    }

    return (
        <tr className='min-w-full border-b border-slate-400'>
            <td className="p-1 pt-y border-r border-slate-400">{id}</td>
            <td className="p-1 pt-y border-r border-slate-400">{semanaEpidemologica}</td>
            <td className="p-1 pt-y border-r border-slate-400">{displayDataInicio} - {displayDataFim}</td>
            <td className="p-1 pt-y border-r border-slate-400">
                <Tag className={verificadoColor} text="Não"/>
            </td>
            <td className="p-1 pt-y border-r border-slate-400">
                <Tag className={enviadoColor} text="Não"/>
            </td>
            <td className="flex justify-center p-1 py-2 pr-4 pl-4">
                <FaCheck id="sendSemana" className="cursor-pointer hover:text-emerald-700 mr-4" size={24} onClick={sendSemana}/>
                <Tooltip anchorSelect="#sendSemana" place="top">
                    Enviar
                </Tooltip>
                <FaEdit id="editSemana" className="cursor-pointer hover:text-blue-700 mr-4" size={24} onClick={editSemana}/>
                <Tooltip anchorSelect="#editSemana" place="top">
                    Editar
                </Tooltip>
                <FaTrashAlt id="deleteSemana" className="cursor-pointer hover:text-red-700" size={24} onClick={deleteSemana}/>
                <Tooltip anchorSelect="#deleteSemana">
                    Deletar
                </Tooltip>
            </td>
        </tr>
    )
}