export default function SemanaTable({children}) {
    return (
        <div className="text-center relative bg-white rounded-xl border border-slate-400 shadow-lg overflow-hidden">
            <table className="w-full table-auto">
                <thead className="relative border-b border-slate-400 shadow-lg">
                    <tr>
                        <th className="p-1 pt-2 border-r border-slate-400">SE</th>
                        <th className="p-1 pt-2 border-r border-slate-400">Data (Domingo)</th>
                        <th className="p-1 pt-2 border-r border-slate-400">Verificado</th>
                        <th className="p-1 pt-2 border-r border-slate-400">Enviado</th>
                        <th className="p-1 pt-2 border-slate-400">Ações</th>
                    </tr>
                </thead>
                <tbody className="w-full bg-slate-100">
                    {children}
                </tbody>
            </table>
        </div>
        
    )
}