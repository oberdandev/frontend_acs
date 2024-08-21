import React, { useEffect, useState, useRef } from 'react';
import { api } from "../../services/api.js";
import { toast, ToastContainer } from 'react-toastify';
import { FaRegEdit } from "react-icons/fa";
import {Modal} from '../../components/Modal/Modal.jsx'
import Container from '../../components/Container/index.jsx';
import { Navbar, Table } from "flowbite-react";
import { Button } from "flowbite-react";

const HeaderObjects = [
  "CNES",
  "NOME",
  "TIPO DE UNIDADE",
  "BAIRRO",
  "LOGRADOURO",
  "CIDADE",
  "CEP",
  "TELEFONE",
  "EMAIL",
  "DIRETOR",
  "LOCALIZAÇÃO",
]

function ButtonFlowbite (){
  return (
    <Button>
      Teste
    </Button>
  )
}

const TitleHeaderComponent = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Unidades de Saúde
        </span>
      </Navbar.Brand>
    </Navbar>
  );
};


const tableHeader = () => {
  return (
    <>
      <Table.HeadCell>CNES</Table.HeadCell>
      <Table.HeadCell>NOME</Table.HeadCell>
      <Table.HeadCell>TIPO</Table.HeadCell>
      <Table.HeadCell>BAIRRO</Table.HeadCell>
      <Table.HeadCell>LOGRADOURO</Table.HeadCell>
      <Table.HeadCell>CEP</Table.HeadCell>
      <Table.HeadCell>EMAIL</Table.HeadCell>
      <Table.HeadCell>DIRETOR</Table.HeadCell>
      <Table.HeadCell>LOCALIZAÇÃO</Table.HeadCell>
    </>
  )
}

export default function PageUsers() {
  const [listUserState, setListUserState] = useState([]);
  const [listUnidades, setListUnidades] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/user')
      setListUserState(response.data)
    }
    async function fetchUnidadeData() {
      const response = await api.get('/unidade')
      setListUnidades(response.data);
      console.log('listUnidades: ', listUnidades, ' - Unidade.jsx - line 73')
      console.log(response);
    }
    fetchData();
    fetchUnidadeData();
  }, []);

  const updateUserList = async () => {
    const response = await api.get('/user');
    setListUserState(response.data);
  }

  const deleteUser = async (userID) => {
    try {
      await api.delete(`/user/${userID}`)
      toast.success('Usuário deletado com sucesso')
      updateUserList();
    } catch (err) {
      toast.error('Erro ao deletar usuário')
    }
  }

  const onSubmitSave = async (userID, refs) => {
    const nome = refs.nome.current.value;
    const email = refs.email.current.value;
    const cns = refs.cns.current.value;
    const role = refs.role.current.value;
    const status = refs.status.current.value;
    console.log(userID, nome, email, cns, role, status);

    try {
      const response = await api.patch(`/user/${userID}`, {
        nome,
        email,
        cns,
        role,
        status
      });
      toast.success('Usuário atualizado com sucesso')
      updateUserList();
    } catch (err) {
      toast.error('Erro ao atualizar usuário')
      console.log(err)
    } 
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
      <tr className="border-b hover:bg-orange-100 bg-gray-100">
        <td className="p-3 px-5">{user.id}</td>
        <td className="p-3 bg-transparent focus:outline-none border:none"><input id="cpf" name="cpf" type="text" defaultValue={user.cpf} className="bg-transparent" readOnly /></td>
        <td className="p-3 px-5"><input id="nome" name="nome" type="text" defaultValue={user.nome} className="bg-transparent" ref={nomeRef} /></td>
        <td className="p-3 px-5"><input id="email" name="email" defaultValue={user.email} className="bg-transparent" ref={emailRef} /></td>
        <td className="p-3 px-5"><input id="cns" name="cns" type="text" defaultValue={user.cns} className="bg-transparent" ref={cnsRef} /></td>
        <td className="p-3 px-5">
          <select name="role" defaultValue={user.role} className="bg-transparent" ref={roleRef}>
            <option value="USER">user</option>
            <option value="ADMIN">admin</option>
            <option value="PROFISSIONAL">profissional</option>
            <option value="COORDENADOR">coordenador</option>
          </select>
        </td>
        <td className="p-3 px-5">
          <select name="status" defaultValue={user.status} className="bg-transparent" ref={statusRef}>
            <option  value={1}>Ativo</option>
            <option value={0}>Inativo</option>
          </select>
        </td>
        <td className="p-3 px-5 flex justify-end">
          <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => onSubmitSave(user.id, refs)}>+</button>
          <button type="button" className="mr-3 text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">-</button>
          <button type="button" onClick={() => deleteUser(user.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">x</button>
        </td>
      </tr>
    );
  }

  const UserTable = () => (
    <div className="text-gray-900 bg-gray-200 max-h-screen max-w-screen container">
      <div className="p-4 flex">
        <h1 className="text-3xl">Usuários</h1>
      </div>
      <div className="px-2` py-2 flex justify-center w-full">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <thead>
            <tr className="border-b">
              <th className="">ID</th>
              <th className="">CPF</th>
              <th className="text-left p-3 px-5">Nome</th>
              <th className="text-left p-3 px-5">Email</th>
              <th className="text-left p-3 px-5">CNS</th>
              <th className="text-left p-3 px-5">Role</th>
              <th className="text-left p-3 px-5">Status</th>
              <th className="text-left p-3 px-5">Ações</th>
            </tr>
          </thead>
          <tbody>
            {listUserState.map(user => (
              <UserRow key={user.id} user={user} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <>
      <div className="w-full min-h-screen h-full ">
        <TitleHeaderComponent className="m-2" />
        <Container>
          <ToastContainer />
        {listUserState.length > 0 ? <UserTable /> : <h1>Carregando...</h1>} 
        </Container>
      </div>
    </>
  );
}
