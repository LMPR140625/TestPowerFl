import { useState, useEffect } from 'react';
import CardComponent from "../components/CardComponent";
import SearchComponent from "../components/SearchComponent";
import { Title } from "../layout/Title";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AlertComponent from '../components/AlertComponent';
import { apiClient } from '../api/apiClient';

const DetailVehicle = () =>{
    const [id, setId] = useState(0);
    const [vehicleId, setVehicleId ] = useState({
        BRAND:'---',
        YEEAR:'---',
        MODEL:'---',
        PLATE:'---',
        STATEID:'---',
    });
    const [isSpinner, setisSpinner] = useState(false);
    const [isShowAlert, setIsShowAlert] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('');
    // Estado para controlar la recarga, agregar un contador
    const [recargar, setRecargar] = useState(0);

    useEffect(() => {
        const controlador = new AbortController();
        const senal = controlador.signal;

        // Recuperar información del vehiculo
        const fetchVehiculeId = async() => {
            try{
                const res = await apiClient.post(`/vehicleId`,
                    {  
                        body: JSON.stringify({'id':id})
                    });

                if (res.status == 'success'){
                const dataResult = res;
                setVehicleId(dataResult.data[0]);
                } else {

                }
            } catch (error){
                console.error(error);
            }
        }

        fetchVehiculeId();

        //Abortar petición
        return() =>{
            controlador.abort();
        }
    },[recargar]);

    const searchVehicleId = async(e) => {  
   
    if(id == 0 ){
        setIsShowAlert(true)
        setMensajeAlerta('Debes ingresar un ID váilido');
        setTipoAlerta('error');
        return
    }
    const controlador = new AbortController();
        const senal = controlador.signal;
        const res = await apiClient.post('/vehicleId', { 
                    body: id
                        }) ;
        
        if(res == 'error'){
            setIsShowAlert(true)
            setMensajeAlerta('El Vehiculo con el ID proporcionado no existe prueba con otro');
            setTipoAlerta('error');
            console.log('Problemas con el servidor de bd');
            setisSpinner(false);
            setVehicleId({BRAND:'---',
                YEEAR:'---',
                MODEL:'---',
                PLATE:'---',
                STATEID:'---'})
        } else if(res.status == 'success'){
            setIsShowAlert(true)
            setMensajeAlerta('Vehiculo Encontrado !');
            setTipoAlerta('success');
            setisSpinner(false);
            setVehicleId(res.data[0]);
        }   }

    const handleInputChange = (event) =>{
    setId(event.target.value);
    };

    return(
        <div className='pb-10'>
            <Title title={'Detalle del Vehiculo '  } icon={<FontAwesomeIcon className='text-5xl text-white
                ' icon='fa-solid fa-circle-info'  />}/>
                <div className='pt-5'>
                            {isShowAlert ? (
                                <AlertComponent  message={mensajeAlerta} type={tipoAlerta}/>
                            ) : null}
                </div>
            <div>
                <SearchComponent textHolder='Ingresa el Id del Vehiculo' onClickButton={searchVehicleId} onInputChange={handleInputChange}/>
            </div>

            <div className="grid grid-cols-3 pt-5">
                <CardComponent field='Marca' icon="fa-solid fa-copyright" body={<p className="text-7xl font-bold">{vehicleId.BRAND} </p>}/>
                <CardComponent field='Modelo' icon="fa-solid fa-hexagon-nodes" body={<p className="text-7xl font-bold">{vehicleId.MODEL} </p>}/>
                <CardComponent field='Año' icon="fa-solid fa-calendar-plus" body={<p className="text-7xl font-bold">{vehicleId.YEEAR}  </p>}/>
            </div>
            <div className="grid grid-cols-2 pt-10">
                <CardComponent field='Placa' icon="fa-solid fa-id-card-clip" body={<p className="text-7xl font-bold">{vehicleId.PLATE}  </p>}/>
                <CardComponent field='Estado' icon="fa-solid fa-signal" status={vehicleId.STATEID} body={<p className="text-7xl font-bold"></p>}/>
            </div>
        </div>
    )
}

export default DetailVehicle;