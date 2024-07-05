import Sidebar from '../components/Sidebar'
import Container from '../components/Container'
import Section from '../components/Section'
import InputField from '../components/InputField';

function DayForm() {
  return (
    <Section className='space-y-4'>
      <div className='p-2 border-b border-t border-black grid grid-cols-2 space-x-8 bg-slate-100'>
        <InputField type='date' label='Data da Atividade: ' />
        <InputField type='text' label='Quarteirões Trabalhados: ' />
      </div>
      <div className='space-y-4 lg:space-y-0 lg:grid lg:grid-cols-4 lg:space-x-4'>
        <div className='space-y-4 p-2 border-b border-t border-black bg-slate-100'>
          <p>Total de imóveis:</p>
          <div>
            <InputField type='text' label='Inspecionados: '/>
            <InputField type='text' label='Fechados: ' inputSize="sm"/>
            <InputField type='text' label='Positivos: ' inputSize="sm"/>
          </div>   
        </div>
        <div className='space-y-4 p-2 border-b border-t border-black bg-slate-100'>
          <div>
            <p>Checklist implantados:</p>
            <InputField type='text' label='' />
          </div>
          <p>Monitoramento de adesão ao checklist:</p>
          <div>
            <InputField type='text' label='Sim' inputSize="sm"/>
            <InputField type='text' label='Não' inputSize="sm"/>
            <InputField type='text' label='Parcial' inputSize="sm"/>
          </div>
        </div>
        <div className='space-y-4 p-2 col-span-2 border-b border-t border-black bg-slate-100'>
          <p>Número de depósitos inspecionados por tipo:</p>
          <div className='block'>
            <div className='grid grid-cols-3'>
              <div>
                <InputField type='text' label='A1' inputSize="sm"/>
                <InputField type='text' label='A2' inputSize="sm"/>
                <InputField type='text' label='B' inputSize="sm"/>
              </div>
              <div> 
                <InputField type='text' label='C' inputSize="sm"/>
                <InputField type='text' label='D1' inputSize="sm"/>
                <InputField type='text' label='D2' inputSize="sm"/>
              </div>
              <div>
                <InputField type='text' label='E' inputSize="sm"/>
              </div>
              
              
            </div>
            <div className='grid grid-cols-2'>
              <InputField type='text' label='N° de depósitos eliminados:' />
              <InputField type='text' label='N° de depósitos positivos:' />
              <InputField className="col-span-2" type='text' label='N° de encaminhamentos p/ tratamento:' />
            </div>
          </div>
          
        </div>
        
      </div>
      
    </Section>
  );
}

export default function PageForm() {
  return (
    <div className='flex'>
      <Sidebar />
      <Container>
        <Section className='grid grid-cols-2 space-x-8'>
          <InputField type='text' label='Microárea: ' />
          <InputField type='text' label='Sublocalidade: ' />
        </Section>
        <DayForm />
      </Container>
    </div>
  );
}