import { HeroSection } from "../layout/Hero"
import { useNavigate } from 'react-router-dom';;
import MainLayout from "../layout/MainLayout";
import { Title } from "../layout/Title";
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLogin } from '../hooks/useLogin.js'
import { toNumber } from "lodash";

const HomePage = () =>{
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('apiToken');
        if(token == null){
            navigate('/login')
        }
    },[]);

    const handleNew = () => {
        navigate('/newVehicle/:0'); 
    }

    const handleShow = () => {
        navigate('/listVehicle'); 
    }

    const handleDetail = () => {
        navigate('/detailVehicle'); 
    }


    const { data: user, isLoading, isError } = useQuery({
        queryKey: ['user'],
        queryFn: useLogin,
        // La función de consulta es opcional aquí si sabes que los datos ya estarán en caché
        // o si tienes una función de "fetchUser" en caso de que el token exista pero no la caché.
        // En este caso, simplemente usamos los datos de la caché si existen.
    });
    
    return(
            <>
                <Title title={'Bienvenido '  } icon={<FontAwesomeIcon className='text-5xl text-white
                ' icon='fa-solid fa-door-open'  />}/>

                <div className="grid  pt-40" data-aos="fade-rigth">
                   <div className=" grid-cols-3">
                        <button onClick={handleNew} className="border text-5xl text-white h-35 w-70 mr-15  border-gray-300 bg-cyan-600 hover:bg-white  hover:text-cyan-600 placeholder:text-cyan-600 rounded-md shadow-lg shadow-cyan-600 '">
                            <FontAwesomeIcon className='text-5xl 
                                ' icon='fa-solid fa-car'  /> Agregar vehículos
                        </button>

                        <button onClick={handleShow} className="border text-5xl text-white h-35 w-70 mr-15  border-gray-300 bg-cyan-600 hover:bg-white  hover:text-cyan-600 placeholder:text-cyan-600 rounded-md shadow-lg shadow-cyan-600">
                             <FontAwesomeIcon className='text-5xl 
                                ' icon='fa-solid fa-list-check'  /> Listado de vehículos
                        </button>

                        <button onClick={handleDetail} className="border text-5xl text-white h-35 w-70 mr-15  border-gray-300 bg-cyan-600 hover:bg-white  hover:text-cyan-600 placeholder:text-cyan-600 rounded-md shadow-lg shadow-cyan-600">
                             <FontAwesomeIcon className='text-5xl 
                                ' icon='fa-solid fa-circle-info'  /> Detalle de vehículos
                        </button>
                    </div>

                </div>
            </>
    );
}

export default HomePage;