import Container from "../../components/Container";
import Section from "../../components/Section";
import Sidebar from "../../components/Sidebar";

export default function PageFormManager() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full h-screen">
                <Section className='w-full bg-white min-h-28'>
                    <h1>Sou um cabeçalho</h1>
                </Section>
                <Container className='min-h-full'>
                    <h1>Sou um container</h1>
                </Container>
            </div>
        </div>
    );
}