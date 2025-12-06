import  rsvg  from '../assets/react.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const CardComponent = (props) =>{

    const renderStatus = () =>{
        
        switch(props.status){
            case 1:
                return <span class="inline-block bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-700 mr-2 mb-2 animate-pulse">#disponible</span>;
                break;
            case 2:
                return <span class="inline-block bg-yellow-200 rounded-full px-3 py-1 text-sm font-semibold text-yellow-700 mr-2 mb-2 animate-pulse">#mantenimiento</span>;
                break;
            case 3:
                return <span class="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-red-700 mr-2 mb-2 animate-pulse">#fuera de servicio</span>;
                break;
        }
    }
    return(
        <div class="w-full rounded overflow-hidden shadow-lg">
            
            <div className="px-10">
                <div className="font-bold text-xl mb-2">{props.field}</div>
                {props.body}
            </div>
            <div className="px-6 pt-10 pb-5">

            {props.field == 'Estado' 
            ? renderStatus()
            : ''}

            <div className='relative pr-100'>
                <FontAwesomeIcon className='text-2xl text-black
                ' icon={props.icon}  />
            </div>
                
            </div>
        </div>
    )
}

export default CardComponent;