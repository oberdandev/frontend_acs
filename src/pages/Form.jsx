import Sidebar from '../components/Sidebar'
import Container from '../components/Container'
import Section from '../components/Section'
import InputField from '../components/InputField';

function DayForm() {
  return (
    <Section>

    </Section>
  );
}

export default function PageForm() {
  return (
    <div className='flex'>
      <Sidebar />
      <Container className='space-y-6'>
        <Section className='grid grid-cols-2 space-x-8'>
          <InputField type='text' label='Microárea: ' />
          <InputField type='text' label='Sublocalidade: ' />
        </Section>
        <DayForm />
      </Container>
    </div>
  );
}