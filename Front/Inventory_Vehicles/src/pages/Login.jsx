import React , {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroSection } from '../layout/Hero';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import InputSearch from '../components/InputSearch'
import ButtonSearch from '../components/ButtonSearch'
import Footer from '../layout/Footer';
import HomePage from '../pages/HomePage';
import AlertComponent from '../components/AlertComponent';
import { useLogin } from '../hooks/useLogin';

const Login = () => {
  const [NameUser, setNameUser] = useState('');
  const [PassHash, setPassHash] = useState('');
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState(null); 
  const [isSpinner, setisSpinner] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [tipoAlerta, setTipoAlerta] = useState('');
  const { mutate, isLoading, isError, isSuccess, error } = useLogin();
  
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    // Lógica de autenticación...
     const user = { NameUser, PassHash }

    mutate(user,{
       onSuccess: (res) => {
        if(res.data != null){
          localStorage.setItem('apiToken', res.data);
          navigate('/');  // Redirige al usuario a la ruta '/' después del login exitoso
        } else  {
          setIsShowAlert(true)
          setMensajeAlerta('Usuario y/o contraseña incorrecta.');
          setTipoAlerta('error');
          setisSpinner(false);
        }
      },
      onError:() =>{
        setIsShowAlert(true)
        setMensajeAlerta('Error al momento de iniciar sesión, vuelve a intentar');
        setTipoAlerta('error');
        setisSpinner(false);
      } } ); 
  };

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  return (
    <>
    <HeroSection title='Sistema Inventario Vehiculos' description={getDate()}
     icon={<FontAwesomeIcon className='text-7xl text-[bg-linear-to-r from-gray-100 via-gray-400 to-gray-100]
      ' icon='fa-solid fa-users-gear' />}/>
    <div className='pt-5'>
                {isShowAlert ? (
                    <AlertComponent  message={mensajeAlerta} type={tipoAlerta}/>
                ) : null}
    </div>
    <form onSubmit={handleSubmit} className='pt-5 pb-10'>

      <div>
        <FontAwesomeIcon className='pr-2 text-3xl text-[bg-linear-to-r from-gray-100 via-gray-400 to-gray-100] text-cyan-700
      ' icon='fa-solid fa-user' />
        <input className='mb-1 h-9 border border-gray-300 hover:text-cyan-600 placeholder:text-cyan-600 rounded-md shadow-lg shadow-cyan-600 
        focus:outline-none focus:ring-cyan-600 focus:border-cyan-600 sm:text-sm' placeholder='Usuario'
          type="text" 
          id='NameUser'
          value={NameUser} 
          onChange={(e) => setNameUser(e.target.value)} 
          required 
        />
      </div>

      <div className='pt-5'>
        <FontAwesomeIcon className='pr-2 text-3xl text-[bg-linear-to-r from-gray-100 via-gray-400 to-gray-100] text-cyan-700
      ' icon='fa-solid fa-key' />
        <input className='h-9  border border-gray-300 hover:text-cyan-600 placeholder:text-cyan-600 rounded-md shadow-lg shadow-cyan-600 
        focus:outline-none focus:ring-cyan-600 focus:border-cyan-600 sm:text-sm' placeholder='Contraseña'
          type="password" 
           id='PassHash'
          value={PassHash} 
          onChange={(e) => setPassHash(e.target.value)} 
          required 
        />
      </div>
      
      <button className='mt-7 border rounded-full w-35 h-10 font-bold border-gray-300  text-white  shadow-lg shadow-cyan-600 
        focus:outline-none focus:ring-cyan-600 focus:border-cyan-600 sm:text-sm bg-cyan-700 hover:text-cyan-700 hover:bg-white' type="submit" disabled={isLoading}>
        {isSpinner ? 'Iniciando ...' : 'Iniciar Sersión '}
      </button>
    </form>
    <Footer />
    </>
  );
};

export default Login;