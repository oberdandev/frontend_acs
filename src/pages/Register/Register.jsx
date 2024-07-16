import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner';
import { NavLink } from 'react-router-dom';
import { baseUrl } from '../../services/api.js'
import { useNavigate } from 'react-router-dom';


 
const validatePassword = {
  required: 'O campo senha é obrigatório',
  minLength: { value: 6, message: 'A senha deve ter no mínimo 6 caracteres.' }
};

const validateCPF = {
    required: 'Campo obrigatório', 
    pattern: { 
      value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      message: 'CPF inválido'
    }
}

const validateEmail = { 
  required: 'Campo obrigatório', 
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Email inválido'
} }

const PageRegister = () => {
  let navigate = useNavigate();
  // Criar depois toastID e ref de password para não ter bug na validação.
/*   const toastId = useRef(null);
  const passwordRef = useRef(null);  */
  const { register, handleSubmit, formState: { errors }, setValue, setFocus, reset } = useForm();
  const [isPendingLogin, setPendingLogin] = useState(false);

  useEffect(() => {
    if (errors.password) {
      setFocus('password');
    }
  }, [errors.password, setFocus]);

  const onSubmit = async (data) => {
    try {
      setPendingLogin(true);

      const formattedData = {
        ...data,
        cpf: data.cpf.replace(/\D/g, '') // Remove os caracteres não numéricos do CPF.
      };

      const response = await axios.post(baseUrl + '/user', {
          nome: formattedData.nome,
          email: formattedData.email,
          cpf: formattedData.cpf,
          senha: formattedData.password
        });

        if (response.status === 201) {
          setTimeout(() => {
            toast.success('Usuário criado com sucesso! Tente efetuar login.', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }, 100);
          navigate('/login');
       
        }

        if(response.status === '404')
          toast.error(response.data.message);
        
      } catch (e) {
        console.log(e.message)

        const message = e.response?.data?.message || 'Erro ao efetuar cadastro. Tente novamente.'
        toast.error(message) 
      } finally {
        setPendingLogin(false);
        reset();
      }
  };

  function ImageLeft () {
    return (
      <div className="w-2/3 h-screen hidden lg:block">
      <img
        src="/logo.png"
        alt="Placeholder Image"
        className="object-cover w-full h-full bg-sky-800"
      />
    </div>
    )
  }

  function InputCPF () {
    return (
      <>
        <div className="mb-4">
          <label htmlFor="cpf" className="block text-gray-600">CPF</label>
          <InputMask
            mask="999.999.999-99"
            {...register('cpf', validateCPF)}
            onChange={(e) => setValue('cpf', e.target.value)} // Ensure the value is set correctly
        >
            {(inputProps) => (
              <input
                type="text"
                id="cpf"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                {...inputProps}
              />
            )}
          </InputMask>
          {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf.message}</p>}
        </div>
      </>
    )
  }

  function InputEmail () {
    return (
      <>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600">Email</label>
          <input
            type="email"
            id="email"
            {...register('email', validateEmail)}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
      </>
    )
  }

  function InputNome () {
    return (
      <>
        <div className="mb-4">
          <label htmlFor="nome" className="block text-gray-600">Nome</label>
          <input
            type="text"
            id="nome"
            {...register('nome')}
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
            autoComplete="off"
          />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
        </div>
      </>
    )
  }

  function InputPassword () {
    return(
    <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">Senha</label>
              <input
                type="password"
                id="password"
                {...register('password', validatePassword)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
    </div>
    )
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <ToastContainer />
      {/* Left: Image */}
      <ImageLeft imgSrc='https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat'/>
      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 flex justify-center">
        <div className=" w-96 ">
          <h1 className="text-2xl font-semibold mb-4">Cadastrar Usuário</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputCPF />
            {/* Password Input */}
            <InputPassword />
            <InputNome />
            <InputEmail />

            {/* Login Button */}
            <button
              type="submit"
              className={`bg-blue-500  text-white font-semibold rounded-md py-2 px-4 w-full ${isPendingLogin ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
              disabled={isPendingLogin}
            >
              {isPendingLogin ? <Spinner /> : 'Cadastrar'}
            </button>
          </form>
          {/* Sign up Link */}
          <div className="mt-6 text-blue-500 text-center">
            <NavLink key={'login'} to={'/login'}>
              <a href="#" className="hover:underline">Já tem uma conta? <br/> Clique aqui para acessar o sistema.</a>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageRegister;