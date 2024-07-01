import Section from '../components/Section';
import Sidebar from '../components/Sidebar';
import Avatar from '../components/Avatar';
import Container from '../components/Container';

import svgBirthday from '../assets/birthday.svg';
import svgJob from '../assets/job.svg';
import svgPhone from '../assets/phone.svg';

export const About = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <Container>
        <Section className='grid grid-cols-2'>
            <div className='flex items-center space-x-2'>
              <Avatar imgSrc="/img/templates/profile.jpg" imgAlt="Avatar" size={96}/>
              <div>
                <b>Ana Maria Santos</b>
                <p>anamaria1995@gmail.com</p>
              </div>
            </div>

            <div className='flex items-center'>
              <ul className='space-y-2'>
                <li className='flex items-center space-x-2'>
                  <img src={svgBirthday} alt="Aniversário" style={{'height': '22px'}}/> 
                  <p>31 de Janeiro, 1996</p>
                </li>
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
        <div className='grid grid-cols-5 gap-10'>
          <Section className='col-span-3'>
            <h2>Unidade de Saúde</h2>
          </Section>
          <Section className='col-span-2'>
            <h2>Equipe de Saúde</h2>
          </Section>
        </div>
        
      </Container>
    </div>
  );
};

export default About;