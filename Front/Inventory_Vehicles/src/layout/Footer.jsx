import React from 'react';

const Footer = () => {
  return (
    <div className="bg-cyan-800 text-white fixed bottom-0 right-0 w-full ">
      <div className="text-center">
        <p>&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
        <div className="mt-2">
          <a href="#" className="mx-2 hover:text-gray-400">Política de Privacidad</a>
          <a href="#" className="mx-2 hover:text-gray-400">Términos de Servicio</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;