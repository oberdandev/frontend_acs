import Container from '../../components/Container'
import Section from '../../components/Section'
import InputField from '../../components/InputField'
import Button from '../../components/Button'
import { useEffect, useState } from 'react';
import { inserirValor, checkForm } from './utils.js';
import { parserToApiPattern, sendForm } from './sendForm.js';
import ProgressBar from '../../components/ProgressBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../context/AuthContext.jsx'
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api.js';

function DayForm( {id, className} ) {
  return (
    <Section id={id} className={`transition-all duration-500 space-y-4 ${className}`}>
      <div className='shadow-md p-2 py-1 pb-0 border-2 rounded-xl border-white lg:grid lg:grid-cols-2 lg:space-x-8 bg-white'>
        <InputField id="sub_local" type='text' label='Sublocalidade: ' inputSize='lg'/>
        <div className='lg:grid lg:grid-cols-2 lg:space-x-8'>
          <InputField id="micro_area" type='text' label='Microárea: ' inputSize='sm'/>        
          <InputField id="quadras_trabalhadas" type='text' label='Quarteirões Trabalhados: '/>
        </div>
      </div>
      <div className='space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:space-x-4'>
        <div className='shadow-md space-y-2 p-2 py-1 border-2 rounded-xl border-white bg-white'>
          <p>Total de imóveis:</p>
          <div>
            <InputField id="imoveis_inspec" type='text' label='Inspecionados: ' inputSize='sm' labelPos="side"/>
            <InputField id="imoveis_fechados" type='text' label='Fechados: ' inputSize="sm" labelPos="side"/>
            <InputField id="imoveis_positivo" type='text' label='Positivos: ' inputSize="sm" labelPos="side"/>
          </div>   
        </div>
        <div className='shadow-md space-y-2 p-2 border-2 rounded-xl border-white bg-white'>
          <div>
            <InputField id="checklist" type='text' label='Checklists implantados:' inputSize="sm"/>
          </div>
          <p>Monitoramento de adesão ao checklist:</p>
          <div>
            <InputField id="monit_checklist_sim" type='text' label='Sim' inputSize="sm" labelPos="side"/>
            <InputField id="monit_checklist_nao" type='text' label='Não' inputSize="sm" labelPos="side"/>
            <InputField id="monit_checklist_parcial" type='text' label='Parcial' inputSize="sm" labelPos="side"/>
          </div>
        </div>
        <div className='shadow-md space-y-2 p-2 col-span-2 border-2 rounded-xl border-white bg-white'>
          <p>Número de depósitos inspecionados por tipo:</p>
          <div className='block'>
            <div className='grid grid-cols-3'>
              <div>
                <InputField id="nu_dep_inspec_A1" type='text' label='A1' inputSize="sm" labelPos="side"/>
                <InputField id="nu_dep_inspec_A2" type='text' label='A2' inputSize="sm" labelPos="side"/>
                <InputField id="nu_dep_inspec_B" type='text' label='B' inputSize="sm" labelPos="side"/>
              </div>
              <div> 
                <InputField id="nu_dep_inspec_C" type='text' label='C' inputSize="sm" labelPos="side"/>
                <InputField id="nu_dep_inspec_D1" type='text' label='D1' inputSize="sm" labelPos="side"/>
                <InputField id="nu_dep_inspec_D2" type='text' label='D2' inputSize="sm" labelPos="side"/>
              </div>
              <div>
                <InputField id="nu_dep_inspec_E" type='text' label='E' inputSize="sm" labelPos="side"/>
              </div>
              
              
            </div>
            <div className='grid grid-cols-2'>
              <InputField id="nu_dep_eliminados" type='text' label='N° de depósitos eliminados:' inputSize='sm'/>
              <InputField id="nu_dep_positivo" type='text' label='N° de depósitos positivos:' inputSize='sm'/>
              <InputField id="nu_encaminhados" className="col-span-2" type='text' label='N° de encaminhamentos p/ tratamento:'/>
            </div>
          </div>
          
        </div>
        
      </div>
      
    </Section>
  );
}

export default function PageForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
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
  });

  useEffect(() => {
    async function fetchData() {
      try { 
        const dayFormData = await api.get('/resumodiario/' + localStorage.getItem('editWeek'));
        if (dayFormData.data.length === 0) return;

        const dayForm = document.querySelector(`#${currentForm}`);

        for (const input of dayForm.querySelectorAll('input')) {
          input.value = dayFormData.data[progress][input.id];
          input.dispatchEvent(new Event('change'));
        }
      } catch(err) {
        toast.error('Não foi possível consultar dados do resumo diário');
        console.error(err);
      }
    }

    fetchData();
  }, [progress])

  async function advanceForm() {
    const dayForm = document.querySelector(`#${currentForm}`);

    for (const input of dayForm.querySelectorAll('input')) {
      inserirValor(input.value, input.id);
    }

    if (checkForm( currentForm ) === false) {
      toast.error("O formulário não foi preenchido corretamente");
      return;
    }

    const currentFormElement = document.querySelector(`#${currentForm}`);
    const currentFormSibling = currentFormElement.nextSibling;

    if(currentFormSibling === null) {
      //Envio de formulário
      const buttonAdvance = document.querySelector('#button-advance');
      const buttonRetract = document.querySelector('#button-retract');

      try {
        buttonAdvance.setAttribute("disabled", "");
        buttonRetract.setAttribute("disabled", "");

        buttonAdvance.classList.add("disabled");
        buttonRetract.classList.add("disabled");

        const response = await sendForm(user.profissional.id);
        console.log(response.data);
        setTimeout(() => toast.success(response.data), 
          1000);

        navigate("/form-manager");
      } catch (e) {
        console.log(e);
        toast.error("O relatório não pôde ser enviado!");

        buttonAdvance.removeAttribute("disabled", "");
        buttonRetract.removeAttribute("disabled", "");

        buttonAdvance.classList.remove("disabled");
        buttonRetract.classList.remove("disabled");
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
        <ToastContainer />
      </Container>
  );
}
