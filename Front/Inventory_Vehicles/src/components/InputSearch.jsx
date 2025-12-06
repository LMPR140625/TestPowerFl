

const InputSearch = (props) => {
    return(
       <div className="flex gap-5 text-md">
        {props.icon}
        <input placeholder={props.textHolder} onChange={props.onInputChange}
        className="block w-80 px-3 py-2 border border-gray-300 hover:text-cyan-600 placeholder:text-cyan-600 rounded-md shadow-lg shadow-cyan-600 
        focus:outline-none focus:ring-cyan-600 focus:border-cyan-600 sm:text-sm"/>
       </div>
    );
}

export default InputSearch;