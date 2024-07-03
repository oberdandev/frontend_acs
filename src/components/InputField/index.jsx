import styles from './InputField.module.css'

export default function InputField( {type, label} ) {
    return (
        <div className={`${styles.inputField} flex space-x-2`}>
            <p>{label}</p>
            <input className='bg-slate-100 rounded-sm w-full px-2 border border-solid border-black' type={type} />
        </div>
    );
}