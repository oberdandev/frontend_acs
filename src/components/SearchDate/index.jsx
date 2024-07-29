import { FaSearch } from "react-icons/fa";

export default function SearchDate({onChangeDataInicio, onChangeDataFim}) {
    return (
        <div className="p-2 border-2 border-slate-300 bg-slate-100 items-center rounded-lg">
            <table>
                <thead className="space-x-2 h-8 bg-slate-100 items-center border-b border-slate-300">
                    <tr>
                        <th className="pr-2 border-r border-slate-300"></th>
                        <th className="pr-2 border-r border-slate-300 items-center text-slate-600">Data Início</th>
                        <th className="pr-2 items-center text-slate-600">Data Fim</th>
                    </tr>
                </thead>
                <tbody className="space-x-2 h-8 bg-slate-100 items-center rounded-lg">
                    <tr>
                        <td className="border-r border-slate-300">
                            <FaSearch className="pr-2 items-center text-slate-600" size={24}/>
                        </td >
                        <td className="border-r border-slate-300">
                            <input id="data-inicio" type="date" className="bg-slate-100" onChange={onChangeDataInicio}/>
                        </td>
                        <td className=" border-r border-slate-300">
                            <input id="data-fim" type="date" className="bg-slate-100" onChange={onChangeDataFim}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}