import { useEffect, useState, useRef } from 'react';
import { api } from "../../services/api";
import { toast, ToastContainer } from 'react-toastify';
import Container from '../../components/Container/index.jsx';
import { Table, Button, Select, Navbar, Badge, Modal, Tooltip, Label, Spinner, Clipboard} from 'flowbite-react';
import { FiEdit } from "react-icons/fi";
import { HiOutlineExclamationCircle, HiOutlineKey, HiOutlineX } from 'react-icons/hi';
import EditUnidadeModal from './EditModal.jsx';

export default function PageUnidades() {
  const [listUnidadeState, setListUnidadeState] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Número de itens por página
  const [openModal, setOpenModal] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [unidadeToDelete, setUnidadeToDelete] = useState(null);
  const [unidadeAction, setUnidadeAction] = useState(null);
  const [filterName, setFilterName] = useState('');
  const [filterCNES, setFilterCNES] = useState('');
  
  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/unidade');
      setListUnidadeState(response.data);
    }
    fetchData();
  }, []);

  const filteredUnidades = listUnidadeState.filter(unidade => 
    unidade.nome.toLowerCase().includes(filterName.toLowerCase()) &&
    unidade.cnes.toLowerCase().includes(filterCNES.toLowerCase())
  );
  
  const getUnidadeStatus = (status) => {
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
              Você tem certeza que deseja excluir esta unidade? <br/><b>{unidadeToDelete.unidadeName}</b>
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => {
                setModalDelete(false);
                deleteUnidade(unidadeToDelete.unidadeID)
              }}>
                {"Sim, tenho certeza"}
              </Button>
              <Button color="gray" 
                onClick={() => {
                  setModalDelete(false)
                  setUnidadeToDelete(null)
                  } }>
                Não, cancelar.
              </Button>  
            </div>
          </div>
        </Modal.Body>
      </Modal>
      )
  }

  function handleModalForDeleteUnidade(unidadeID, unidadeName){
    setUnidadeToDelete({unidadeID, unidadeName})
    setModalDelete(true);
  }

  const updateUnidadeList = async () => {
    const response = await api.get('/unidade');
    setListUnidadeState(response.data);
  };

  const deleteUnidade = async (unidadeID) => {
    try {
      await api.delete(`/unidade/${unidadeID}`);
      toast.success('Unidade deletada com sucesso', {
        position:"top-center"
      });
      updateUnidadeList();
    } catch (err) {
      toast.error('Erro ao deletar unidade');
    }
  };

  const onSubmitSaveUnidade = async (e) => {
    console.log(e)
    const {cnes, nome, bairro, telefone, email, status, id} = e;
    try {
      await api.patch(`/unidade/${id}`, {
        cnes,
        nome,
        bairro,
        telefone,
        email,
        status
      });
      toast.success('Unidade atualizada com sucesso');
      updateUnidadeList();
    } catch (err) {
      toast.error('Erro ao atualizar unidade');
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
            Gerenciar Unidades
          </span>
        </Navbar.Brand>
      </Navbar>
    );
  };

  const TableHeaderFlowbite = () => {
    return (
      <Table.Head>
        <Table.HeadCell>ID</Table.HeadCell>
        <Table.HeadCell>CNES</Table.HeadCell>
        <Table.HeadCell>NOME</Table.HeadCell>
        <Table.HeadCell>EMAIL</Table.HeadCell>
        <Table.HeadCell>TELEFONE</Table.HeadCell>
        <Table.HeadCell>BAIRRO</Table.HeadCell>
        <Table.HeadCell>LOGRADOURO</Table.HeadCell>
        <Table.HeadCell>STATUS</Table.HeadCell>
        <Table.HeadCell>Ações</Table.HeadCell>
      </Table.Head>
    );
  };

  const TableCellFlowbite = ({ unidade }) => {
    const cnesRef = useRef();
    const nomeRef = useRef();
    const bairroRef = useRef();
    const telefoneRef = useRef();
    const emailRef = useRef();
    const logradouroRef = useRef();
    const idRef = useRef();
    const statusRef = useRef();

    const refs = {
      cnes: cnesRef,
      nome: nomeRef,
      bairro: bairroRef,
      telefone: telefoneRef,
      email: emailRef,
      logradouro: logradouroRef
    };

    return (
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell ref={idRef}>{unidade.id}</Table.Cell>
        <Table.Cell ref={cnesRef}>{unidade.cnes}</Table.Cell>
        <Table.Cell ref={nomeRef}>{unidade.nome}</Table.Cell>
        <Table.Cell ref={bairroRef}>{unidade.bairro}</Table.Cell>
        <Table.Cell ref={telefoneRef}>{unidade.telefone}</Table.Cell>
        <Table.Cell ref={emailRef}>{unidade.email}</Table.Cell>
        <Table.Cell ref={logradouroRef}>{unidade.logradouro}</Table.Cell>
        <Table.Cell ref={statusRef}>{getUnidadeStatus(unidade.status)}</Table.Cell>
        <Table.Cell className="flex">
          <Tooltip content="Editar Unidade" animation='duration-500'>
            <Button
              size="sm"
              color="blue"
              className="mr-2"
              onClick={() => {
                setOpenModal(true);
                setUnidadeAction(unidade);
              }}
            >
              <FiEdit size={16} className='my-1'/>
            </Button>
          </Tooltip>
          
          <Tooltip content="Deletar Unidade" animation="duration-500">
            <Button size="sm" color="failure" onClick={() => handleModalForDeleteUnidade(unidade.id, unidade.nome)}>
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
  const currentItems = listUnidadeState.slice(indexOfFirstItem, indexOfLastItem);

  const TableFlowbite = () => {
    return (
      <div className="overflow-x-auto ">
        <Table striped>
          <TableHeaderFlowbite />
          <Table.Body className="divide-y">
            {currentItems.map((unidade) => (
              <TableCellFlowbite key={unidade.id} unidade={unidade} />
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  };

  const PaginationComponent = () => {
    const totalPages = Math.ceil(listUnidadeState.length / itemsPerPage);

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
          placeholder="Filtrar por CNES" 
          value={filterCNES}
          onChange={(e) => setFilterCNES(e.target.value)}
          className="p-2 border rounded"
        />
      </div>

      {filteredUnidades.length > 0 ? (
        <>
          <PaginationComponent />
          <div className="overflow-x-auto ">
            <Table striped>
              <TableHeaderFlowbite />
              <Table.Body className="divide-y">
                {filteredUnidades.slice(indexOfFirstItem, indexOfLastItem).map((unidade) => (
                  <TableCellFlowbite key={unidade.id} unidade={unidade} />
                ))}
              </Table.Body>
            </Table>
          </div>
          {modalDelete ? <ModalDeleteComponent /> : null}
          {openModal ? <EditUnidadeModal 
                        isOpen={openModal} 
                        onSubmit={onSubmitSaveUnidade}
                        onClose={() => {setOpenModal(false)} }
                        unidade={unidadeAction} 
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
