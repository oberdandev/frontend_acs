let microarea = '';
let sublocalidade = '';

let quarteiroes = '';

let inspecionados = '';
let fechados = '';
let positivos = '';

let checklists = '';

let checkSim = '';
let checkNao = '';
let checkParcial = '';

let depA1 = '';
let depA2 = '';
let depB = '';
let depC = '';
let depD1 = '';
let depD2 = '';
let depE = '';

let depEliminados = '';
let depPositivos = '';
let depTratamento = '';

export const inserirValor = (value, dataField) => {
    console.log(dataField, value);
    switch (dataField) {
        case 'micro_area':
            microarea = value
            break;
        case 'sub_local':
            sublocalidade = value
            break;
        case 'quadras_trabalhadas':
            quarteiroes = value
            break;
        case 'imoveis_inspec':
            inspecionados = value
            break;
        case 'imoveis_fechados':
            fechados = value
            break;
        case 'imoveis_positivo':
            positivos = value
            break;
        case 'checklist':
            checklists = value
            break;
        case 'monit_checklist_sim':
            checkSim = value
            break;
        case 'monit_checklist_nao':
            checkNao = value
            break;
        case 'monit_checklist_parcial':
            checkParcial = value
            break;
        case 'nu_dep_inspec_A1':
            depA1 = value
            break;
        case 'nu_dep_inspec_A2':
            depA2 = value
            break;
        case 'nu_dep_inspec_B':
            depB = value
            break;
        case 'nu_dep_inspec_C':
            depC = value
            break;
        case 'nu_dep_inspec_D1':
            depD1 = value
            break;
        case 'nu_dep_inspec_D2':
            depD2 = value
            break;
        case 'nu_dep_inspec_E':
            depE = value
            break;
        case 'nu_dep_eliminados':
            depEliminados = value
            break;
        case 'nu_dep_positivo':
            depPositivos = value
            break;
        case 'nu_encaminhados':
            depTratamento = value
            break;
    }
};

export const checkForm = ( diaSemana ) => {
    //@TODO Exibir mensagens de erro mais significativas

    console.log(microarea);

    if (microarea.trim().length !== 0 && !isNaN(microarea) &&
        sublocalidade.trim().length !== 0 && 
        quarteiroes.trim().length !== 0 && !isNaN(quarteiroes) &&
        inspecionados.trim().length !== 0 && !isNaN(inspecionados) &&
        fechados.trim().length !== 0 && !isNaN(fechados) &&
        positivos.trim().length !== 0 && !isNaN(positivos) &&
        checklists.trim().length !== 0 && !isNaN(checklists) &&
        checkSim.trim().length !== 0 && !isNaN(checkSim) &&
        checkNao.trim().length !== 0 && !isNaN(checkNao) &&
        checkParcial.trim().length !== 0 && !isNaN(checkParcial) &&
        depA1.trim().length !== 0 && !isNaN(depA1) &&
        depA2.trim().length !== 0 && !isNaN(depA2) &&
        depB.trim().length !== 0 && !isNaN(depB) &&
        depC.trim().length !== 0 && !isNaN(depC) &&
        depD1.trim().length !== 0 && !isNaN(depD1) &&
        depD2.trim().length !== 0 && !isNaN(depD2) &&
        depE.trim().length !== 0 && !isNaN(depE) &&
        depEliminados.trim().length !== 0 && !isNaN(depEliminados) &&
        depPositivos.trim().length !== 0 && !isNaN(depPositivos) &&
        depTratamento.trim().length !== 0 && !isNaN(depTratamento)
    ) {
        const formDia = {
            microarea: microarea,
            sublocalidade: sublocalidade,
            quarteiroes: quarteiroes,
            inspecionados: inspecionados,
            fechados: fechados,
            positivos: positivos,
            checklists: checklists,
            checkSim: checkSim,
            checkNao: checkNao,
            checkParcial: checkParcial,
            depA1: depA1,
            depA2: depA2,
            depB: depB,
            depC: depC,
            depD1: depD1,
            depD2: depD2,
            depE: depE,
            depEliminados: depEliminados,
            depPositivos: depPositivos,
            depTratamento: depTratamento,
        }

        microarea = "";
        sublocalidade = "";
        quarteiroes = "";
        inspecionados = "";
        fechados = "";
        positivos = "";
        checklists = "";
        checkSim = "";
        checkNao = "";
        checkParcial = "";
        depA1 = "";
        depA2 = "";
        depB = "";
        depC = "";
        depD1 = "";
        depD2 = "";
        depE = "";
        depEliminados = "";
        depPositivos = "";
        depTratamento = "";

        localStorage.setItem(diaSemana, JSON.stringify(formDia));

        return true;
    }

    console.error("O formulário não foi preenchido corretamente");

    return false;
};