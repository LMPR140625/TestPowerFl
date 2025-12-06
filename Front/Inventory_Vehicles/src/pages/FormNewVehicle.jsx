import { Title } from "../layout/Title";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import  InputComponent  from '../components/InputComponent';
import { useState, useEffect } from "react";
import AlertComponent from '../components/AlertComponent';
import { useParams } from "react-router-dom";
import SelectorYears from "../components/SelectorYears";
import SelectorStatus from "../components/SelectorStatus";
import { apiClient } from '../api/apiClient';

const FormNewVehicle = () =>{
    const { vehicleId } = useParams();
    const [errors, setErrors] = useState({});
    const [isSpinner, setisSpinner] = useState(false);
    const [isShowAlert, setIsShowAlert] = useState(false);
    const [mensajeAlerta, setMensajeAlerta] = useState('');
    const [tipoAlerta, setTipoAlerta] = useState('');
    const [vehicle, setVehicle] = useState({
        brand:'',
        model:'',
        year:2025,
        plate:'',
        state:1,
        id:0
    });

    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [plate, setPlate] = useState('');
    const [state, setState] = useState(1);

    const [recargar, setRecargar] = useState(0);
    const [dataVehicle, setDataVehicle ] = useState({}) 

    useEffect(() => {
        const controlador = new AbortController();
        const senal = controlador.signal;

        // Recuperar información del vehiculo
        const fetchVehicules = async() => {
            try{
            const res = await apiClient.post('/vehicleId', {  
                                body: vehicleId
                                }) ;

                if (res.status == 'success'){
                setDataVehicle(res.data[0]);
                asignData(res.data[0]);
                }
            } catch (error){
                console.error(error);
            }
        }

        if(vehicleId > 0){
        fetchVehicules();
        }            

        //Abortar petición
        return() =>{
            controlador.abort();
        }
    },[recargar]);

    const handleInputBrand = (event) =>{
    setBrand(event.target.value)};

    const handleInputModel = (event) =>{
    setModel(event.target.value)};

    const handleInputYear = (event) =>{
    setYear(event.target.value)};

    const handleInputPlate = (event) =>{
    setPlate(event.target.value)};

    const handleInputState = (event) =>{
        console.log("event",event);
    setState(event.target.value)};

    const handleSubmit = async(event) => {  
        event.preventDefault();

        vehicle.brand = brand;
        vehicle.model = model;
        vehicle.year = year;
        vehicle.plate = plate;
        vehicle.state = state;
        vehicle.id = vehicleId;
        let data = JSON.stringify(vehicle);

        if(validate()){
               
        // Handle form data
         setisSpinner(true);
        // Simula una carga
        //await delay(1000);
        

        // Simula una carga
        //await delay(1000);
        
        
        const res = await apiClient.put('/vehicleId', {body: vehicle});
        
        setVehicle({});
        
        if(res.status == 'error'){
            setIsShowAlert(true)
            setMensajeAlerta('Existió un problema al validar el vehiculo, intenta de nuevo');
            setTipoAlerta('error');
            console.log('Problemas con el servidor de bd');
            setisSpinner(false);

        } else if(res.status == 'success'){
            setIsShowAlert(true)
            setMensajeAlerta('Vehiculo Registrado !');
            setTipoAlerta('success');
            setisSpinner(false);
            cleanForm();
        }        
    }};

    const validate = () =>{

        let tempErrors = {};
        if (brand == '') tempErrors.brand = 'La información de la marca es requerida.';
        if (model == '') tempErrors.model = 'La información del modelo es requerida.';
        //if (year == '') tempErrors.brand = 'La información de la marca es requerida.';
        if (plate == '') tempErrors.plate = 'La información de la placa es requerida.';
        //if (brand == '') tempErrors.brand = 'La información de la marca es requerida.';
        
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
        
    };

    const asignData = (dataVehicle) =>{
        setBrand(dataVehicle.BRAND);
        setModel(dataVehicle.MODEL);
        setYear(dataVehicle.YEEAR);
        setPlate(dataVehicle.PLATE);
        setState(dataVehicle.STATEID);
    }

    const cleanForm = () =>{
        setBrand('');
        setModel('');
        setYear('');
        setPlate('');
        setState('');
    }

    return(
        <>
            <Title title={'Agregar / Modificar Vehiculo '  } icon={<FontAwesomeIcon className='text-5xl text-white
                ' icon='fa-solid fa-car'  />}/>

                <div className='pt-5'>
                            {isShowAlert ? (
                                <AlertComponent  message={mensajeAlerta} type={tipoAlerta}/>
                            ) : null}
                </div>

                <form className=" px-10 pt-10 pb-10" >
                    <div className="mb-10 pr-10 ">
                        <InputComponent icon='fa-solid fa-copyright' placeHolder='  Marca:' valor={brand} onInputChange={handleInputBrand}/>
                        {errors.brand && <p style={{ color: 'red' }}>{errors.brand}</p>}
                    </div>
                    <div className="mb-10 pr-10 ">
                            <InputComponent icon='fa-solid fa-car-side' placeHolder='Modelo:' valor={model} onInputChange={handleInputModel}/>
                        {errors.model && <p style={{ color: 'red' }}>{errors.model}</p>}
                    </div>
                    <div className="mb-10 pr-10  ">
                        <SelectorYears icon='fa-solid fa-calendar-plus' placeHolder='   Año' valor={year} onInputChange={handleInputYear}/>
                        {errors.year && <p style={{ color: 'red' }}>{errors.year}</p>}
                    </div>
                    <div className="mb-10 pr-10 ">
                        <InputComponent icon='fa-solid fa-id-card-clip' placeHolder=' Placa' valor={plate} onInputChange={handleInputPlate}/>
                        {errors.plate && <p style={{ color: 'red' }}>{errors.plate}</p>}
                    </div>
                    <div className="mb-8  pr-10 ">
                        <SelectorStatus icon='fa-solid fa-signal' placeHolder=' Estado' valor={state} onInputChange={handleInputState}/>                        
                        {errors.state && <p style={{ color: 'red' }}>{errors.state}</p>}
                    </div>

                    <button onClick={handleSubmit}   className=" w-100 border mt-5 ssm:mx-60 lg:mx-50 border-gray-300 bg-cyan-600
                         hover:bg-white hover:text-cyan-800 text-white
                                 placeholder:text-cyan-600 rounded shadow-lg shadow-cyan-600">                                    
                                    <FontAwesomeIcon icon='fa-solid fa-floppy-disk' className='text-2xl  px-2'/>
                                    {isSpinner ? 'Registrando vehiculo ...' : 'Guardar '}
                        </button> 
                </form> 
        </>
    )
};

export default FormNewVehicle;