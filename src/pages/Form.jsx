import Sidebar from '../components/Sidebar'
import Container from '../components/Container'
import Section from '../components/Section'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { useEffect, useState } from 'react';

import { inserirValor, checkForm } from '../hooks/utils.jsx';

function DayForm( {id, name, className} ) {
  return (
    <Section id={id} className={`transition-all duration-500 space-y-4 ${className}`}>
      <div className='p-2 pb-0 border-t border-black bg-slate-100'>
        <h2 className='font-bold'>{name}</h2>
      </div>
      <div className='p-2 pb-0 border-t border-black lg:grid lg:grid-cols-2 lg:space-x-8 bg-slate-100'>
        <InputField id="dataAtividade" type='date' label='Data da Atividade: ' inputOnChange={(e) => inserirValor(e.target.value, 'dataAtividade')}/>
        <InputField id="quarteiroes" type='text' label='Quarteirões Trabalhados: '  inputSize="lg" inputOnChange={(e) => inserirValor(e.target.value, 'quarteiroes')}/>
      </div>
      <div className='space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:space-x-4'>
        <div className='space-y-4 p-2 border-t border-black bg-slate-100'>
          <p>Total de imóveis:</p>
          <div>
            <InputField id="inspecionados" type='text' label='Inspecionados: ' inputSize='sm' labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'inspecionados')}/>
            <InputField id="fechados" type='text' label='Fechados: ' inputSize="sm" labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'fechados')}/>
            <InputField id="positivos" type='text' label='Positivos: ' inputSize="sm" labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'positivos')}/>
          </div>   
        </div>
        <div className='space-y-4 p-2 border-t border-black bg-slate-100'>
          <div>
            <InputField id="checklists" type='text' label='Checklists implantados:' inputSize="sm" inputOnChange={(e) => inserirValor(e.target.value, 'checklists')}/>
          </div>
          <p>Monitoramento de adesão ao checklist:</p>
          <div>
            <InputField id="checkSim" type='text' label='Sim' inputSize="sm" labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'checkSim')}/>
            <InputField id="checkNao" type='text' label='Não' inputSize="sm" labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'checkNao')}/>
            <InputField id="checkParcial" type='text' label='Parcial' inputSize="sm" labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'checkParcial')}/>
          </div>
        </div>
        <div className='space-y-4 p-2 col-span-2 border-t border-black bg-slate-100'>
          <p>Número de depósitos inspecionados por tipo:</p>
          <div className='block'>
            <div className='grid grid-cols-3'>
              <div>
                <InputField id="depA1" type='text' label='A1' inputSize="sm" labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'depA1')}/>
                <InputField id="depA2" type='text' label='A2' inputSize="sm" labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'depA2')}/>
                <InputField id="depB" type='text' label='B' inputSize="sm" labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'depB')}/>
              </div>
              <div> 
                <InputField id="depC" type='text' label='C' inputSize="sm" labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'depC')}/>
                <InputField id="depD1" type='text' label='D1' inputSize="sm" labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'depD1')}/>
                <InputField id="depD2" type='text' label='D2' inputSize="sm" labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'depD2')}/>
              </div>
              <div>
                <InputField id="depE" type='text' label='E' inputSize="sm" labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'depE')}/>
              </div>
              
              
            </div>
            <div className='grid grid-cols-2'>
              <InputField id="depEliminados" type='text' label='N° de depósitos eliminados:' inputSize='sm' inputOnChange={(e) => inserirValor(e.target.value, 'depEliminados')}/>
              <InputField id="depPositivos" type='text' label='N° de depósitos positivos:' inputSize='sm' inputOnChange={(e) => inserirValor(e.target.value, 'depPositivos')}/>
              <InputField id="depTratamento" className="col-span-2" type='text' label='N° de encaminhamentos p/ tratamento:' inputSize='sm' inputOnChange={(e) => inserirValor(e.target.value, 'depTratamento')}/>
            </div>
          </div>
          
        </div>
        
      </div>
      
    </Section>
  );
}

export default function PageForm() {
  const [currentForm, setCurrentForm] = useState('form-seg');

  useEffect(() => {
    if (document.querySelector(`#${currentForm}`).nextSibling === null) {
      //Troca a label do botão de avançar no fim do formulário
      document.querySelector('#button-advance').textContent = "Enviar";
    }

    const dayForm = document.querySelector(`#${currentForm}`);
    const dayJSONData = JSON.parse(localStorage.getItem(currentForm));

    if (dayJSONData === null) 
      return;

    for (const input of dayForm.querySelectorAll('input')) {
      input.value = dayJSONData[input.id];  
    }
  });

  function advanceForm() {
    const dayForm = document.querySelector(`#${currentForm}`);

    for (const input of dayForm.querySelectorAll('input')) {
      inserirValor(input.value, input.id);
    }

    /*if (checkForm( currentForm ) === false) {
      alert("O formulário não foi preenchido corretamente!");
      return;
    }*/

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
    } else {
      //Envio do formulário
      
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

        <div className='flex overflow-scroll'>
          <DayForm id="form-seg" name="Segunda" className='day-form '/>
          <DayForm id="form-ter" name="Terça" className="day-form absolute h-0 opacity-0 invisible translate-x-32"/>
          <DayForm id="form-qua" name="Quarta" className="day-form absolute h-0 opacity-0 invisible translate-x-32"/>
          <DayForm id="form-qui" name="Quinta" className="day-form absolute h-0 opacity-0 invisible translate-x-32"/>
          <DayForm id="form-sex" name="Sexta" className="day-form absolute h-0 opacity-0 invisible translate-x-32"/>
        </div>

        <Button id="button-advance" label="Avançar" onButtonClick={() => advanceForm()} />
      </Container>
    </div>
  );
}
