import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const InputComponent = (props) => {

    return(
        <div className="flex flex-row">
            <FontAwesomeIcon icon={props.icon} className='flex-initial text-2xl pt-2 text-cyan-800'/>
            <input className="block flex-wrap px-5 ml-5 w-full py-2 border border-gray-300 hover:text-white text-white placeholder:text-white rounded-md shadow-lg shadow-cyan-600 
                                    focus:outline-none focus:ring-yellow-600 focus:border-gray-600 sm:text-sm bg-cyan-800" 
                    placeholder={props.placeHolder} 
                    value={props.valor} onChange={props.onInputChange}></input>
        </div>
    )
}

export default InputComponent;