import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout'; // Asumiendo que existe src/layouts/MainLayout.jsx
// Importaciones de páginas
import  HomePage  from './pages/HomePage'
import FormVehicle from './pages/FormNewVehicle';
import ListVehicles from './pages/TableVehicles';
import DetailVehicles from './pages/DetailVehicle';
import Login from './pages/Login';
import './App.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AOS from 'aos';
import "aos/dist/aos.css"


//#region FontAwesomeIcons
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser,faCopyright,faCar, faCalendar, faIdCardClip,faSignal,
  faFloppyDisk, faCarSide, faListCheck, faHexagonNodes,faCalendarPlus,
  faCircleInfo, faDoorOpen,faHouseChimney, faBan, faTrashCan,faMagnifyingGlass,
  faEye, faKey,  faUsersGear,  faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons'; 


library.add(faUser,faCopyright,faCar, faCalendar, faIdCardClip,faSignal, faKey,
  faFloppyDisk, faCarSide, faListCheck, faHexagonNodes,faCalendarPlus,faUsersGear,
  faCircleInfo, faDoorOpen,faHouseChimney, faBan, faTrashCan,faMagnifyingGlass,faEye
,faArrowRightFromBracket);

//#endregion

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos para considerar los datos obsoletos
      cacheTime: 1000 * 60 * 10, // 10 minutos para eliminar los datos inactivos
    },
  },
});
function App() {


  useEffect(() =>{
    AOS.init({
      duration:800,
      once:true
    });
  },[])


  return (
    <QueryClientProvider client={queryClient}>
    <Routes>
      <Route path='/' element={<MainLayout/>}>
        <Route index element={<HomePage/>} />
        <Route path='/newVehicle/:vehicleId' element={<FormVehicle/>} />
        <Route path='/listVehicle' element={<ListVehicles/>} />
        <Route path='/detailVehicle' element={<DetailVehicles/>} />
      </Route>

      <Route path='/login' element={<Login/>} />
    </Routes>
    </QueryClientProvider>
  )
}

export default App