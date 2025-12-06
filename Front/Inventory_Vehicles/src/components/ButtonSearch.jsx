import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const ButtonSearch = (props) => {
    return(
            <div className='px-5 pt-1 hover:text-cyan-600'>
                <button onClick={props.onClickButton} type='number'
             className='inline-flex w-fit  border border-gray-300 bg-cyan-600 hover:bg-white text-white font-bold hover:text-cyan-600 placeholder:text-cyan-600 rounded-md shadow-lg shadow-cyan-600 ' 
              ><FontAwesomeIcon className='text-4xl' icon='fa-solid fa-magnifying-glass' />
              <span className='px-5 pt-1'>Buscar</span>
              </button>
            </div>
    );
}

export default ButtonSearch;