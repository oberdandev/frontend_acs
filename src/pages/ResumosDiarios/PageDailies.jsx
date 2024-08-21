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

function DailyItem({id, semanaEpidemologica, profissional, microarea, sublocal, data}) {
    const date = new Date(data);
    console.log(data.replace(/-/g, '\/'), Date.parse(data.replace(/-/g, '\/').split('T')[0]))

    return(
        <tr className='min-w-full border-b border-slate-400'>
            <td className="p-1 pt-y border-r border-slate-400">{id}</td>
            <td className="p-1 pt-y border-r border-slate-400">{semanaEpidemologica}</td>
            <td className="p-1 pt-y border-r border-slate-400">{profissional}</td>
            <td className="p-1 pt-y border-r border-slate-400">{microarea}</td>
            <td className="p-1 pt-y border-r border-slate-400">{sublocal}</td>
            <td className="p-1 pt-y border-r border-slate-400">{date.toLocaleDateString()}</td>
        </tr>
    )
}

function DailyTable( {children} ) {
    return (
        <div className="text-center relative bg-white rounded-xl border border-slate-400 shadow-lg overflow-hidden mb-4">
            <table className="w-full table-auto">
                <thead className="relative border-b border-slate-400 shadow-lg">
                    <tr>
                        <th className="p-1 pt-2 border-r border-slate-400">ID</th>
                        <th className="p-1 pt-2 border-r border-slate-400">SE</th>
                        <th className="p-1 pt-2 border-r border-slate-400">Profissional</th>
                        <th className="p-1 pt-2 border-r border-slate-400">Microarea</th>
                        <th className="p-1 pt-2 border-r border-slate-400">Sublocal</th>
                        <th className="p-1 pt-2 border-slate-400">Data</th>
                    </tr>
                </thead>
                <tbody className="w-full bg-slate-100">
                    {children}
                </tbody>
            </table>
        </div>
    );
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

export default function PageDailies() {
    const { user } = useAuth();

    const [list, setList] = useState([]);
    const [showList, setShowList] = useState(list);
    const [diaInicio, setDiaInicio] = useState(undefined);
    const [diaFim, setDiaFim] = useState(undefined);

    useEffect(() => {
        // Inicializa lista de semanas
        async function fetchData() {
            try {   
                const response = await api.get(`/resumodiario/profissional/${user.profissional.id}`);
                console.log(response);  
                setList(response.data);
                setShowList(response.data);
            } catch (error) {
                console.log(error);
                toast.error("Falha na exibição de resumos diários. Tente novamente mais tarde.")
            }
            
        }
        fetchData();
    }, []);

    function searchData() {
        const newShowList = list.filter((dia) => {
            return diaInicio <= dia.data_inicio && diaFim >= dia.data_fim;
        })
        setShowList(newShowList);
    }

    // Integrar com semana epidemiologica para obter as datas
    const dayListItems = showList.map(item =>
        <DailyItem key={item.id} id={item.id} semanaEpidemologica={item.resumoSemanal.semana_epidemiologica} 
            profissional={item.profissional.nome} microarea={item.micro_area} sublocal={item.sub_local} data={item.data}/>
    );

    return (
        <div className='grid w-full min-h-screen h-full' style={{'gridTemplateRows': '5rem auto'}}>
            <Section className='p-2 px-12 flex justify-center shadow-xl relative items-center'>    
                <h1 className="text-xl font-bold">Seus resumos diários</h1>
            </Section>
            <Container id='day-list'>
                <DailyTable>
                    {dayListItems}
                </DailyTable>
            </Container>
        </div>
    );
}