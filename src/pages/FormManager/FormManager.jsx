import Container from "../../components/Container";
import Section from "../../components/Section";
import Sidebar from "../../components/Sidebar";

export default function PageFormManager() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full h-screen">
                <Section className='h-48'>

                </Section>
                <Container className='h-full'>

                </Container>
            </div>
        </div>
    );
}