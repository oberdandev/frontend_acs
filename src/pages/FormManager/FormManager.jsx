import Container from "../../components/Container";
import InputField from "../../components/InputField";
import Section from "../../components/Section";
import Sidebar from "../../components/Sidebar";
import SemanaTable from "../../components/SemanaTable";
import SemanaItem from "../../components/SemanaItem";
import Button from "../../components/Button";
import { FaPlus, FaSearch } from "react-icons/fa";
import SearchDate from "../../components/SearchDate";
import useCallbackState from "../../hooks/useCallbackState";
import { useEffect, useState } from "react";

export default function PageFormManager() {
    const initList = [ //Teste: Apague depois
        {
            co_semanal: 52003,
            data_ano: 2024,
            semana_epidomologica: 0,
            data_inicio: Date.parse("2024-7-7"),
            data_fim: Date.parse("2024-7-13"),
            verificado: false,
            enviado: false
        },
        {
            co_semanal: 54002,
            data_ano: 2024,
            semana_epidomologica: 1,
            data_inicio: Date.parse("2024-7-14"),
            data_fim: Date.parse("2024-7-20"),
            verificado: false,
            enviado: false
        }
    ]
        

    const [list, setList] = useState(initList);
    const [showList, setShowList] = useState(list);
    const [dataSearchInicio, setDataSearchInicio] = useCallbackState(undefined);
    const [dataSearchFim, setDataSearchFim] = useCallbackState(undefined);
    const [semana, setSemana] = useState(2); //Teste: Apague depois
    const [coSemanal, setCoSemanal] = useState(55555); //Teste: Apague depois

    useEffect(() => {
        if (dataSearchInicio !== undefined || dataSearchFim !== undefined) {
            searchData();
        }
    }, [dataSearchInicio, dataSearchFim])

    function searchData() {
        const newShowList = list.filter((semana) => {
            const dataInicio = semana.data_inicio;
            const dataFim = semana.data_fim;

            console.log(new Date(dataSearchInicio), new Date(dataInicio), new Date(dataFim), new Date(dataSearchFim));

            return dataSearchInicio <= semana.data_inicio && dataSearchFim >= semana.data_fim;
        })
        setShowList(newShowList);
    }

    function addWeek() {
        const newList = list.concat({
            co_semanal: coSemanal,
            data_ano: 2024,
            semana_epidomologica: semana,
            data_inicio: Date.parse("2024-7-21"),
            data_fim: Date.parse("2024-7-27"),
            verificado: false,
            enviado: false
        });

        setList(newList);
        setShowList(list);
        setSemana(semana + 1); //Teste: Apague depois
        setCoSemanal(coSemanal + 1); //Teste: Apague depois
    }
    
    const weekListItems = showList.map(item =>
            <SemanaItem key={item.co_semanal} semanaEpidemologica={item.semana_epidomologica} dataAno={item.data_ano} 
                verificado={item.verificado} enviado={item.enviado}/>
        )
    return (
            <div className='grid w-full min-h-screen h-full' style={{'gridTemplateRows': '7rem auto'}}>
                <Section className='p-4 px-12 flex justify-between shadow-xl relative items-center'>    
                    <SearchDate 
                        onChangeDataInicio={(e) => setDataSearchInicio(Date.parse(e.target.value.replace(/-/g, '\/')))}
                        onChangeDataFim={(e) => setDataSearchFim(Date.parse(e.target.value.replace(/-/g, '\/')))}
                        />
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