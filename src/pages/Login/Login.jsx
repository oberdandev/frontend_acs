import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../../components/Spinner';
import { useQuery } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { api } from '../../services/api';

 
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


const Login = () => {

  const { register, handleSubmit, formState: { errors }, setValue, setFocus, watch } = useForm();
  const [isPendingLogin, setPendingLogin] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);

  useEffect(() => {
    if(focusPassword){
      setFocus('password');
    }
  })



  const onSubmit = async (data) => {
    try {
      setPendingLogin(true);

      const formattedData = {
        ...data,
        cpf: data.cpf.replace(/\D/g, '') // Remove os caracteres não numéricos do CPF.
      };

      const response = await axios.post('/login', {
          cpf: formattedData.cpf,
          password: formattedData.password
        });

        if (response.status === 200) {
          
          const token = response.data.token
          toast.success('Login efetuado com sucesso!');
          
          if(token) 
            localStorage.setItem('token', token); 
        } 

        if(response.status === '404')
          toast.error(response.data.message);
      
      } catch (e) {
        console.log(e.message)

        const message = e.response?.data?.message || 'Erro ao efetuar login. Tente novamente.'
        toast.error(message) 
      } finally {
        setPendingLogin(false);
      }
  };

  function ImageLeft (props) {
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
            onChange={(e) => {
              
              setValue('cpf', e.target.value)

            }} // Ensure the value is set correctly
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


  function InputPassword() {
    const [showPassword, setShowPassword] = useState(false);
  
    const toggleShowPassword = () => {
      setShowPassword(!showPassword);
      setFocus('password');
    };
  
    return (
      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-gray-600">Senha</label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          {...register('password', validatePassword)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 pr-10"
          autoComplete="off"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-1 px-2 py-11 focus:outline-none flex items-center justify-center"
        >
        {showPassword ? <FaEyeSlash className='text-gray-300'/> : <FaEye className='text-gray-300' />}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <ToastContainer />
      {/* Left: Image */}
      <ImageLeft imgSrc='https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat'/>
      {/* Right: Login Form */}
      <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2 flex justify-center">
        <div className=" w-96 ">
          <h1 className="text-2xl font-semibold mb-4">Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputCPF />
            {/* Password Input */}
            <InputPassword />
           
            {/* Forgot Password Link */}
            <div className="mb-6 text-blue-500">
              <a href="#" className="hover:underline">Esqueceu a senha?</a>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              className={`bg-blue-500  text-white font-semibold rounded-md py-2 px-4 w-full ${isPendingLogin ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'}`}
              disabled={isPendingLogin}
            >
              {isPendingLogin ? <Spinner /> : 'Acessar'}
            </button>
          </form>
          {/* Sign up Link */}
          <div className="mt-6 text-blue-500 text-center">
            <NavLink  key={'register'} to={'/register'}>
              <a href="#" className="hover:underline">Cadastre-se aqui!</a>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;