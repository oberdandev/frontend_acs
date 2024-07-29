import Container from "../../components/Container";
import InputField from "../../components/InputField";
import Section from "../../components/Section";
import Sidebar from "../../components/Sidebar";
import WeekItem from "../../components/weekItem";
import Button from "../../components/Button";

import { useState } from "react";

export default function PageFormManager() {
    const initList = [
        {
            co_semanal: 52003,
            semana_epidomologica: 0
        },
        {
            co_semanal: 54002,
            semana_epidomologica: 1
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
        <WeekItem key={item.co_semanal} semanaEpidemologica={item.semana_epidomologica}/>
    );
    return (
            <div className='grid w-full min-h-screen h-full' style={{'gridTemplateRows': '7rem auto'}}>
                <Section className='p-4 shadow-xl relative'>    
                    <div className='px-8 flex space-x-8 items-center'>
                        <InputField className='w-auto' id="weekDate" type='date' label='Data da Atividade: '/>
                        <Button className="h-12" id="btnAddWeek" label="Nova Semana" onButtonClick={() => addWeek()} />
                    </div>
                </Section>
                <Container id='week-list'>
                    <ul className="space-y-2">
                        {weekListItems}
                    </ul>
                </Container>
            </div>
    );
}