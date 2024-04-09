// src/components/ScheduleSelection.tsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { useStore } from '../state/store';
import IAvailableTimeslot from '../interfaces/IAvailableTimeslot';
import { useNavigate } from 'react-router-dom';
interface ITimesSlot {
  date: string;
  timeslot: string;
}
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  justify-content: space-between;
  padding: 20px;
 
`;
const Container = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  margin: 20px; 
`;

const TimeslotContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  padding: 10px;
`;

const TimeslotButton = styled.button<{ $isSelected: boolean }>`
  padding: 10px;
  margin: 2px;
  border: 1px solid ${({ $isSelected }) => ($isSelected ? '#4caf50' : '#ccc')};
  background-color: ${({ $isSelected }) => ($isSelected ? '#e8f5e9' : '#fff')};
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: ${({ $isSelected }) => ($isSelected ? '#c8e6c9' : '#f5f5f5')};
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
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
`;

const ButtonContainer = styled.div`
display: flex;
justify-content: space-between;
margin-top: 20px;
border-top: 1px solid #ccc;
padding-top: 10px;
padding-bottom: 25px;
padding-right: 20px;

`;



const ScheduleSelection: React.FC<{ slots : IAvailableTimeslot , setStep: (step: number) => void}> = ({ slots , setStep }) => {
  const [selectedTimeslot, setSelectedTimeslot] = useState<string | null>(null);
  const { selectTimeslot } = useStore();
 const navigate = useNavigate();

  const handleTimeslotSelect = (slots : ITimesSlot ) => {
    setSelectedTimeslot(slots.timeslot);
    selectTimeslot(slots);
  };

  function formatDate(date : Date) {
    
    if (!(date instanceof Date)) date = new Date(date);
  
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
  
    const dia = date.getDate();
    const mes = meses[date.getMonth()];
  
    return `${dia} de ${mes}`;
  }
    
  return (
    <MainContainer>
    <Container>
    <h3>Próximos turnos disponibles:</h3>
    <p>{formatDate(new Date(slots.date))}</p>
    <TimeslotContainer>
      {slots.availableTimeslots?.map((timeslot) => (
        <TimeslotButton
          key={timeslot}
          $isSelected={selectedTimeslot === timeslot}
          onClick={() => handleTimeslotSelect({timeslot, date: slots.date})}
        >  
           
          <p>{timeslot}</p>
        </TimeslotButton>
      ))}
    </TimeslotContainer>
    </Container>
    <ButtonContainer>
       <ButtonBack onClick={() => {
        setStep(1);
        navigate('/');
       }}>
        Anterior
      </ButtonBack>
       <Button disabled={!selectedTimeslot} onClick={() => {
        setStep(3);
        navigate('/confirmation');
       }}>
        Siguiente
      </Button>
    </ButtonContainer>
    </MainContainer>
  );
};

export default ScheduleSelection;
