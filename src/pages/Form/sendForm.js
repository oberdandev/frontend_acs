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
    let returnValue = true;

    try {
        console.log("Enviando relatório...");
    
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

        semana.forEach(async (diaParsed) => {
            try {
                const response = await api.post('/resumodiario', diaParsed);
                if(response.status === 200) {
                    console.log("Relatório enviado com sucesso!");
                }   
            } catch (e) {
                console.log("Relatório não pôde ser enviado!");
                returnValue = false;
            }

            /*api.post('/resumodiario', diaParsed)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
                toast.error(error);
            })*/
        }).then(
            () => {
                console.log(returnValue)
            if (returnValue !== true)  {
                console.log("trpw")
                throw Error("Could not send form")
            }
            }
        )

        
    } catch (error) {
        console.log("enviando erro")
        throw Error(error);
    }
   

}