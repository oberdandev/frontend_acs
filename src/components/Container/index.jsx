import styles from "./Container.module.css"

export default function Container( {id, children, className} ) {
    return (
        <main id={id} className={`${styles.container} ${className} bg-slate-200`}>
            {children}
        </main>
    );
}