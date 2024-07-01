import styles from "./Avatar.module.css"

export default function Avatar( {imgSrc, imgAlt, size} ) {
    const styleSize = {
        'width': size,
        'height': size,
        'border-radius': size
    }

    return (
        <img src={imgSrc} className={styles.avatar} alt={imgAlt} style={styleSize}></img>
    );
}