
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main>
        {/* <Outlet> renderiza la página actual (Home, Producto, Carrito...) */}
        <Outlet /> 
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;