import TableSelectionComponent from "../components/TableSelectionComponent";
import { Title } from "../layout/Title";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const TableVehicles = () =>{
    
    return(
        <>
            <Title title={'Inventario de Vehículos '  } icon={<FontAwesomeIcon className='text-5xl text-white
                ' icon='fa-solid fa-list-check'  />}/>
            <TableSelectionComponent  />
        </>
    )
};

export default TableVehicles;