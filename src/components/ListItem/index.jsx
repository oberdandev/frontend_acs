export default function ListItem( {label, value} ) {
    return (
        <div className='flex w-full rounded-md overflow-hidden'>
            <b className='text-wrap break-words w-28 min-w-28 p-2 border-slate-800 border-2 bg-slate-700 text-white'>{label}</b>
            <p className='p-2 border border-2 bg-slate-100 w-full'>{value}</p>
        </div>
    )
}