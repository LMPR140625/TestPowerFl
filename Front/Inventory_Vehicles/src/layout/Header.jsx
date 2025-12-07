import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const Header = () => {
    const navigate = useNavigate();
    const handleHome = () =>{
      navigate('/');
    }

  return (
    <header>
      <nav className="  inline-grid text-cyan-600" data-aos="fade-rigth">
        <button onClick={handleHome}
             className=' relative lg:left-125 md:left-100  sm:left-0 sm:top-0 md:top-18 border font-bold border-gray-300 bg-cyan-600 hover:bg-white text-white hover:text-cyan-600 placeholder:text-cyan-600 rounded-md shadow-lg shadow-cyan-600 ' 
              ><FontAwesomeIcon className='text-4xl ' icon='fa-solid fa-house-chimney' />
              <span className='px-2'>Inicio</span></button>
              <Link to="/login"
             className=' relative lg:left-125  md:left-100  sm:left-0 sm:top-0 md:top-20 border font-bold border-gray-300 bg-cyan-600 hover:bg-white text-white hover:text-cyan-600 placeholder:text-cyan-600 rounded-md shadow-lg shadow-cyan-600 ' 
              ><FontAwesomeIcon className='text-xl ' icon='fa-solid fa-arrow-right-from-bracket' />
              <span className='px-2'>Salir</span></Link>
      </nav>
    </header>
  );
};

export default Header;