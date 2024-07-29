import Container from '../../components/Container';
import Sidebar from '../../components/Sidebar';
import Section from '../../components/Section';

export default function PageExpection() {
    return (
        <div className="min-h-screen flex flex-grow items-center justify-center bg-gray-50">
          <div className="rounded-lg bg-white p-8 text-center shadow-xl">
            <h1 className="mb-4 text-4xl font-bold">404</h1>
            <p className="text-gray-600 m-8">Página não encontrada!</p>
            <a href="/" className="mt-4 inline-block rounded bg-blue-500 
            px-4 py-2 font-semibold text-white hover:bg-blue-600"> 
            Volte para a página inicial!</a>
          </div>
        </div>  
    );
}