import { useEffect, useState, useRef } from 'react';
import { api } from "../../services/api";
import { toast, ToastContainer } from 'react-toastify';
import Container from '../../components/Container/index.jsx';
import { Table, Button, Select, Navbar, Badge, Modal, Tooltip, Label} from 'flowbite-react';
import { FiEdit } from "react-icons/fi";
import { HiOutlineExclamationCircle, HiOutlineKey, HiOutlineX  } from 'react-icons/hi';
import EditUserModal from './EditModal.jsx';
import { ResetPasswordModal } from './ResetModal.jsx';

export default function PageUsers() {
  const [listUserState, setListUserState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Número de itens por página
  const [openModal, setOpenModal] = useState(false); 
  const [modalDelete, setModalDelete] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [resetPassModal, setResetPassModal] = useState(false);
  const [userAction, setUserAction] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/user');
      setListUserState(response.data);
    }
    fetchData();
  }, []);

  const getUserStatus = (status) => {
    return status === 1 
      ? <Badge color="success">Ativo</Badge> 
      : <Badge color="danger">Inativo</Badge>;
  };

  function ModalDeleteComponent () {
    return (
      <Modal show={modalDelete} dismissible  size="md" onClose={() => setModalDelete(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-600 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Você tem certeza que deseja excluir este usuário? <br/><b>{userToDelete.userName}</b>
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => {
                setModalDelete(false);
                deleteUser(userToDelete.userID)
              }}>
                {"Sim, tenho certeza"}
              </Button>
              <Button color="gray" 
                onClick={() => {
                  setModalDelete(false)
                  setUserToDelete(null)
                  } }>
                Não, cancelar.
              </Button>
            
            </div>
          </div>
        </Modal.Body>
      </Modal>
      )
  }

  function handleModalForDeleteUser(userID, userName){
    setUserToDelete({userID, userName})
    setModalDelete(true);
  }

  function handleModalForResetPassword(user){
    setUserAction(user);
    setResetPassModal(true); 
  }

  function ModalShowNewResetedPassword(password){
      
  }


  async function onSubmitResetPassword(password, id){
    try{
      const response = await api.patch(`/user/${id}`, {
        body: {senha: password}
      })
      toast.success('Senha resetada com sucesso')
    }catch(e){
      console.log(e)
      console.log.log(e.message)
      toast.error(e?.message || 'Erro ao resetar senha')
    }
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
      await api.patch(`/user/${userID}`, {
        nome,
        email,
        cns,
        role,
        status,
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
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Gerenciar Usuários
          </span>
        </Navbar.Brand>
      </Navbar>
    );
  };

  const TableHeaderFlowbite = () => {
    return (
      <Table.Head>
        <Table.HeadCell>ID</Table.HeadCell>
        <Table.HeadCell>CPF</Table.HeadCell>
        <Table.HeadCell>NOME</Table.HeadCell>
        <Table.HeadCell>EMAIL</Table.HeadCell>
        <Table.HeadCell>CNS</Table.HeadCell>
        <Table.HeadCell>Cargo</Table.HeadCell>
        <Table.HeadCell>Status</Table.HeadCell>
        <Table.HeadCell>Ações</Table.HeadCell>
      </Table.Head>
    );
  };

  const TableCellFlowbite = ({ user }) => {
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
        <Table.Cell ref={idRef}>{user.id}</Table.Cell>
        <Table.Cell ref={cpfRef}>{user.cpf}</Table.Cell>
        <Table.Cell ref={nomeRef}>{user.nome}</Table.Cell>
        <Table.Cell ref={emailRef}>{user.email}</Table.Cell>
        <Table.Cell ref={cnsRef}>{user.cns}</Table.Cell>
        <Table.Cell ref={roleRef}>{user.role}</Table.Cell>
        <Table.Cell ref={statusRef}>{getUserStatus(user.status)}</Table.Cell>
        <Table.Cell className="flex">
        <Tooltip content="Editar Usuário" animation='duration-500'>
          <Button
            size="sm"
            color="blue"
            className="mr-2"
            onClick={() => setOpenModal(true)}
          >
              <FiEdit size={16} className='my-1'/>
            </Button>
          </Tooltip>
          
          <Tooltip content="Resetar Senha" animation="duration-500">
            <Button size="sm" color="warning" className="mr-2" onClick={()=> {handleModalForResetPassword(user)}}>
              <HiOutlineKey  size={16} className='my-1' />
            </Button>
          </Tooltip>
          
          <Button size="sm" color="failure" onClick={() => handleModalForDeleteUser(user.id, user.nome)}>
            <HiOutlineX size={16} className='my-1'/>
          </Button>
        </Table.Cell>
      </Table.Row>
    );
  };

  // Calcular os itens para a página atual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listUserState.slice(indexOfFirstItem, indexOfLastItem);

  const TableFlowbite = () => {
    return (
      <div className="overflow-x-auto ">
        <Table striped>
          <TableHeaderFlowbite />
          <Table.Body className="divide-y">
            {currentItems.map((user) => (
              <TableCellFlowbite key={user.id} user={user} />
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  };

  const PaginationComponent = () => {
    const totalPages = Math.ceil(listUserState.length / itemsPerPage);

    return (
      <div className="flex justify-between items-center p-4">
        <Select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            setCurrentPage(1); // Reseta para a primeira página
          }}
          className="w-24"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </Select>

        <div className="flex">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="mr-2"
          >
            Anterior
          </Button>
          <Button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Próximo
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full min-h-screen h-full ">
      <TitleHeaderComponent className="m-2" />
      <Container className="w-full min-h-screen h-full">
        {listUserState.length > 0 ? (
          <>
            <PaginationComponent />
            <TableFlowbite />
            {modalDelete ? <ModalDeleteComponent  /> : null}
            {openModal ? <EditUserModal 
                          isOpen={openModal} 
                          onClose={() => {setOpenModal(false)}} 
                          /> : null}
            {resetPassModal ? 
                          <ResetPasswordModal 
                          isOpen={resetPassModal} 
                          onClose={()=> setResetPassModal(false)}
                          onSubmit={()=> console.log('reset')}
                          userAction={userAction} 

                          /> : null}
          </>
        ) : (
          <h1>Carregando...</h1>
        )}
      </Container>
      <ToastContainer />
    </div>
  );
}
