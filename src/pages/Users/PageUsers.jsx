  import { useEffect, useState, useRef } from 'react';
  import { api } from "../../services/api";
  import { toast, ToastContainer } from 'react-toastify';
  import Container from '../../components/Container/index.jsx';
  import { Table, Button, Select, Navbar, Badge, Modal, Tooltip, Label, Spinner, Clipboard} from 'flowbite-react';
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
    const [showResetedPasswordModal, setShowResetedPasswordModal] = useState(false);
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [filterName, setFilterName] = useState('');
    const [filterCNS, setFilterCNS] = useState('');
    
    useEffect(() => {
      async function fetchData() {
        const response = await api.get('/user');
        setListUserState(response.data);
      }
      fetchData();
    }, []);

    const filteredUsers = listUserState.filter(user => 
      user.nome.toLowerCase().includes(filterName.toLowerCase()) &&
      user.cns.toLowerCase().includes(filterCNS.toLowerCase())
    );
    
    const getUserStatus = (status) => {
      return status === 1 
        ? <Badge color="success">Ativo</Badge> 
        : <Badge color="failure">Inativo</Badge>;
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

    function ShowResetedPasswordModal ({password, onClose}) {
      setResetPassModal(false);
      return (
       <Modal show={showResetedPasswordModal} dismissible size="md" onClose={() => setShowResetedPasswordModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-yellow-400 dark:text-gray-200" />
              <p className='mx-auto mb-4 text-center text-zinc-600'>Senha resetada com suceso! A nova senha do usuário é:</p>
              <input id="senha-campo" type="text"
              className="col-span-6 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={password}
              disabled
              readOnly
              />
              <Clipboard valueToCopy={password} label="Copiar" className='w-20 ml-36 my-2'/>
              <div className="flex justify-center gap-4">
                <Button color="success" onClick={() => setShowResetedPasswordModal(false)}>
                  {"Ok"}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal> 
      )
    }

    async function onSubmitResetPassword(password, user){
      console.log('onSubmitResetPassword chamado');
      setResetPassModal(false);
      try{
        const response = await 
            api.patch(`/user/${user.id}`, {
            senha: password
          })
        console.log(response.data);
        setShowResetedPasswordModal(true);
        setGeneratedPassword(password);
        toast.success(`Senha do usuário ${user.nome} resetada com sucesso`)
      }catch(e){
        console.log(e)
        console.log(e.message)
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
        toast.success('Usuário deletado com sucesso', {
          position:"top-center"
        });
        updateUserList();
      } catch (err) {
        toast.error('Erro ao deletar usuário');
      }
    };

    const onSubmitSaveUser = async (e) => {
      console.log(e)
      const {nome, email, cns, role, status, id} = e;
      try {
        await api.patch(`/user/${id}`, {
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
        } finally {
          setOpenModal(false);
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
              onClick={() => {
                setOpenModal(true);
                setUserAction(user);
              }}
            >
                <FiEdit size={16} className='my-1'/>
              </Button>
            </Tooltip>
            
            <Tooltip content="Resetar Senha" animation="duration-500">
              <Button size="sm" color="warning" className="mr-2" onClick={()=> {handleModalForResetPassword(user)}}>
                <HiOutlineKey  size={16} className='my-1' />
              </Button>
            </Tooltip>
            
            <Tooltip content="Deletar Usuário" animation="duration-500">
              <Button size="sm" color="failure" onClick={() => handleModalForDeleteUser(user.id, user.nome)}>
                <HiOutlineX size={16} className='my-1'/>
              </Button>
            </Tooltip>
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
        <div className="flex justify-center space-x-8">
          <input 
            type="text" 
            placeholder="Filtrar por Nome" 
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
            className="p-2 border rounded"
          />
          <input 
            type="text" 
            placeholder="Filtrar por CNS" 
            value={filterCNS}
            onChange={(e) => setFilterCNS(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        {filteredUsers.length > 0 ? (
          <>
            <PaginationComponent />
            <div className="overflow-x-auto ">
              <Table striped>
                <TableHeaderFlowbite />
                <Table.Body className="divide-y">
                  {filteredUsers.slice(indexOfFirstItem, indexOfLastItem).map((user) => (
                    <TableCellFlowbite key={user.id} user={user} />
                  ))}
                </Table.Body>
              </Table>
            </div>
            {modalDelete ? <ModalDeleteComponent /> : null}
            {openModal ? <EditUserModal 
                          isOpen={openModal} 
                          onSubmit={onSubmitSaveUser}
                          onClose={() => {setOpenModal(false)} }
                          user={userAction} 
                          /> : null}
            {resetPassModal ? 
                          <ResetPasswordModal 
                          isOpen={resetPassModal} 
                          onClose={()=> setResetPassModal(false)}
                          onSubmit={onSubmitResetPassword}
                          userAction={userAction} 
                          /> : null}
          {showResetedPasswordModal ? 
          <ShowResetedPasswordModal 
            password={generatedPassword}
            onClose={() => setShowResetedPasswordModal(false)}
          /> : null}
          </>
        ) : (
          <div className='flex flex-row justify-center center-center p-20 text-center'>
            <Spinner size='xl' />
          </div>
        )}
      </Container>
      <ToastContainer />
    </div>
    );
  }
