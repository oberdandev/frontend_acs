import Container from "../../components/Container";
import InputField from "../../components/InputField";
import Section from "../../components/Section";
import Sidebar from "../../components/Sidebar";
import SemanaTable from "../../components/SemanaTable";
import SemanaItem from "../../components/SemanaItem";
import Button from "../../components/Button";

import { FaPlus, FaSearch } from "react-icons/fa";

import { useState } from "react";
import Searchbox from "../../components/Searchbox";

export default function PageFormManager() {
    const initList = [ //Teste: Apague depois
        {
            co_semanal: 52003,
            data_ano: 2024,
            semana_epidomologica: 0,
            verificado: false,
            enviado: false
        },
        {
            co_semanal: 54002,
            data_ano: 2024,
            semana_epidomologica: 1,
            verificado: false,
            enviado: false
        }
    ]
        

    const [list, setList] = useState(initList);
    const [semana, setSemana] = useState(2); //Teste: Apague depois
    const [coSemanal, setCoSemanal] = useState(55555); //Teste: Apague depois

    function addWeek() {
        const newList = list.concat({
            co_semanal: coSemanal,
            data_ano: 2024,
            semana_epidomologica: semana,
            verificado: false,
            enviado: false
        });
        console.log(newList);

        setList(newList);    
        setSemana(semana + 1); //Teste: Apague depois
        setCoSemanal(coSemanal + 1); //Teste: Apague depois
    }

    const weekListItems = list.map(item =>
            <SemanaItem key={item.co_semanal} semanaEpidemologica={item.semana_epidomologica} dataAno={item.data_ano} 
                verificado={item.verificado} enviado={item.enviado}/>
        )
    return (
            <div className='grid w-full min-h-screen h-full' style={{'gridTemplateRows': '7rem auto'}}>
                <Section className='p-4 flex justify-between shadow-xl relative items-center'>    
                    <Searchbox />
                    <div className='px-8 flex space-x-8 items-center'>
                        <Button icon={<FaPlus className="mr-2" />} className="h-12" id="btnAddWeek" label="Nova Semana" onButtonClick={() => addWeek()} />
                    </div>
                </Section>
                <Container id='week-list'>
                    <SemanaTable>
                        {weekListItems}
                    </SemanaTable>
                    
                </Container>
            </div>
    );
}