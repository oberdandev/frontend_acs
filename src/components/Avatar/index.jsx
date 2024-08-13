export default function Avatar( {imgSrc, size, elemBorder} ) {
    let border = '4px solid #d9d9d9';

    if (elemBorder) border = elemBorder;

    const styleSize = {
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        borderRadius: size,

        border: border
    }

    return (
        <img src={imgSrc} alt="Avatar" style={styleSize}></img>
    );
}