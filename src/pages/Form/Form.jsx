import Container from '../../components/Container'
import Section from '../../components/Section'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { useEffect, useState } from 'react';
import { inserirValor, checkForm } from './utils.js';
import { sendForm } from './sendForm.js'
import ProgressBar from '../../components/ProgressBar'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/AuthContext.jsx'

function DayForm( {id, className} ) {
  return (
    <Section id={id} className={`transition-all duration-500 space-y-4 ${className}`}>
      <div className='shadow-md p-2 py-1 pb-0 border-2 rounded-xl border-white lg:grid lg:grid-cols-2 lg:space-x-8 bg-white'>
        <InputField id="microarea" type='text' label='Microárea: ' inputSize='lg' inputOnChange={(e) => inserirValor(e.target.value, 'microarea')}/>
        <InputField id="sublocalidade" type='text' label='Sublocalidade: ' inputSize='lg' inputOnChange={(e) => inserirValor(e.target.value, 'sublocalidade')}/>
      </div>
      <div className='shadow-md p-2 py-1 pb-0 border-2 rounded-xl border-white lg:grid lg:grid-cols-2 lg:space-x-8 bg-white'>
        <InputField id="dataAtividade" type='date' label='Data da Atividade: ' inputOnChange={(e) => inserirValor(e.target.value, 'dataAtividade')}/>
        <InputField id="quarteiroes" type='text' label='Quarteirões Trabalhados: '  inputSize="sm" inputOnChange={(e) => inserirValor(e.target.value, 'quarteiroes')}/>
      </div>
      <div className='space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:space-x-4'>
        <div className='shadow-md space-y-2 p-2 py-1 border-2 rounded-xl border-white bg-white'>
          <p>Total de imóveis:</p>
          <div>
            <InputField id="inspecionados" type='text' label='Inspecionados: ' inputSize='sm' labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'inspecionados')}/>
            <InputField id="fechados" type='text' label='Fechados: ' inputSize="sm" labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'fechados')}/>
            <InputField id="positivos" type='text' label='Positivos: ' inputSize="sm" labelPos="side" inputOnChange={(e) => inserirValor(e.target.value, 'positivos')}/>
          </div>   
        </div>
        <div className='shadow-md space-y-2 p-2 border-2 rounded-xl border-white bg-white'>
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
        <div className='shadow-md space-y-2 p-2 col-span-2 border-2 rounded-xl border-white bg-white'>
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
  const { user } = useAuth();

  const [currentForm, setCurrentForm] = useState('form-seg');
  const [progress, setProgress] = useState(0);
  const weekDays = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

  useEffect(() => {
    document.querySelector('#button-advance').textContent = "Avançar";
    document.querySelector('body').classList.add("overflow-x-hidden");
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

    if (checkForm( currentForm ) === false) {
      toast.error("O formulário não foi preenchido corretamente", {
        autoClose: 2500
      });
      return;
    }

    const currentFormElement = document.querySelector(`#${currentForm}`);
    const currentFormSibling = currentFormElement.nextSibling;

    if(currentFormSibling === null) {
      //Envio de formulário

      const microareaElement = document.querySelector("#microarea");
      const sublocalidadeElement = document.querySelector("#sublocalidade");

      if (sendForm (user.profissional.id)) {
        toast.success("O relatório foi enviado!");
        /*const buttonAdvance = document.querySelector('#button-advance');
        const buttonRetract = document.querySelector('#button-retract');

        buttonAdvance.setAttribute("disabled", "");
        buttonRetract.setAttribute("disabled", "");

        buttonAdvance.classList.add("disabled");
        buttonRetract.classList.add("disabled");*/
      } else {
        toast.error("Relatório não pôde ser enviado!");
        return;
      }
        
    } else {
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
        setProgress(progress + 1);
      }
    }
  }

  function retractForm() {
    const multiForm = document.querySelector("#multi-form");

    for (const formDay of multiForm.querySelectorAll(".day-form")) {
      if (formDay.getAttribute("id") === currentForm) 
        return;

      if (formDay.nextSibling.getAttribute("id") === currentForm) {
        formDay.classList.remove("absolute");
        formDay.classList.remove("invisible");
        formDay.classList.remove("opacity-0");
        formDay.classList.remove("-translate-x-32");

        formDay.nextSibling.classList.add("absolute");
        formDay.nextSibling.classList.add("invisible");
        formDay.nextSibling.classList.add("opacity-0");
        formDay.nextSibling.classList.add("translate-x-32");

        setCurrentForm(formDay.getAttribute("id"));
        setProgress(progress - 1);
      }
    }
  }

  return (
      <Container className='space-y-2 mb-4 lg:mb-0'>
        <div id="multi-form" className='flex mt-24'>
          <DayForm id="form-seg" name="Segunda" className='day-form w-full'/>
          <DayForm id="form-ter" name="Terça" className="day-form absolute opacity-0 invisible translate-x-32 w-full"/>
          <DayForm id="form-qua" name="Quarta" className="day-form absolute opacity-0 invisible translate-x-32 w-full"/>
          <DayForm id="form-qui" name="Quinta" className="day-form absolute opacity-0 invisible translate-x-32 w-full"/>
          <DayForm id="form-sex" name="Sexta" className="day-form absolute opacity-0 invisible translate-x-32 w-full"/>
        </div>

        <div className='flex justify-center w-full fixed left-5 top-5'>
          <ProgressBar progress={progress} steps={weekDays} className='bg-white mb-2 w-3/4' />
        </div>  

        <div className='flex space-x-4 mt-2 lg:mb-0 lg:relative lg:left-8 lg:bottom-24'>
          <Button id="button-retract" color="gray" label="Voltar" onButtonClick={() => retractForm()} />
          <Button id="button-advance" label="Avançar" onButtonClick={() => advanceForm()} />
        </div>
        
      </Container>
  );
}
