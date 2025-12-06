import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function SelectorStatus(props) {
  

  // Generar un array de años (ej: 1990 - 2025)
  const statusLst = [
    {"id":1, "desc":"Disponible"},
    {"id":2, "desc":"Mantenimiento"},
    {"id":3, "desc":"Fuera de Servicio"}
  ];

  return (
    <div className="flex flex-row">
            <FontAwesomeIcon icon={props.icon} className='flex-initial text-2xl pt-2 text-cyan-800'/>
            <div className="block flex-wrap px-2 ml-5 w-full py-2  border border-gray-300 hover:text-yellow-800 text-green-200 placeholder:text-green-200 rounded-md shadow-lg shadow-cyan-600 
                                    focus:outline-none focus:ring-yellow-600 focus:border-gray-600 sm:text-sm bg-cyan-800" >
            <label className='' htmlFor="selector-estatus">Selecciona un estatus:</label>
            <select className=''
                id="selector-estatus"
                value={props.valor} onChange={props.onInputChange}
                
            >
                {statusLst.map((st) => (
                <option key={st.id} value={st.id}>{st.desc}</option>
                ))}
            </select>
            </div>
        </div>
    
  );
}

export default SelectorStatus;