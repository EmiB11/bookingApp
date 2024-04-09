import React, { useEffect, useState } from 'react';
import ServiceSelection from './components/ServiceSelection';
import ScheduleSelection from './components/ScheduleSelection';
import ConfirmationScreen from './components/ConfirmationScreen';
import { Route, Routes  } from "react-router-dom";
import IAvailableTimeslot from './interfaces/IAvailableTimeslot';
import { useStore } from './state/store';
import ProgressBar from './components/ProgressBar';
import SuccessfulBooking from './components/SuccessfulBooking';
import UserBookings from './components/UserBookings';
import Footer from './components/Footer';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import servicesJSON from './mock/services.json';
import slotsJSON from './mock/slots.json';
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  
`;

const Content = styled.div`
  flex: 1; 
  
`;
function App() {
 const [slots, setSlots] = useState({} as IAvailableTimeslot);
 const [categoriesArray , setCategoriesArray] = useState([] as {category: string,  services: {id: number, name: string, description: string}[]}[]);
 const { setServices } = useStore();
 const [currentStep, setCurrentStep] = useState(1);
 const [currentRoute , setCurrentRoute] = useState('');
 const location = useLocation();

  useEffect(() => {

     //simulacion de llamada a api
    Promise.all([servicesJSON, slotsJSON])
    .then(([dataService, slots]) => {
       // Mock data services
       const categoriesMap : {[key: string]: {category: string,  services: {id: number, name: string, description: string}[]}} = {};
       setServices(dataService.services);
       for(const service of dataService.services) {
 
       if(!categoriesMap[service.category]) {
   
        categoriesMap[service.category] = {
         category: service.category,
          services: [{id: service.id, name: service.name, description: service.description}],
      

       };
       } else {
   
       categoriesMap[service.category].services.push({id: service.id, name: service.name, description: service.description});
      }
    }

     const categoriesArray = Object.values(categoriesMap);
     setCategoriesArray(categoriesArray);
     // Mock data slots
     setSlots(slots);
    })
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]); // Escucha cambios en la ubicación
  console.log(currentRoute)
  return (
    <AppContainer >
      <Content>
     { currentRoute !== '/bookings' ? <ProgressBar step={currentStep} /> : null}
      <Routes >
        <Route path="/" element={<ServiceSelection categoriesArray={categoriesArray} setStep={setCurrentStep}/>} />
        <Route path="/schedule" element={<ScheduleSelection  slots={slots} setStep={setCurrentStep}/>} />
        <Route path="/confirmation" element={<ConfirmationScreen setStep={setCurrentStep} />} />
        <Route path='/booking-confirmed' element={<SuccessfulBooking  setStep={setCurrentStep}/>} />
        <Route path= '/bookings' element={<UserBookings/>} />
        
      </Routes>
        </Content>
        <Footer setStep={setCurrentStep} />
    </AppContainer>
  );
}

export default App;
