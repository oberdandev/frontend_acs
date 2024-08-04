import { useEffect, useState, useRef } from 'react';
import { api } from "../../services/api";
import { toast, ToastContainer } from 'react-toastify';
import Container from '../../components/Container/index.jsx';
import { Table, Button, Select, Navbar } from 'flowbite-react';


export default function PageUsers() {
  const [listUserState, setListUserState] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/user');
      setListUserState(response.data);
    }
    fetchData();
  }, []);

  const getUserStatus = (status) => {
    return status === 1 ? 'Ativo' : 'Inativo';
  }

  const updateUserList = async () => {
    const response = await api.get('/user');
    setListUserState(response.data);
  };

  const deleteUser = async (userID) => {
    try {
      await api.delete(`/user/${userID}`);
      toast.success('Usuário deletado com sucesso');
      updateUserList();
    } catch (err) {
      toast.error('Erro ao deletar usuário');
    }
  };

  const onSubmitSave = async (userID, refs) => {
    const nome = refs.nome.current.value;
    const email = refs.email.current.value;
    const cns = refs.cns.current.value;
    const role = refs.role.current.value;
    const status = refs.status.current.value;

    try {
      const response = await api.patch(`/user/${userID}`, {
        nome,
        email,
        cns,
        role,
        status
      });
      toast.success('Usuário atualizado com sucesso');
      updateUserList();
    } catch (err) {
      toast.error('Erro ao atualizar usuário');
      console.log(err);
    }
  };

  const TitleHeaderComponent = () => {
    return (
      <Navbar fluid rounded>
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Gerenciar Usuários</span>
      </Navbar.Brand>
    </Navbar>
    )
  }

  const TableHeaderFlowbite = () => {
    return (
      <Table.Head>
        <Table.HeadCell>ID</Table.HeadCell>
        <Table.HeadCell>CPF</Table.HeadCell>
        <Table.HeadCell>NOME</Table.HeadCell>
        <Table.HeadCell>EMAIL</Table.HeadCell>
        <Table.HeadCell>CNS</Table.HeadCell>
        <Table.HeadCell>Role</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Ações</Table.HeadCell>
      </Table.Head>
    );
  }
  
  const TableCellFlowbite = ({user}) => {
    const nomeRef = useRef();
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
    };
  
   return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell ref={idRef}>      {user.id}</Table.Cell>  
      <Table.Cell ref={cpfRef}>     {user.cpf}</Table.Cell>
      <Table.Cell ref={nomeRef}>    {user.nome}</Table.Cell>
      <Table.Cell ref={emailRef}>   {user.email}</Table.Cell>
      <Table.Cell ref={cnsRef}>     {user.cns}</Table.Cell>
      <Table.Cell ref={roleRef}>    {user.role}</Table.Cell>
      <Table.Cell ref={statusRef}>  {getUserStatus(user.status)}</Table.Cell>            
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

  const UserRow = ({ user }) => {
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
        <Table.Cell className="p-3 px-5">{user.id}</Table.Cell>
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

  const UserTable = () => (
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
