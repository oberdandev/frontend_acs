import { api } from "../../services/api";

const parserToApiPattern = (obj, profissionalID) => {
    return {
        profissionalID: profissionalID,
        resSemanalID: localStorage.getItem('editWeek'),
        micro_area: obj.microarea,
        sub_local: obj.sublocalidade,
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

        const verify = await api.get(`/resumodiario/${localStorage.getItem('editWeek')}`);
        console.log("sendForm.js - line 50:", verify);

        if (verify.data.length !== 0) {
            // Resumos diários encontrados, ativando modo de atualização
            let i = 0;
            for (const oldDia of verify.data) {
                const response = await api.patch(`/resumodiario/${oldDia.id}`, semana[i]);
                console.log(response)
                if (response.status >= 500 && response.status < 599) {
                    throw Error(response.toString())
                }
                i++;
            }
        } else {
            for (const diaParsed of semana) {
                const response = await api.post('/resumodiario', diaParsed);
                console.log(response)
                if (response.status !== 201) {
                    throw Error(response.toString())
                }
            }
        }
        
    } catch (e) {
        throw Error(e);
    }
   

}