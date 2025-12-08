import React from 'react';

const Footer = () => {
  return (
    <div className="bg-cyan-800 text-white fixed bottom-0 right-0 w-full ">
      <div className="text-center">
        <p>&copy; {new Date().getFullYear()} PowerFleet Test. Todos los derechos reservados.</p>
        <div className="mt-2">
          <a href="#" className="mx-2 hover:text-gray-400">2025</a>
          <a href="#" className="mx-2 hover:text-gray-400">Prueba Técnica</a>
        </div>
      </div>
    </div>
  );
}

export default Footer;