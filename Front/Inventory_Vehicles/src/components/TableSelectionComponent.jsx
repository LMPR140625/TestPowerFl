import DataTable, { createTheme } from 'react-data-table-component'
import differenceBy from 'lodash.differenceby';
import React,{ useState, useEffect } from "react";
import SearchComponent from './SearchComponent';
import { Link } from 'react-router-dom';
import ConfirmacionComponent from './ConfirmacionComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { apiClient } from '../api/apiClient';

const TableSelectionComponent = (props) => {
    const [toggleCleared, setToggleCleared] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vehicleId, setVehicleId] = useState(0);
    const columns = [
        { name: "Id", selector: row => row.ID },
        { name: "Marca", selector: row => row.BRAND },
        { name: "Modelo", selector: row => row.MODEL },
        { name: "Año", selector: row => row.YEEAR },
        { name: "Placa", selector: row => row.PLATE },
        { name: "Estatus", selector: row => row.STATUSID },
    ];

//const filteredItems = dataex.filter(item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()));
    

  const [data, setData ] = useState([]);
       // Estado para controlar la recarga, agregar un contador
      const [recargar, setRecargar] = useState(0);
  
      useEffect(() => {
          const controlador = new AbortController();
          const senal = controlador.signal;
          const token = localStorage.getItem('apiToken'); 
          // Recuperar información del vehículo
          const fetchVehicules = async() => {
              try{
                  const res = await apiClient.get('/vehicle');
  
                  if (res.status == 'success'){
                  setData(res.data);
                  }

                  if (res.status == 'error'){
                  
                  setData([]);
                  }
              } catch (error){
                  console.error(error);
              }
          }
  
          fetchVehicules();
  
          //Abortar petición
          return() =>{
              controlador.abort();
          }
      },[recargar]);

     // 1. Manejador inicial: Abre el modal y guarda el ID
    const handleDeleteRequest = (vehicleId) => {
        setVehicleId(vehicleId);
        setIsModalOpen(true);
    };

    // 2. Manejador de confirmación: Realiza la eliminación real
    const handleConfirmDelete = async() => {
        console.log(`Eliminando vehículo con ID: ${vehicleId}`);
        
        // Lógica de eliminación: filtramos la lista para quitar el usuario
        try{
            console.log(`antes vehículo con ID: ${vehicleId}`);
            const res = await apiClient.del('/vehicleId', { 
                    body: vehicleId
                        }) ;
            console.log(`Erestsdsffsd: ${res}`);
            if(res.status == 'error'){
            } else if(res.status == 'success'){
            setRecargar(cont => cont + 1);  
            }     
        } catch(error){
            console.error(error)
        }
        
        // Cierra el modal y limpia el ID
        handleCloseModal();
    };

    // 3. Manejador de cancelación: Solo cierra el modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setVehicleId(0); // Importante limpiar el estado
    };

    const viewStatus = (st) =>{
        switch(st){
            case 1:
                return <p className='text-green-600'>Disponible</p>
            case 2:
                return <p className='text-yellow-600'>Mantenimiento</p>
            case 3:
                return <p className='text-red-600'>Fuera de Servicio</p>
        }
    }
      
    return(  
        <>
            <div className="flex flex-col pt-10 pb-10" data-aos="fade-rigth">
                {/* Renderizado condicional del modal */}
                {isModalOpen && (
                    <ConfirmacionComponent
                    message={`¿Estás seguro de que quieres eliminar al vehículo con ID ${vehicleId}?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCloseModal}
                    />
                )}
			<div className="overflow-x-auto">
				<div className="p-1.5 w-full inline-block align-middle ">
					<div className="overflow-hidden border rounded-lg ">
						<table className="min-w-full divide-y divide-gray-200 text-center ">
							<thead className="bg-cyan-800 text-center ">
								<tr >
                                    {columns.map((column, index) => (
                                        <th key={index} className="py-3 px-4 text-center text-white">{column.name}</th>
                                    ))}
                                    <th  className="py-3 px-4  text-white">Editar</th>
                                    <th className="py-3 px-4  text-white">Eliminar</th>
                                </tr>
							</thead>
							<tbody className="divide-y divide-gray-200 text-center">
                                {data.map((vehicle, index) => (
                                    // Es crucial añadir un "key" único a cada elemento renderizado para la eficiencia de React.
                                    <tr 
                                    key={vehicle.ID} 
                                    className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-cyan-100 `}
                                    >
                                    <td className="py-3 px-4 ">{vehicle.ID}</td>
                                    <td className="py-3 px-4">{vehicle.BRAND}</td>
                                    <td className="py-3 px-4">{vehicle.MODEL}</td>
                                    <td className="py-3 px-4">{vehicle.YEEAR}</td>
                                    <td className="py-3 px-4">{vehicle.PLATE}</td>
                                    <td className="py-3 px-4">{viewStatus(vehicle.STATEID)}</td>
                                    <td className="px-0 py-4 text-sm font-medium text-center whitespace-nowrap">
										 <Link to={`/newVehicle/${vehicle.ID}`} className='border py-2 px-1 rounded-2xl bg-green-600 text-gray-100 hover:bg-green-200 hover:text-green-600'>
                                            <FontAwesomeIcon className='text-lg ' icon='fa-solid fa-eye'  />
                                            <span className='ml-1'>Editar</span>
                                        </Link>
									</td>
									<td className="px-0 py-4 text-sm font-medium text-center whitespace-nowrap">
										<button className="cursor-pointer border py-2 px-1 rounded-2xl bg-red-600 text-gray-100 hover:bg-red-200 hover:text-red-600" onClick={() => handleDeleteRequest(vehicle.ID)}>
											<FontAwesomeIcon className='text-lg' icon='fa-solid fa-trash-can'  />
                                            <span className='ml-1'>Eliminar</span>
										</button>
									</td>
                                    </tr>
                                ))}

							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
        </>        
    );
}

export default TableSelectionComponent;