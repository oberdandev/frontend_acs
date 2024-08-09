import { useEffect, useState, useRef } from 'react';
import { api } from "../../services/api";
import { toast, ToastContainer } from 'react-toastify';
import Container from '../../components/Container/index.jsx';
import { Table, Button, Select, Navbar } from 'flowbite-react';


export default function PageUsers() {
  const [listWeek, setListWeek] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/resumo_semanal');
      setListWeek(response.data);
    }
    fetchData();
  }, []);

  const getWeekStatus = (status) => {
    return status === 1 ?
        <Tag className='bg-red-700 text-green-700' text="Sim"/> : 
        <Tag className='bg-red-300 text-red-700' text="Não"/>;
  }

  const updateWeekList = async () => {
    const response = await api.get('/resumo_semanal');
    setListWeek(response.data);
  };

  const deleteWeek = async (weekID) => {
    try {
      await api.delete(`/resumo_semanal/${weekID}`);
      toast.success('Semana deletada com sucesso');
      updateWeekList();
    } catch (err) {
      toast.error('Erro ao deletar semana');
    }
  };

  const TitleHeaderComponent = () => {
    return (
      <Navbar fluid rounded>
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Gerenciar Formulários</span>
      </Navbar.Brand>
    </Navbar>
    )
  }

  const TableHeaderFlowbite = () => {
    return (
      <Table.Head>
        <Table.HeadCell>SE</Table.HeadCell>
        <Table.HeadCell>DATA</Table.HeadCell>
        <Table.HeadCell>VERIFICADO</Table.HeadCell>
        <Table.HeadCell>ENVIADO</Table.HeadCell>
        <Table.HeadCell>Ações</Table.HeadCell>
      </Table.Head>
    );
  }
  
  const TableCellFlowbite = ({week}) => {
    /*const nomeRef = useRef();
    const cpfRef = useRef();
    const emailRef = useRef();
    const cnsRef = useRef();
    const roleRef = useRef();
    const statusRef = useRef();
    const idRef = useRef();
  
    const refs = {
      nome: nomeRef,
      email: emailRef,
      cns: cnsRef,
      role: roleRef,
      status: statusRef,
    };*/
  
   return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell >{week.semana_epidemiologica}</Table.Cell>
      <Table.Cell >{week.created_at}</Table.Cell>  
      <Table.Cell >{getWeekStatus(week.validacao)}</Table.Cell>
      <Table.Cell >{getWeekStatus(week.transmitido)}</Table.Cell>            
      <Table.Cell className='flex'>
        <Button size="sm" 
          color="blue" 
          className="mr-2" 
          onClick={() => onSubmitSave(user.id, refs)}>
          +
        </Button>
        <Button 
          size="sm" 
          color="yellow" 
          className="mr-2">
          -
        </Button>
        <Button 
          size="sm" 
          color="red" 
          onClick={() => deleteUser(user.id)}>
          x
        </Button>
      </Table.Cell>
    </Table.Row>
   )
  }
  
  const TableFlowbite = () => {
    return (
      <div className="overflow-x-auto">
        <Table striped>
            <TableHeaderFlowbite />
          <Table.Body className='divide-y'>
            {listUserState.map((user) => <TableCellFlowbite key={user.id} user={user} />
            )}
          </Table.Body>      
        </Table>
      </div>
    )
  }

  const WeekRow = ({ week }) => {
    const nomeRef = useRef();
    const emailRef = useRef();
    const cnsRef = useRef();
    const roleRef = useRef();
    const statusRef = useRef();

    const refs = {
      nome: nomeRef,
      email: emailRef,
      cns: cnsRef,
      role: roleRef,
      status: statusRef,
    };

    return (
      <Table.Row className="hover:bg-orange-100 bg-gray-100">
        <Table.Cell className="p-3 px-5">{week.semana_epidemiologica}</Table.Cell>
        <Table.Cell className="p-3 px-5">
          <input
            id="cpf"
            name="cpf"
            type="text"
            defaultValue={user.cpf}
            className="bg-transparent"
            readOnly
          />
        </Table.Cell>
        <Table.Cell className="p-3 px-5">
          <input
            id="nome"
            name="nome"
            type="text"
            defaultValue={user.nome}
            className="bg-transparent"
            ref={nomeRef}
          />
        </Table.Cell>
        <Table.Cell className="p-3 px-5">
          <input
            id="email"
            name="email"
            defaultValue={user.email}
            className="bg-transparent"
            ref={emailRef}
          />
        </Table.Cell>
        <Table.Cell className="p-3 px-5">
          <input
            id="cns"
            name="cns"
            type="text"
            defaultValue={user.cns}
            className="bg-transparent"
            ref={cnsRef}
          />
        </Table.Cell>
        <Table.Cell className="p-3 px-5">
          <Select name="role" defaultValue={user.role} ref={roleRef} className="bg-transparent">
            <option value="USER">user</option>
            <option value="ADMIN">admin</option>
            <option value="PROFISSIONAL">profissional</option>
            <option value="COORDENADOR">coordenador</option>
          </Select>
        </Table.Cell>
        <Table.Cell className="p-3 px-5">
          <Select name="status" defaultValue={user.status} ref={statusRef} className="bg-transparent">
            <option value={1}>Ativo</option>
            <option value={0}>Inativo</option>
          </Select>
        </Table.Cell>
        <Table.Cell className="p-3 px-5 flex justify-end">
          <Button size="sm" color="blue" className="mr-2" onClick={() => onSubmitSave(user.id, refs)}>+</Button>
          <Button size="sm" color="yellow" className="mr-2">-</Button>
          <Button size="sm" color="red" onClick={() => deleteUser(user.id)}>x</Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  const WeekTable = () => (
    <div className="text-gray-900 bg-gray-200 max-h-screen max-w-screen container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Usuários</h1>
      </div>
      <Table className="w-full text-md bg-white shadow-md rounded mb-4">
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>CPF</Table.HeadCell>
          <Table.HeadCell>Nome</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>CNS</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Ações</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {listUserState.map(user => (
            <UserRow key={user.id} user={user} />
          ))}
        </Table.Body>
      </Table>
    </div>
  );

  return (
    <div className="w-full min-h-screen h-full">
      <TitleHeaderComponent className='m-2'/>
        <Container className='w-full min-h-screen h-full'>
          {listUserState.length > 0 ? <TableFlowbite /> : <h1>Carregando...</h1>}
        </Container>
        <ToastContainer />
    </div>
  );
}
