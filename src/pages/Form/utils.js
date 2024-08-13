let microarea = '';
let sublocalidade = '';

let dataAtividade = '';
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
    switch (dataField) {
        case 'microarea':
            microarea = value
            break;
        case 'sublocalidade':
            sublocalidade = value
            break;
        case 'dataAtividade':
            dataAtividade = value
            break;
        case 'quarteiroes':
            quarteiroes = value
            break;
        case 'inspecionados':
            inspecionados = value
            break;
        case 'fechados':
            fechados = value
            break;
        case 'positivos':
            positivos = value
            break;
        case 'checklists':
            checklists = value
            break;
        case 'checkSim':
            checkSim = value
            break;
        case 'checkNao':
            checkNao = value
            break;
        case 'checkParcial':
            checkParcial = value
            break;
        case 'depA1':
            depA1 = value
            break;
        case 'depA2':
            depA2 = value
            break;
        case 'depB':
            depB = value
            break;
        case 'depC':
            depC = value
            break;
        case 'depD1':
            depD1 = value
            break;
        case 'depD2':
            depD2 = value
            break;
        case 'depE':
            depE = value
            break;
        case 'depEliminados':
            depEliminados = value
            break;
        case 'depPositivos':
            depPositivos = value
            break;
        case 'depTratamento':
            depTratamento = value
            break;
    }
};

export const checkForm = ( diaSemana ) => {
    //@TODO Exibir mensagens de erro mais significativas

    if (microarea.trim().length !== 0 && 
        sublocalidade.trim().length !== 0 && 
        dataAtividade.trim().length !== 0 && 
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
            dataAtividade: dataAtividade,
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
        dataAtividade = "";
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

    return false;
};