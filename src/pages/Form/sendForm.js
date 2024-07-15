export const sendForm = (microarea, sublocalidade) => {
    console.log("Relatório enviado!");

    if (microarea.length === 0 || sublocalidade.length === 0) {
        alert("Microárea ou Sublocalidade não foram preenchidos!");
        return false;
    }

    console.log("microarea: " + microarea);
    console.log("sublocalidade: " + sublocalidade);

    const segData = JSON.parse(localStorage.getItem("form-seg"));
    const terData = JSON.parse(localStorage.getItem("form-ter"));
    const quaData = JSON.parse(localStorage.getItem("form-qua"));
    const quiData = JSON.parse(localStorage.getItem("form-qui"));
    const sexData = JSON.parse(localStorage.getItem("form-sex"));

    console.log(segData);
    console.log(terData);
    console.log(quaData);
    console.log(quiData);
    console.log(sexData);

    return true;
}