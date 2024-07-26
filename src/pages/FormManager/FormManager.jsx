import Container from "../../components/Container";
import InputField from "../../components/InputField";
import Section from "../../components/Section";
import Sidebar from "../../components/Sidebar";
import WeekItem from "../../components/weekItem";
import Button from "../../components/Button";

import * as ReactDOMServer from 'react-dom/server';

export default function PageFormManager() {
    function addWeek() {
        const weekList = document.querySelector("#week-list");
        const weekItem = ReactDOMServer.renderToStaticMarkup(<WeekItem />);

        console.log(weekItem);

        weekList.appendChild(
            weekItem
        );
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className='grid w-full h-screen' style={{'gridTemplateRows': '7rem auto'}}>
                <Section className='p-4 shadow-xl relative'>    
                    <div className='px-8 flex space-x-8 items-center'>
                        <InputField className='w-auto' id="weekDate" type='date' label='Data da Atividade: '/>
                        <Button className="h-12" id="btnAddWeek" label="Nova Semana" onButtonClick={() => addWeek()} />
                    </div>
                </Section>
                <Container id='week-list'>
                    
                </Container>
            </div>
        </div>
    );
}