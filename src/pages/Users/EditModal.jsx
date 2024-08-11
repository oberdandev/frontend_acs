import { useForm } from 'react-hook-form';
import { Modal, Button } from 'flowbite-react';
import { useEffect } from 'react';

const EditUserModal = ({ isOpen, onClose, onSubmit, defaultValues }) => {
  const { register, handleSubmit, setFocus} = useForm({
    defaultValues,
  });

  setFocus('name');

  return (
    <Modal show={isOpen} onClose={onClose} dismissible>
      <Modal.Header>
        Editar Usuário
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium
             text-gray-900 dark:text-white">
              Nome
            </label>
            <input
              id="name"
              {...register('name')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
              rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium
             text-gray-900 dark:text-white">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
               block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="cns" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              CNS (Cartão SUS)
            </label>
            <input
              id="cns"
              {...register('cns')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium
             text-gray-900 dark:text-white">
              Role
            </label>
            <select
              id="role"
              {...register('role')}
              className="bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
              <option value="PROFISSIONAL">Profissional</option>
              <option value="COORDENADOR">Coordenador</option>
            </select>
          </div>
          <div>
            <label htmlFor="status" className="block mb-2 text-sm font-medium 
            text-gray-900 dark:text-white">
              Status
            </label>
            <select
              id="status"
              {...register('status')}
              className="bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-blue-500 
              focus:border-blue-500 block w-full p-2.5"
              required
            >
              <option value={1}>Ativo</option>
              <option value={0}>Inativo</option>
            </select>
          </div>
          <Button type="submit">
            Salvar
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUserModal;