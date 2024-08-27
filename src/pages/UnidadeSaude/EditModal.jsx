import { useForm } from 'react-hook-form';
import { Modal, Button } from 'flowbite-react';
import { useEffect } from 'react';
import {validateCNES, validateEmail} from '../../utils/validations.js';

const EditUnidadeModal = ({ isOpen, onClose, onSubmit, unidade }) => {
  const { register, handleSubmit, setFocus, formState: { errors }} = useForm();

  return (
    <Modal show={isOpen} onClose={onClose} dismissible>
      <Modal.Header>
        Editar Unidade
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block mb-2 text-sm font-medium
             text-gray-900 dark:text-white">
              Nome
            </label>
            <input hidden type="number" id="id" value={unidade.id} {...register('id')}/>
            <input 
              id="nome"
              {...register('nome')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm 
              rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              defaultValue={unidade.nome}
              required
            />
          </div>
          <div>
            <label htmlFor="cnes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              CNES
            </label>
            <input
              defaultValue={unidade.cnes}
              id="cnes"
              {...register('cnes', validateCNES)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
            {errors.cns && <p className="text-red-500 text-sm">{errors.cns.message}</p>}
          </div>
          <div>
            <label htmlFor="bairro" className="block mb-2 text-sm font-medium
             text-gray-900 dark:text-white">
              Bairro
            </label>
            <input
              defaultValue={unidade.bairro}
              id="bairro"
              {...register('bairro')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="telefone" className="block mb-2 text-sm font-medium
             text-gray-900 dark:text-white">
              Telefone
            </label>
            <input
              defaultValue={unidade.telefone}
              id="telefone"
              type="telefone"
              {...register('telefone')}
              className="bg-gray-50 border border-gray-300 text-gray-900 
              text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500
               block w-full p-2.5"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              defaultValue={unidade.email}
              id="email"
              {...register('email', validateEmail)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
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
          <Button type='submit'>
            Salvar
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditUnidadeModal;