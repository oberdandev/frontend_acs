import Sidebar from '../components/Sidebar'
import Container from '../components/Container'
import Section from '../components/Section'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { useState } from 'react';

function DayForm( {id, name, className} ) {
  return (
    <Section id={id} className={`transition-all duration-500 space-y-4 ${className}`}>
      <div className='p-2 pb-0 border-t border-black bg-slate-100'>
        <h2 className='font-bold'>{name}</h2>
      </div>
      <div className='p-2 pb-0 border-t border-black lg:grid lg:grid-cols-2 lg:space-x-8 bg-slate-100'>
        <InputField type='date' label='Data da Atividade: ' />
        <InputField type='text' label='Quarteirões Trabalhados: '  inputSize="lg"/>
      </div>
      <div className='space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:space-x-4'>
        <div className='space-y-4 p-2 border-t border-black bg-slate-100'>
          <p>Total de imóveis:</p>
          <div>
            <InputField type='text' label='Inspecionados: ' inputSize='sm' labelPos="side"/>
            <InputField type='text' label='Fechados: ' inputSize="sm" labelPos="side"/>
            <InputField type='text' label='Positivos: ' inputSize="sm" labelPos="side"/>
          </div>   
        </div>
        <div className='space-y-4 p-2 border-t border-black bg-slate-100'>
          <div>
            <InputField type='text' label='Checklist implantados:' inputSize="sm"/>
          </div>
          <p>Monitoramento de adesão ao checklist:</p>
          <div>
            <InputField type='text' label='Sim' inputSize="sm" labelPos="side"/>
            <InputField type='text' label='Não' inputSize="sm" labelPos="side"/>
            <InputField type='text' label='Parcial' inputSize="sm" labelPos="side"/>
          </div>
        </div>
        <div className='space-y-4 p-2 col-span-2 border-t border-black bg-slate-100'>
          <p>Número de depósitos inspecionados por tipo:</p>
          <div className='block'>
            <div className='grid grid-cols-3'>
              <div>
                <InputField type='text' label='A1' inputSize="sm" labelPos="side"/>
                <InputField type='text' label='A2' inputSize="sm" labelPos="side"/>
                <InputField type='text' label='B' inputSize="sm" labelPos="side"/>
              </div>
              <div> 
                <InputField type='text' label='C' inputSize="sm" labelPos="side"/>
                <InputField type='text' label='D1' inputSize="sm" labelPos="side"/>
                <InputField type='text' label='D2' inputSize="sm" labelPos="side"/>
              </div>
              <div>
                <InputField type='text' label='E' inputSize="sm" labelPos="side"/>
              </div>
              
              
            </div>
            <div className='grid grid-cols-2'>
              <InputField type='text' label='N° de depósitos eliminados:' inputSize='sm'/>
              <InputField type='text' label='N° de depósitos positivos:' inputSize='sm'/>
              <InputField className="col-span-2" type='text' label='N° de encaminhamentos p/ tratamento:' inputSize='sm'/>
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
    const currentFormElement = document.querySelector(`#${currentForm}`);
    const currentFormSibling = currentFormElement.nextSibling;
    currentFormElement.classList.add("invisible");
    currentFormElement.classList.add("absolute");
    currentFormElement.classList.add("opacity-0");
    currentFormElement.classList.add("-translate-x-32");

    if (currentFormSibling !== null) {
      currentFormSibling.classList.remove("absolute");
      currentFormSibling.classList.remove("invisible");
      currentFormSibling.classList.remove("opacity-0");
      currentFormSibling.classList.remove("translate-x-32");

      console.log(currentFormSibling.getAttribute("id"));

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
          <DayForm id="form-seg" name="Segunda" />
          <DayForm id="form-ter" name="Terça" className="absolute opacity-0 invisible translate-x-32"/>
          <DayForm id="form-qua" name="Quarta" className="absolute opacity-0 invisible translate-x-32"/>
          <DayForm id="form-qui" name="Quinta" className="absolute opacity-0 invisible translate-x-32"/>
          <DayForm id="form-sex" name="Sexta" className="absolute opacity-0 invisible translate-x-32"/>
        </div>

        <Button label="Avançar" onButtonClick={() => advanceForm()} />
      </Container>
    </div>
  );
}
