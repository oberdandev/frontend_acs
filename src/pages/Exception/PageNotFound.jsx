import Container from '../../components/Container';
import Sidebar from '../../components/Sidebar';
import Section from '../../components/Section';

export default function PageExpection() {
    return (
      <div className='flex'>
        <Sidebar />
        <Container className='justify-center'>
            <Section>
                <h1>Página não encontrada</h1>
            </Section>
        </Container>
        
      </div>
    );
}