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
import axios from "axios";
import { GiConsoleController } from "react-icons/gi";

const validateAno = {
    required: 'Campo obrigatório',
    pattern: {
        value: /^\d{4}$/,
        message: 'Ano inválido'
    }
};
  
const validateSemana = {
    required: 'Campo obrigatório',
    pattern: { 
        value: /^\d{2}$/ || /^\d{1}$/,
        message: 'Semana inválida'
    }
};

function InputAno({ register, errors }) {
    return (
      <div className="mb-4">
        <label htmlFor="ano" className="block text-gray-600">Ano</label>
        <input
          type="text"
          id="ano"
          {...register('ano', validateAno)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autoComplete="off"
        />
        {errors.ano && <p className="text-red-500 text-sm">{errors.ano.message}</p>}
      </div>
    )
}

function InputSemana({ register, errors }) {
    return (
      <div className="mb-4">
        <label htmlFor="semana" className="block text-gray-600">Semana Epidemológica</label>
        <input
          type="text"
          id="semana"
          {...register('semana', validateSemana)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autoComplete="off"
        />
        {errors.semana && <p className="text-red-500 text-sm">{errors.semana.message}</p>}
      </div>
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
    const [list, setList] = useState([]);
    const [showList, setShowList] = useState(list);
    const [dataSearchInicio, setDataSearchInicio] = useState(undefined);
    const [dataSearchFim, setDataSearchFim] = useState(undefined);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(undefined);
    const [isAddModalOpen, setIsAddModalOpen] = useState(undefined);
    const [semanaDelete, setSemanaDelete] = useState(null);

    const { register, handleSubmit, formState: { errors }} = useForm();

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
                    setIsDeleteModalOpen(true);
                    setSemanaDelete(item.co_semanal);
                }}/>
        );

    const onSubmit = async (data) => {
        const semanaEpidemologica = data.ano + "-" + data.semana;

        console.log(semanaEpidemologica);

        try {
            const response = await axios.post(baseUrl + '/resumo_semanal', {
                semana_epidemiologica: string,
                profissionalID: number,
                validacao: boolean,
                transmitido: boolean
            })
        } catch(e) {
            console.log(e.message);

            const message = e.response?.data?.message || 'Erro ao adicionar semana. Tente novamente.';
            toast.error(message);
        } finally {

        }
    }

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <InputAno register={register} errors={errors}/>
                        <InputSemana register={register} errors={errors}/>

                        <div className="flex justify-center space-x-4">
                            <Button onButtonClick={() => {setIsAddModalOpen(false); }} label='Cancelar'/>
                            <Button type={"submit"} label='Preencher'/>
                        </div>
                    </form>     
                </Modal>
            </div>
    );
}