import styles from "./Section.module.css"

export default function Section( {children, id, className} ) {
    return (
        <section id={id} className={`${styles.section} ${className}`}>
            {children}
        </section>
    );
}