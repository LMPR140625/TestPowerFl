// ConfirmationModal.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ConfirmacionComponent = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed flex justify-center items-center bottom-0 top-0 right-0 left-0 ">
      <div className="bg-white p-5 border-2 text-center shadow-2xl rounded-2xl">
        <p>{message}</p>
        <div className="ml-5 py-3  justify-end">
          <button onClick={onCancel} className="cursor-pointer bg-gray-600 hover:bg-gray-100 text-gray-100 hover:text-gray-700 font-semibold py-2 px-4 border
           border-gray-400 rounded shadow">
            <FontAwesomeIcon className='text-xl 
                ' icon='fa-solid fa-ban'  />
            <span>  Cancelar</span>
          </button>
          <button onClick={onConfirm} className="cursor-pointer bg-red-950 hover:bg-gray-100 text-gray-50 hover:text-red-900 font-semibold py-2 px-4 border
           border-gray-400 rounded shadow">
            <FontAwesomeIcon className='text-xl 
                ' icon='fa-solid fa-trash-can'  />
            <span>  Eliminar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmacionComponent;