import Section from '../components/Section';
import Sidebar from '../components/Sidebar';
import Avatar from '../components/Avatar';
import Container from '../components/Container';

import svgBirthday from '../assets/birthday.svg';
import svgJob from '../assets/job.svg';
import svgPhone from '../assets/phone.svg';
import ProfileCard from '../components/ProfileCard';

export const PageAbout = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <Container className='space-y-10'>
        <Section className='p-8 border-b border-black lg:grid lg:grid-cols-2'>
          <div className='flex items-center space-x-2'>
            <Avatar imgSrc="/img/templates/profile.jpg" size={96}/>
            <div>
              <b>Ana Maria Santos</b>
              <p>anamaria1995@gmail.com</p>
            </div>
          </div>

          <div className='flex-none ml-28 lg:flex items-center'>
            <ul className='space-y-2'>
              <li className='flex items-center space-x-2'>
                <img src={svgJob} alt="Trabalho" style={{'height': '22px'}}/> 
                <p>Agente de Campo</p>
              </li>
              <li className='flex items-center space-x-2'>
                <img src={svgPhone} alt="Telefone" style={{'height': '22px'}}/> 
                <p>(92)99999-9999</p>
              </li>
            </ul>
          </div>
        </Section>
        <div className='pb-8 border-b border-black grid h-fit lg:grid-cols-2 gap-10'>
          <Section className='h-full space-y-2 col-span-2 lg:col-span-1'>
            <h2><b>Unidade de Saúde</b></h2>
            <p>Nome: SEC. MUN. DE SAÚDE DE MANAUS</p>
            <p>CNES: 703208606963795</p>
            <p>Endereço: AVENIDA MARIO YPIRANGA, 1695 - ADRIANOPOLIS</p>
            <p>Telefone: (92) - 32369142</p>
            <p>Email: GABINETE.SEMSA@PMM.AM.GOV.BR</p>
          </Section>
          <Section className='h-full space-y-2 col-span-2 lg:col-span-1'>
            <h2><b>Equipe de Saúde</b></h2>
            <ul className='space-y-2'>
              <li>
                <ProfileCard />
              </li>
              <li>
                <ProfileCard />
              </li>
              
            </ul>
          </Section>
        </div>
        
      </Container>
    </div>
  );
};

export default PageAbout;