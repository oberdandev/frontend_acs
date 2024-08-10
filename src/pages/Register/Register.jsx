import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner';
import { NavLink } from 'react-router-dom';
import { api, baseUrl } from '../../services/api.js'
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';


const validatePassword = {
  required: 'O campo senha é obrigatório',
  minLength: { value: 6, message: 'A senha deve ter no mínimo 6 caracteres.' }
};

const validateCPF = {
  required: 'Campo obrigatório', 
  pattern: { 
    value: /^\d{11}$/ || /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    message: 'CPF inválido'
  }
};

const validateEmail = { 
  required: 'Campo obrigatório', 
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Email inválido'
  }
};

const validateCNS = {
  required: 'Campo obrigatório',
  minLength: { value: 15, message: 'O Cartão SUS deve ter 15 caracteres.' },
  maxLength: { value: 15, message: 'O Cartão SUS deve ter 15 caracteres.' }
};

const validateNome = {
  required: 'Campo obrigatório'
};

const validateConfirmPassword = (value, password) => 
  value === password || 'As senhas não coincidem';

/* COMPONENTS */
function InputCPF({ register, errors }) {
  return (
    <div className="mb-4">
      <label htmlFor="cpf" className="block text-gray-600">CPF</label>
      <InputMask
        mask="999.999.999-99"
        {...register('cpf', validateCPF)}
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
  )
}

function InputEmail({ register, errors }) {
  return (
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
  )
}

function InputNome({ register, errors }) {
  return (
    <div className="mb-4">
      <label htmlFor="nome" className="block text-gray-600">Nome</label>
      <input
        type="text"
        id="nome"
        {...register('nome', validateNome)}
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autoComplete="off"
      />
      {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
    </div>
  )
}

function InputPassword({ register, errors }) {
  const [showPassword, setShowPassword] = useState(false);

  return(
    <div className="mb-4">
      <label htmlFor="password" className="block text-gray-600">Senha</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          {...register('password', validatePassword)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10 focus:outline-none focus:border-blue-500"
          autoComplete="off"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
      {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
    </div>
  )
}

function InputConfirmPassword({ register, errors, password }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4">
      <label htmlFor="confirmPassword" className="block text-gray-600">Confirme a Senha</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          id="confirmPassword"
          {...register('confirmPassword', { 
            required: 'Campo obrigatório',
            validate: value => validateConfirmPassword(value, password)
          })}
          className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10 focus:outline-none focus:border-blue-500"
          autoComplete="off"
        />
        <button
          type="button"
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5 text-gray-400" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400" />
          )}
        </button>
      </div>
      {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
    </div>
    )
}

function InputCNS({ register, errors }) {
  return (
    <div className="mb-4">
      <label htmlFor="cns" className="block text-gray-600">Cartão SUS</label>
      <input
        type="text"
        id="cns"
        {...register('cns', validateCNS)}
        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        autoComplete="off"
      />
      {errors.cns && <p className="text-red-500 text-sm">{errors.cns.message}</p>}
    </div>
  )
}

function ImageLeft() {
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

/* PAGE COMPONENT */
const PageRegister = () => {
  let navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, setValue, setFocus, reset, watch } = useForm();
  const [isPendingLogin, setPendingLogin] = useState(false);
  let watchCNS = watch('cns');
  let watchCPF = watch('cpf')
  let watchPassword = watch('password');

  useEffect(() => {
    let cpfParsed = watchCPF?.replace(/\D/g, '');

    const fetchDataProfessional = async (CNSorCPF) => {
      try {
        console.log(CNSorCPF);
        const response = await api.get(`/profissional/q/${CNSorCPF}`);

        setValue('nome', response.data.nome);
        setValue('cns', response.data.cns_prof);
        setValue('cpf', response.data.cpf);
        setFocus('email');
      } catch (e) {
        const message = e.response?.data?.message || 'Erro ao buscar profissional';
        toast.error(message);
        console.log(e.response.message);
      }
    };
    
    if(watchCNS && watchCNS.length === 15 || cpfParsed && cpfParsed.length === 11) {
      fetchDataProfessional(cpfParsed || watchCNS);
    }

  }, [watchCNS, watchCPF, setValue, setFocus]);

  const onSubmit = async (data) => {
    try {
      setPendingLogin(true);

      const formattedData = {
        ...data,
        cpf: data.cpf.replace(/\D/g, '') // Remove os caracteres não numéricos do CPF.
      };

      console.log(formattedData.cpf)

      const response = await axios.post(baseUrl + '/user', {
        nome: formattedData.nome,
        email: formattedData.email,
        cpf: formattedData.cpf,
        senha: formattedData.password,
        cns: formattedData.cns
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

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <ToastContainer />
      <ImageLeft imgSrc='https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat'/>
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-2/3 flex justify-center">
        <div className="w-full">
          <h1 className="text-2xl font-semibold mb-4">Cadastrar Usuário</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            <InputCPF register={register} errors={errors}/>
            <InputCNS register={register} errors={errors}/>
            <InputNome register={register} errors={errors}/>
            <InputEmail register={register} errors={errors}/>
            <InputPassword register={register} errors={errors}/>
            <InputConfirmPassword register={register} errors={errors} password={watchPassword}/>
          
            <div className='col-span-2 flex justify-center'> 
            <button
              type="submit"
              className={`bg-blue-500 text-white font-semibold rounded-md py-2 px-4 w-full max-w-90  ${isPendingLogin ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
              disabled={isPendingLogin}
            >
              {isPendingLogin ? <Spinner /> : 'Cadastrar'}
            </button>
            </div>
          </form>
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
