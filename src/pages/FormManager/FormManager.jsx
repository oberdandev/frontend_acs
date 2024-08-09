import Container from "../../components/Container";
import Section from "../../components/Section";
import SemanaTable from "../../components/SemanaTable";
import SemanaItem from "../../components/SemanaItem";
import Button from "../../components/Button";
import { api } from "../../services/api";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";

function DeleteModal({children, isOpen}) {
    if (isOpen === true) {
        return (
            <div className="fixed w-full h-full" style={{backgroundColor: "rgb(0,0,0,.5)"}}>
                <div className="p-8 space-y-4 absolute left-1/4 right-1/4 top-1/4 bg-white border border-slate-600 rounded-lg text-center">
                    {children}
                </div>
            </div>
        );
    }
    return null;
}

function SearchDate({onChangeDataInicio, onChangeDataFim}) {
    return (
        <div className="p-2 border-2 border-slate-300 bg-slate-100 items-center rounded-lg">
            <table>
                <thead className="space-x-2 h-8 bg-slate-100 items-center border-b border-slate-300">
                    <tr>
                        <th className="pr-2 border-r border-slate-300"></th>
                        <th className="pr-2 border-r border-slate-300 items-center text-slate-600">Data Início</th>
                        <th className="pr-2 items-center text-slate-600">Data Fim</th>
                    </tr>
                </thead>
                <tbody className="space-x-2 h-8 bg-slate-100 items-center rounded-lg">
                    <tr>
                        <td className="border-r border-slate-300">
                            <FaSearch className="pr-2 items-center text-slate-600" size={24}/>
                        </td >
                        <td className="border-r border-slate-300">
                            <input id="data-inicio" type="date" className="bg-slate-100" onChange={onChangeDataInicio}/>
                        </td>
                        <td>
                            <input id="data-fim" type="date" className="bg-slate-100" onChange={onChangeDataFim}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default function PageFormManager() {
    const [list, setList] = useState([]);
    const [showList, setShowList] = useState(list);
    const [dataSearchInicio, setDataSearchInicio] = useState(undefined);
    const [dataSearchFim, setDataSearchFim] = useState(undefined);
    const [isModalOpen, setIsModalOpen] = useState(undefined);
    const [semanaDelete, setSemanaDelete] = useState(null);
    const [semana, setSemana] = useState(6); //Teste: Apague depois
    const [coSemanal, setCoSemanal] = useState(202406); //Teste: Apague depois
    const [dataInicio, setDataInicio] = useState(Date.parse("2024-8-18")); //Teste: Apague depois
    const [dataFim, setDataFim] = useState(Date.parse("2024-8-24")); //Teste: Apague depois

    useEffect(() => {
        async function fetchData() {
            const response = await api.get('/resumo_semanal');
            setList(response.data)
        }
        fetchData();
    }, []);

    useEffect(() => {
        setShowList(list);
        if (dataSearchInicio !== undefined && dataSearchFim !== undefined) {
            searchData();
        }
    
    }, [dataSearchInicio, dataSearchFim, list])

    function searchData() {
        const btnStopSearch = document.querySelector("#btn-stop-search");

        btnStopSearch.classList.remove("hidden");

        const newShowList = list.filter((semana) => {
            return dataSearchInicio <= semana.data_inicio && dataSearchFim >= semana.data_fim;
        })
        setShowList(newShowList);
    }

    function stopSearch() {
        const btnStopSearch = document.querySelector("#btn-stop-search");
        const iptDataInicio = document.querySelector("#data-inicio");
        const iptDataFim = document.querySelector("#data-fim");

        setDataSearchInicio(undefined);
        setDataSearchFim(undefined);
        iptDataInicio.value = undefined;
        iptDataFim.value = undefined;

        setShowList(list);

        btnStopSearch.classList.add("hidden");
    }

    function addWeek() {
        const newList = list.concat({
            co_semanal: coSemanal,
            data_ano: 2024,
            semana_epidomologica: semana,
            data_inicio: dataInicio,
            data_fim: dataFim,
            verificado: false,
            enviado: false
        });

        setList(newList);
        setSemana(semana + 1); //Teste: Apague depois
        setCoSemanal(coSemanal + 1); //Teste: Apague depois
        setDataInicio(dataInicio + 604800000); //Teste: Apague depois
        setDataFim(dataFim + 604800000); //Teste: Apague depois
    }

    function deleteSemana() {
        const newList = list.filter((semana => {
            return semana.co_semanal !== semanaDelete;
        }))

        setList(newList);
        setShowList(newList);
    }
    
    const weekListItems = showList.map(item =>
            <SemanaItem key={item.co_semanal} semanaEpidemologica={item.semana_epidomologica} dataAno={item.data_ano} 
                dataInicio={item.data_inicio} dataFim={item.data_fim}
                verificado={item.verificado} enviado={item.enviado}
                deleteSemana={() => {
                    setIsModalOpen(true);
                    setSemanaDelete(item.co_semanal);
                }}/>
        );

    console.log(list, showList);
    return (
            <div className='grid w-full min-h-screen h-full' style={{'gridTemplateRows': '7rem auto'}}>
                <Section className='p-4 px-12 flex justify-between shadow-xl relative items-center'>    
                    <div className='flex items-center'>
                        <SearchDate 
                            onChangeDataInicio={(e) => setDataSearchInicio(Date.parse(e.target.value.replace(/-/g, '\/')))}
                            onChangeDataFim={(e) => setDataSearchFim(Date.parse(e.target.value.replace(/-/g, '\/')))}
                            />
                        <Button icon={<FaX />} id="btn-stop-search" className="ml-4 hidden" onButtonClick={stopSearch}/>
                        <Tooltip anchorSelect="#btn-stop-search">Limpar Pesquisa</Tooltip>
                    </div>
                    <div className='px-8 flex space-x-8 items-center'>
                        <Button icon={<FaPlus className="mr-2" />} className="h-12" id="btnAddWeek" label="Nova Semana" onButtonClick={() => addWeek()} />
                    </div>
                </Section>
                <Container id='week-list'>
                    <SemanaTable>
                        {weekListItems}
                    </SemanaTable>
                    
                </Container>
                <DeleteModal isOpen={isModalOpen}>
                    <h1 className="text-xl border-b border-slate-400 mb-4">Deletar Semana?</h1>
                    <b>Atenção: Uma semana deletada não poderá ser recuperada!</b>
                    <div className="flex justify-center space-x-4">
                        <Button onButtonClick={() => {setIsModalOpen(false); setSemanaDelete(null)}} label='Cancelar'/>
                        <Button onButtonClick={() => {setIsModalOpen(false); deleteSemana()}} label='Deletar'/>
                    </div>     
                </DeleteModal>
            </div>
    );
}