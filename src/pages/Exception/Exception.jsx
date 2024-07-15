import Container from '../../components/Container';
import Section from '../../components/Section';
import Sidebar from '../../components/Sidebar'

export default function PageExpection() {
    return (
      <div className='flex'>
        <Sidebar />
        <Container>
          <Section>
            <h1><b>Erro de Sintaxe Javascript</b></h1>
            <p>Entre em contato com o administrador</p>
          </Section>
        </Container>
      </div>
    );
}