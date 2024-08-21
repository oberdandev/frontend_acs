import Container from "../../components/Container";
import Section from "../../components/Section";
import SemanaTable from "../../components/SemanaTable";
import SemanaItem from "../../components/SemanaItem";
import Button from "../../components/Button";
import { api, baseUrl } from "../../services/api";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";
import { useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import axios from "axios";
import { Label, Select } from "flowbite-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function YearOptionForWeekResume() {
    // IMPORTANTE
    return (
        <option value={2024}>2024</option>
    )
}

function WeekOptionForWeekResume() {
    // IMPORTANTE
    const semanas = [];

    for (let i = 1; i <= 52; i++) {
        semanas.push(i);
    }

    return semanas.map((semana) =>
        <option key={semana} value={semana}>{semana}</option>
    )
}

function Modal({children, isOpen}) {
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
    const { user } = useAuth();
    let navigate = useNavigate();

    const [list, setList] = useState([]);
    const [showList, setShowList] = useState(list);
    const [dataSearchInicio, setDataSearchInicio] = useState(undefined);
    const [dataSearchFim, setDataSearchFim] = useState(undefined);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(undefined);
    const [isAddModalOpen, setIsAddModalOpen] = useState(undefined);
    const [semanaDelete, setSemanaDelete] = useState(null);

    const { register, handleSubmit, formState: { errors }} = useForm();

    useEffect(() => {
        // Inicializa lista de semanas
        async function fetchData() {
            try {
                const response = await api.get(`/resumosemanal/profissional/${user.profissional.id}`);
                setList(response.data);
            } catch (e) {
                console.log(e);
                toast.error("Falha na exibição de formulários. Tente novamente mais tarde.")
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        // Atualiza lista de semanas para exibição
        setShowList(list);
        if (dataSearchInicio !== undefined && dataSearchFim !== undefined) {
            searchData();
        }
    
    }, [dataSearchInicio, dataSearchFim, list])

    function searchData() {
        const btnStopSearch = document.querySelector("#btn-stop-search");

        btnStopSearch.classList.remove("hidden");

        const newShowList = list.filter((semana) => {
            return dataSearchInicio <= Date.parse(semana.semanaEpidemiologica.dt_inicio) 
                && dataSearchFim >= Date.parse(semana.semanaEpidemiologica.dt_fim);
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

    async function deleteSemana() {
        try {
            const responseDia = await api.delete(`/resumodiario/${semanaDelete}`);
            console.log(responseDia);
            const responseSemana = await api.delete(`/resumosemanal/${semanaDelete}`);
            console.log(responseSemana);
            toast.success('Semana deletada com sucesso');

            const newList = list.filter((semana => {
                return semana.id !== semanaDelete;
            }))
            setList(newList);
            setShowList(newList);

        } catch (e) {
            console.log(e.message);

            const message = e.response?.data?.message || 'Erro ao deletar semana. Tente novamente.';
            toast.error(message);
        }
    }

    async function addSemana(data) {
        const semanaEpidemologica = data.ano + ("0" + data.semana).slice(-2);
        let semanaID = 0

        try {
            const response = await axios.post(baseUrl + '/resumosemanal', {
                semana_epidemiologica: semanaEpidemologica,
                profissionalID: user.profissional.id
            })
            localStorage.setItem("editWeek", response.data.id);
            navigate("/form");
        } catch(e) {
            console.log(e.message);

            const message = e.response?.data?.message || 'Erro ao adicionar semana. Tente novamente.';
            toast.error(message);
        }
    }

    // Integrar com semana epidemiologica para obter as datas
    const weekListItems = showList.map(item =>
        <SemanaItem key={item.id} id={item.id} semanaEpidemologica={item.semana_epidemiologica} 
            dataInicio={item.semanaEpidemiologica.dt_inicio} dataFim={item.semanaEpidemiologica.dt_fim}
            verificado={item.verificado} enviado={item.enviado}
            deleteSemana={() => {
                setIsDeleteModalOpen(true);
                setSemanaDelete(item.id);
            }}/>
    );

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
                        <Button icon={<FaPlus className="mr-2" />} className="h-12" id="btnAddWeek" label="Nova Semana" 
                            onButtonClick={() => setIsAddModalOpen(true)} />
                    </div>
                </Section>
                <Container id='week-list'>
                    <SemanaTable>
                        {weekListItems}
                    </SemanaTable>
                    
                </Container>
                <Modal isOpen={isDeleteModalOpen}>
                    <h1 className="text-xl border-b border-slate-400 mb-4">Deletar Semana?</h1>
                    <b>Atenção: Uma semana deletada não poderá ser recuperada!</b>
                    <div className="flex justify-center space-x-4">
                        <Button onButtonClick={() => {setIsDeleteModalOpen(false); setSemanaDelete(null)}} label='Cancelar'/>
                        <Button onButtonClick={() => {setIsDeleteModalOpen(false); deleteSemana()}} label='Deletar'/>
                    </div>     
                </Modal>
                <Modal isOpen={isAddModalOpen}>
                    <h1 className="text-xl border-b border-slate-400 mb-4">Adicionando Semana</h1>
                    <form onSubmit={handleSubmit(addSemana)} className="flex justify-center">
                        <div className="w-1/2 space-y-4 mb-4">
                            <div className="align-center mb-2 grid grid-cols-8">
                                <Label className="content-center col-span-2 font-bold" htmlFor="sel-ano" value="Ano" />
                                <Select {...register('ano')} className="col-span-6" id="ano" name="ano">
                                    <YearOptionForWeekResume />
                                </Select>
                            </div>
                            
                            <div className="align-center mb-2 grid grid-cols-8">
                                <Label className="content-center col-span-2 font-bold" htmlFor="sel-semana" value="Semana" />
                                <Select {...register('semana')} className="col-span-6" id="semana" name="semana">
                                    <WeekOptionForWeekResume />
                                </Select>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <Button onButtonClick={() => {setIsAddModalOpen(false); }} label='Cancelar'/>
                                <Button type={"submit"} label='Preencher'/>
                            </div>
                        </div>
                    </form>     
                </Modal>
            </div>
    );
}