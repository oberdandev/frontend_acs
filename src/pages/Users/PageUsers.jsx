import React, { useEffect, useState, useRef } from 'react';
import { api } from "../../services/api";
import { toast, ToastContainer } from 'react-toastify';
import { FaRegEdit } from "react-icons/fa";

export default function PageUsers() {
  const [listUserState, setListUserState] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/user')
      setListUserState(response.data)
    }
    fetchData()
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
            <option value="1">Ativo</option>
            <option value="0">Inativo</option>
          </select>
        </td>
        <td className="p-3 px-5 flex justify-end">
          <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => onSubmitSave(user.id, refs)}>Salvar</button>
          <button type="button" className="mr-3 text-sm bg-yellow-500 hover:bg-yellow-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Resetar Senha</button>
          <button type="button" onClick={() => deleteUser(user.id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline">Deletar</button>
        </td>
      </tr>
    );
  }

  const UserTable = () => (
    <div className="text-gray-900 bg-gray-200 max-h-screen max-w-screen container">
      <div className="p-4 flex">
        <h1 className="text-3xl">Usuários</h1>
      </div>
      <div className="px-3 py-4 flex justify-center w-full">
        <table className="w-full text-md bg-white shadow-md rounded mb-4">
          <thead>
            <tr className="border-b">
              <th className="text-left p-3 px-5">ID</th>
              <th className="text-left p-3 px-5">CPF</th>
              <th className="text-left p-3 px-5">Nome</th>
              <th className="text-left p-3 px-5">Email</th>
              <th className="text-left p-3 px-5">CNS</th>
              <th className="text-left p-3 px-5">Role</th>
              <th className="text-left p-3 px-5">Status</th>
              <th></th>
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
      <ToastContainer />
      {listUserState.length > 0 ? <UserTable /> : <p>Loading...</p>}
    </>
  );
}
