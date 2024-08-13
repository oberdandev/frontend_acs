import Section from '../components/Section';
import Avatar from '../components/Avatar';
import Container from '../components/Container';
import svgJob from '../assets/job.svg';
import svgPhone from '../assets/phone.svg';
import ProfileCard from '../components/ProfileCard';
import ListItem from '../components/ListItem';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { HiOutlineIdentification } from 'react-icons/hi';

export const PageAbout = () => {
  const { user } = useAuth();
  const [ listEquipe, setListEquipe ] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try { 
        const response = await api.get(`/profissional/equipeIne/${user.profissional.equipe_ine}`);
        setListEquipe(response.data);
      } catch (e) {
        console.log(e);
        toast.error("Não foi possível consultar equipe");
      }
      
    }

    fetchData();
  }, []);

  const listEquipeHtml = listEquipe.map((profissional) => 
    <li><ProfileCard imgSrc={`https://avatar.iran.liara.run/username?username=${profissional.nome}&bold=false&length=1`}
      name={profissional.nome}
      role={profissional.profissao.no_profissao}/></li>
  )

  let formatedCpf = user?.cpf.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);

  if (formatedCpf) {
    formatedCpf = formatedCpf[1] + '.' + formatedCpf[2] + '.' + formatedCpf[3] + '-' + formatedCpf[4];
  }

  return (
      <Container className='space-y-10'>
        <Section className='p-8 bg-white items-center border-2 rounded-xl border-white shadow-md flex justify-between pr-24'>
          <div className='flex items-center space-x-4'>
            <Avatar imgSrc={`https://avatar.iran.liara.run/username?username=${user.nome}&bold=false&length=1`} size={128}/>
            <div className='space-y-4'>
              <div>
                <b className='text-lg'>{user.nome}</b>
                <p className='text-lg'>{user.email}</p>
              </div>
            </div>
          </div>
          <ul className='space-y-2'>
            <li className='flex items-center space-x-2'>
                <img src={svgJob} alt="Trabalho" style={{'height': '22px'}}/>
                <p className='text-lg'>{user?.profissao?.no_profissao}</p>
              </li>
              <li className='flex items-center space-x-2'>
                <HiOutlineIdentification size={22}/>
                <p className='text-lg'>{formatedCpf}</p>
              </li>
          </ul>
        </Section>
        <div className='pb-8 grid h-fit lg:grid-cols-2 gap-10'>
          <Section className='text-center bg-white border-2 border-white rounded-xl shadow-md space-y-2 col-span-2 lg:col-span-1'>
            <h2 className='flex justify-center'><b className='border-b border-slate-600 w-48'>Unidade de Saúde</b></h2>
            <div className='text-left bg-white min-h-72 p-4 border-2 rounded-xl border-slate-50 space-y-2'>
              <ListItem label="Nome: " value={user?.unidade?.nome} />
              <ListItem label="CNES: " value={user?.unidade?.cnes} />
              <ListItem label="Endereço: " value={`${user?.unidade?.logradouro} | Bairro ${user.unidade.bairro}`} />
              <ListItem label="Telefone: " value={user?.unidade?.telefone} />
              <ListItem label="Diretor: " value={user?.unidade?.diretor} />
              <ListItem label="Email: " value={user?.unidade?.email} />
            </div>
          </Section>
          <Section className='space-y-2 bg-white border-2 border-white rounded-xl shadow-md text-center lg:col-span-1'>
            <h2 className='flex justify-center'><b className='border-b border-slate-600 w-48'>Equipe de Saúde</b></h2>
            <ul className='p-4 overflow-scroll text-left space-y-2' style={{height: '32rem'}}>
              {listEquipeHtml}
            </ul>
          </Section>
        </div>
      </Container>
);
};

export default PageAbout;