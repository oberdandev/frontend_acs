import { api } from "../../services/api";

export const parserToApiPattern = (obj, profissionalID) => {
    return {
        profissionalID: profissionalID,
        resSemanalID: localStorage.getItem('editWeek'),
        micro_area: obj.microarea,
        sub_local: obj.sublocalidade,
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
        nu_encaminhados: obj.depTratamento
    }
}

export const sendForm = async (profissionalID) => {
    try {
        console.log("Enviando relatório!");
    
        const segData = JSON.parse(localStorage.getItem("form-seg"));
        const terData = JSON.parse(localStorage.getItem("form-ter"));
        const quaData = JSON.parse(localStorage.getItem("form-qua"));
        const quiData = JSON.parse(localStorage.getItem("form-qui"));
        const sexData = JSON.parse(localStorage.getItem("form-sex"));
    
        const segParsed = parserToApiPattern(segData, profissionalID);
        const terParsed = parserToApiPattern(terData, profissionalID);
        const quaParsed = parserToApiPattern(quaData, profissionalID);
        const quiParsed = parserToApiPattern(quiData, profissionalID);
        const sexParsed = parserToApiPattern(sexData, profissionalID);
        
        const semana = [segParsed, terParsed, quaParsed, quiParsed, sexParsed];

        const response = await api.put(`/resumodiario/`, semana);
        return response;
    } catch (e) {
        throw Error(e);
    }
   

}