import styles from "./Container.module.css"

export default function Container( {children, className} ) {
    return (
        <main className={`${styles.container} ${className} bg-slate-100`}>
            {children}
        </main>
    );
}