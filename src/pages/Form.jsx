import Sidebar from '../components/Sidebar'
import Container from '../components/Container'
import Section from '../components/Section'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { useState } from 'react';

import { inserirDataAtividade, retorno } from '../hooks/utils.jsx';

function DayForm( {id, name, className} ) {
  const [dataAtividade, setDataAtividade] = useState("");
  const [quarteiroes, setQuarteiroes] = useState("");

  const [inspecionados, setInspecionados] = useState("");
  const [fechados, setFechados] = useState("");
  const [positivos, setPositivos] = useState("");

  const [checklists, setChecklists] = useState("");

  const [checkSim, setCheckSim] = useState("");
  const [checkNao, setCheckNao] = useState("");
  const [checkParcial, setCheckParcial] = useState("");

  const [depA1, setDepA1] = useState("");
  const [depA2, setDepA2] = useState("");
  const [depB, setDepB] = useState("");
  const [depC, setDepC] = useState("");
  const [depD1, setDepD1] = useState("");
  const [depD2, setDepD2] = useState("");
  const [depE, setDepE] = useState("");

  const [depEliminados, setDepEliminados] = useState("");
  const [depPositivos, setDepPositivos] = useState("");
  const [depTratamento, setDepTratamento] = useState("");

  return (
    <Section id={id} className={`transition-all duration-500 space-y-4 ${className}`}>
      <div className='p-2 pb-0 border-t border-black bg-slate-100'>
        <h2 className='font-bold'>{name}</h2>
      </div>
      <div className='p-2 pb-0 border-t border-black lg:grid lg:grid-cols-2 lg:space-x-8 bg-slate-100'>
        <InputField type='date' label='Data da Atividade: ' inputOnChange={(e) => inserirDataAtividade(e.target.value)}/>
        <InputField type='text' label='Quarteirões Trabalhados: '  inputSize="lg" inputOnChange={(e) => setQuarteiroes(e.target.value)}/>
      </div>
      <div className='space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:space-x-4'>
        <div className='space-y-4 p-2 border-t border-black bg-slate-100'>
          <p>Total de imóveis:</p>
          <div>
            <InputField type='text' label='Inspecionados: ' inputSize='sm' labelPos="side" inputOnChange={(e) => setInspecionados(e.target.value)}/>
            <InputField type='text' label='Fechados: ' inputSize="sm" labelPos="side" inputOnChange={(e) => setFechados(e.target.value)}/>
            <InputField type='text' label='Positivos: ' inputSize="sm" labelPos="side" inputOnChange={(e) => setPositivos(e.target.value)}/>
          </div>   
        </div>
        <div className='space-y-4 p-2 border-t border-black bg-slate-100'>
          <div>
            <InputField type='text' label='Checklist implantados:' inputSize="sm" inputOnChange={(e) => setChecklists(e.target.value)}/>
          </div>
          <p>Monitoramento de adesão ao checklist:</p>
          <div>
            <InputField type='text' label='Sim' inputSize="sm" labelPos="side" inputOnChange={(e) => setCheckSim(e.target.value)}/>
            <InputField type='text' label='Não' inputSize="sm" labelPos="side" inputOnChange={(e) => setCheckNao(e.target.value)}/>
            <InputField type='text' label='Parcial' inputSize="sm" labelPos="side" inputOnChange={(e) => setCheckParcial(e.target.value)}/>
          </div>
        </div>
        <div className='space-y-4 p-2 col-span-2 border-t border-black bg-slate-100'>
          <p>Número de depósitos inspecionados por tipo:</p>
          <div className='block'>
            <div className='grid grid-cols-3'>
              <div>
                <InputField type='text' label='A1' inputSize="sm" labelPos="side" inputOnChange={(e) => setDepA1(e.target.value)}/>
                <InputField type='text' label='A2' inputSize="sm" labelPos="side" inputOnChange={(e) => setDepA2(e.target.value)}/>
                <InputField type='text' label='B' inputSize="sm" labelPos="side" inputOnChange={(e) => setDepB(e.target.value)}/>
              </div>
              <div> 
                <InputField type='text' label='C' inputSize="sm" labelPos="side" inputOnChange={(e) => setDepC(e.target.value)}/>
                <InputField type='text' label='D1' inputSize="sm" labelPos="side" inputOnChange={(e) => setDepD1(e.target.value)}/>
                <InputField type='text' label='D2' inputSize="sm" labelPos="side" inputOnChange={(e) => setDepD2(e.target.value)}/>
              </div>
              <div>
                <InputField type='text' label='E' inputSize="sm" labelPos="side" inputOnChange={(e) => setDepE(e.target.value)}/>
              </div>
              
              
            </div>
            <div className='grid grid-cols-2'>
              <InputField type='text' label='N° de depósitos eliminados:' inputSize='sm' inputOnChange={(e) => setDepEliminados(e.target.value)}/>
              <InputField type='text' label='N° de depósitos positivos:' inputSize='sm' inputOnChange={(e) => setDepPositivos(e.target.value)}/>
              <InputField className="col-span-2" type='text' label='N° de encaminhamentos p/ tratamento:' inputSize='sm' inputOnChange={(e) => setDepTratamento(e.target.value)}/>
            </div>
          </div>
          
        </div>
        
      </div>
      
    </Section>
  );
}

export default function PageForm() {
  const [currentForm, setCurrentForm] = useState('form-seg');

  function advanceForm() {
    checkForm();

    const currentFormElement = document.querySelector(`#${currentForm}`);
    const currentFormSibling = currentFormElement.nextSibling;
    currentFormElement.classList.add("invisible");
    currentFormElement.classList.add("absolute");
    currentFormElement.classList.add("opacity-0");
    currentFormElement.classList.add("-translate-x-32");

    const evt = new Event("checkForm", { formID: currentForm });
    document.dispatchEvent(evt);

    if (currentFormSibling !== null) {
      currentFormSibling.classList.remove("absolute");
      currentFormSibling.classList.remove("invisible");
      currentFormSibling.classList.remove("opacity-0");
      currentFormSibling.classList.remove("translate-x-32");

      setCurrentForm(currentFormSibling.getAttribute("id"));
    }
  }

  return (
    <div className='flex'>
      <Sidebar />
      <Container>
        <Section className='lg:grid lg:grid-cols-2 lg:space-x-8'>
          <InputField type='text' label='Microárea: ' inputSize='lg'/>
          <InputField type='text' label='Sublocalidade: ' inputSize='lg'/>
        </Section>

        <div className='overflow-scroll'>
          <DayForm id="form-seg" name="Segunda" className='day-form'/>
          <DayForm id="form-ter" name="Terça" className="day-form absolute opacity-0 invisible translate-x-32"/>
          <DayForm id="form-qua" name="Quarta" className="day-form absolute opacity-0 invisible translate-x-32"/>
          <DayForm id="form-qui" name="Quinta" className="day-form absolute opacity-0 invisible translate-x-32"/>
          <DayForm id="form-sex" name="Sexta" className="day-form absolute opacity-0 invisible translate-x-32"/>
        </div>

        <Button label="Avançar" onButtonClick={() => advanceForm()} />
      </Container>
    </div>
  );
}
