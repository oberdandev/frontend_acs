import Container from "../../components/Container";
import InputField from "../../components/InputField";
import Section from "../../components/Section";
import Sidebar from "../../components/Sidebar";
import SemanaTable from "../../components/SemanaTable";
import SemanaItem from "../../components/SemanaItem";
import Button from "../../components/Button";

import { FaSearch } from "react-icons/fa";

import { useState } from "react";

export default function PageFormManager() {
    const initList = [
        {
            co_semanal: 52003,
            semana_epidomologica: 0,
            verificado: false,
            enviado: false
        },
        {
            co_semanal: 54002,
            semana_epidomologica: 1,
            verificado: false,
            enviado: false
        }
    ]
        

    const [list, setList] = useState(initList);
    const [semana, setSemana] = useState(2);

    function addWeek() {
        const newList = list.concat({co_semanal: 55555, semana_epidomologica: semana});
        console.log(newList);

        setList(newList);   
        setSemana(semana + 1);
    }

    const weekListItems = list.map(item =>
            <SemanaItem key={item.co_semanal} semanaEpidemologica={item.semana_epidomologica} 
                verificado={item.verificado} enviado={item.enviado}/>
        )
    return (
        <div className="flex min-h-screen h-full">
            <Sidebar />
            <div className='grid w-full min-h-screen h-full' style={{'gridTemplateRows': '7rem auto'}}>
                <Section className='p-4 flex justify-between shadow-xl relative'>    
                    <div className='pl-2 flex space-x-2 items-center rounded-md overflow-hidden border-sky-800 border-2'>
                        <InputField className='w-auto mb-0' id="weekDate" type='date' label='Pesquisar por data:'/>
                        <div className="px-4 flex items-center h-full bg-sky-800 border-l border-slate-800 cursor-pointer text-white hover:text-sky-400">
                            <FaSearch size={28}/>
                        </div>
                    </div>
                    <div className='px-8 flex space-x-8 items-center'>
                        <Button className="h-12" id="btnAddWeek" label="Nova Semana" onButtonClick={() => addWeek()} />
                    </div>
                </Section>
                <Container id='week-list'>
                    <SemanaTable>
                        {weekListItems}
                    </SemanaTable>
                    
                </Container>
            </div>
        </div>
    );
}