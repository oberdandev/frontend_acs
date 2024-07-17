

const parserToApiPattern = (obj, microarea, localidade) => {
    return {
        profissionalID: 1,
        resSemanalID: null,
        micro_area: microarea || '',
        sub_local: localidade || '',
        data: obj.dataAtividade,
        quadras_trabalhadas: obj.quarteiroes,
        imoveis_inspec: obj.inspecionados,
        imoveis_fechados: obj.fechados,
        imoveis_positivo: obj.positivos,
        checklist: obj.checklists,
        monit_checklist_sim: obj.checkSim,
        monit_checklist_nao: obj.checkNao,
        monit_checklist_parcial: obj.checkParcial,
        nu_dep_inspec_A1: obj.depA1,
        nu_dep_inspec_A2: obj.depA2,
        nu_dep_inspec_B: obj.depB,
        nu_dep_inspec_C: obj.depC,
        nu_dep_inspec_D1: obj.depD1,
        nu_dep_inspec_D2: obj.depD2,
        nu_dep_inspec_E:  obj.depE,
        nu_dep_eliminados: obj.depEliminados,
        nu_dep_positivo:  obj.depPositivos,
        nu_encaminhados: obj.depTratamento,
    }
   
}

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

    const segParsed = parserToApiPattern(segData, microarea, sublocalidade);
    const terParsed = parserToApiPattern(terData, microarea, sublocalidade);
    const quaParsed = parserToApiPattern(quaData, microarea, sublocalidade);
    const quiParsed = parserToApiPattern(quiData, microarea, sublocalidade);
    const sexParsed = parserToApiPattern(sexData, microarea, sublocalidade);
    

    console.log(segData);
    console.log(terData);
    console.log(quaData);
    console.log(quiData);
    console.log(sexData);

    return true;
}