// src/components/ConfirmationScreen.tsx
import React from 'react';
import styled from 'styled-components';
import { useStore } from '../state/store';
import { useNavigate } from 'react-router-dom';

const ConfirmationContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ConfirmationDetail = styled.div`
  margin-bottom: 15px;
  font-size: 1.2rem;
`;

const ConfirmButton = styled.button`
padding: 10px 20px;
margin-top: 20px;
border: none;
border-radius: 5px;
background-color: #4b5c6b;
color: white;
cursor: pointer;
&:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
`;
const ButtonBack = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #4b5c6b;
  color: white;
  cursor: pointer;
   margin-left: 10px;
`;

const ButtonContainer = styled.div`
display: flex;
justify-content: space-between;
margin-top: 20px;
border-top: 1px solid #ccc;
padding-top: 10px;
padding-bottom: 25px;
padding-right: 20px;
flex: 1;
`;

const ConfirmationScreen: React.FC<{setStep: (step: number) => void}> = ({setStep}) => {
  const { selectedTimeslot, selectedServiceId} = useStore();
  const navigate = useNavigate();
  const service = useStore((state) => state.services.find((service) => service.id === selectedServiceId));
  const {confirmBooking} = useStore();

  const handleConfirmation = () => {
    confirmBooking();
    navigate('/booking-confirmed', { state: { service: service, timeslot: selectedTimeslot } });
    setStep(4);
  };

  return (
    <>
    <ConfirmationContainer>
      <h2>Confirmar Reserva</h2>
      <ConfirmationDetail>{service?.name}</ConfirmationDetail>
      <ConfirmationDetail>{service?.description}</ConfirmationDetail>
      <ConfirmationDetail>Fecha: {selectedTimeslot?.date}</ConfirmationDetail>
      <ConfirmationDetail>Horario: {selectedTimeslot?.timeslot}</ConfirmationDetail>
    </ConfirmationContainer>
    <ButtonContainer>
      <ButtonBack onClick={() =>{ 
        setStep(2)
        navigate('/schedule')
      }}>
          Anterior
      </ButtonBack>
      <ConfirmButton onClick={handleConfirmation}>Confirmar</ConfirmButton>
    </ButtonContainer>
      </>
  );
};

export default ConfirmationScreen;
