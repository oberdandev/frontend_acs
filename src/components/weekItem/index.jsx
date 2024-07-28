export default function WeekItem( {semanaEpidemologica} ) {
    return (
        <li className='flex w-full rounded-md overflow-hidden'>
            <b className='text-wrap break-words w-64 min-w-28 p-2 border-slate-800 border-2 bg-slate-700 text-white'>Semana Epidemológica {semanaEpidemologica}</b>
            <p className='p-2 border border-2 bg-slate-100 w-full'></p>
        </li>
    )
}