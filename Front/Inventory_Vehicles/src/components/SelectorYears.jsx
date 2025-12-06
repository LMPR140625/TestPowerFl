import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SelectorYears(props) {
  const [año, setAño] = useState(new Date().getFullYear());

  // Generar un array de años (ej: 1990 - 2025)
  const años = [];
  for (let i = 1950; i <= new Date().getFullYear(); i++) {
    años.push(i);
  }

  return (
    <div className="flex flex-row">
            <FontAwesomeIcon icon={props.icon} className='flex-initial text-2xl pt-2 text-cyan-800'/>
            <div className="block flex-wrap px-2 ml-5 w-full py-2 border border-gray-300 hover:text-yellow-800 text-green-200 placeholder:text-green-200 rounded-md shadow-lg shadow-cyan-600 
                                    focus:outline-none focus:ring-yellow-600 focus:border-gray-600 sm:text-sm bg-cyan-800" >
            <label className='' htmlFor="selector-año">Selecciona un año:</label>
            <select className=''
                id="selector-año"
                value={props.valor} onChange={props.onInputChange}
            >
                {años.map(a => (
                <option key={a} value={a}>{a}</option>
                ))}
            </select>
            </div>
        </div>
    
  );
}

export default SelectorYears;