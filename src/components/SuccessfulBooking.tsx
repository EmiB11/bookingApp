
import React from 'react';
import styled from 'styled-components';
import { useNavigate , useLocation } from 'react-router-dom';

const SuccessContainer = styled.div`
  padding: 20px;
  text-align: center;
`;

const SuccessMessage = styled.h2`
  color: #4caf50;
  margin-bottom: 20px;
`;

const BookingDetails = styled.div`
  margin-bottom: 15px;
  font-size: 1.2rem;
`;

const StartNewButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #4b5c6b;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #448aff;
  }
`;


const SuccessfulBooking: React.FC<{setStep : (step: number) => void}> = ({setStep}) => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const dataState = location.state ;
  

  const handleNewBooking = () => {
     setStep(1);
    navigate('/');
  };

  return (
    <SuccessContainer>
      <SuccessMessage>¡Reserva Confirmada!</SuccessMessage>
      <BookingDetails>{dataState?.service.name}</BookingDetails>
      <BookingDetails>{dataState?.service.description}</BookingDetails>
      <BookingDetails>Fecha: {dataState?.timeslot.date}</BookingDetails>
      <BookingDetails>Horario:{dataState?.timeslot.timeslot} </BookingDetails>
      <StartNewButton onClick={handleNewBooking}>Iniciar Nueva Reserva</StartNewButton>
    </SuccessContainer>
  );
};

export default SuccessfulBooking;
