import Section from '../components/Section';
import Sidebar from '../components/Sidebar';
import Avatar from '../components/Avatar';
import Container from '../components/Container';

import svgBirthday from '../assets/birthday.svg';
import svgJob from '../assets/job.svg';
import svgPhone from '../assets/phone.svg';
import ProfileCard from '../components/ProfileCard';
import ListItem from '../components/ListItem';

export const PageAbout = () => {
  return (
    <div className='flex h-full w-full'>
      <Sidebar />
      <Container className='space-y-10'>
        <Section className='p-8 bg-white items-center border-2 rounded-xl border-white shadow-md flex justify-between pr-24'>
          <div className='flex items-center space-x-4'>
            <Avatar imgSrc="/img/templates/profile.jpg" size={128}/>
            <div className='space-y-4'>
              <div>
                <b className='text-lg'>Ana Maria Santos</b>
                <p className='text-lg'>anamaria1995@gmail.com</p>
              </div>
            </div>
          </div>
          <ul className='space-y-2'>
            <li className='flex items-center space-x-2'>
                <img src={svgJob} alt="Trabalho" style={{'height': '22px'}}/> 
                <p className='text-lg'>Agente de Campo</p>
              </li>
              <li className='flex items-center space-x-2'>
                <img src={svgPhone} alt="Telefone" style={{'height': '22px'}}/> 
                <p className='text-lg'>(92)99999-9999</p>
              </li>
          </ul>
        </Section>
        <div className='pb-8 grid h-fit lg:grid-cols-2 gap-10'>
          <Section className='text-center bg-white border-2 border-white rounded-xl shadow-md space-y-2 col-span-2 lg:col-span-1'>
            <h2 className='flex justify-center'><b className='border-b border-slate-600 w-48'>Unidade de Saúde</b></h2>
            <div className='text-left bg-white min-h-72 p-4 border-2 rounded-xl border-slate-50 space-y-2'>
              <ListItem label="Nome: " value="SEC. MUN. DE SAÚDE DE MANAUS" />
              <ListItem label="CNES: " value="703208606963795" />
              <ListItem label="Endereço: " value="AVENIDA MARIO YPIRANGA, 1695 - ADRIANOPOLIS" />
              <ListItem label="Telefone: " value="(92) - 32369142" />
              <ListItem label="Email: " value="GABINETE.SEMSA@PMM.AM.GOV.BR" />
            </div>
          </Section>
          <Section className='space-y-2 bg-white border-2 border-white rounded-xl shadow-md text-center lg:col-span-1'>
            <h2 className='flex justify-center'><b className='border-b border-slate-600 w-48'>Equipe de Saúde</b></h2>
            <ul className='p-4 min-h-72 overflow-scroll text-left space-y-2'>
              <li>
                <ProfileCard name="José Freitas" role="Agente de Campo" imgSrc="/img/templates/profile2.jpg" />
              </li>
              <li>
                <ProfileCard name="Nazaré Ribeiro" role="Enfermeira" imgSrc="/img/templates/profile3.jpg"/>
              </li>
              <li>
                <ProfileCard name="Ricardo Costa" role="Enfermeiro" imgSrc="/img/templates/profile4.jpg"/>
              </li>
              
            </ul>
          </Section>
        </div>
        
      </Container>
    </div>
  );
};

export default PageAbout;