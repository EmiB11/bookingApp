// src/components/ProgressBar.tsx
import React from 'react';
import styled from 'styled-components';

const ProgressContainer = styled.div`
 
  border-radius: 5px;
  margin: 20px 0;
`;

const ProgressFiller = styled.div<{ step: number }>`
  background-color: #4caf50;
  height: 10px;
  border-radius: 5px;
  width: ${({ step }) => step * 25}%; 
  transition: width 0.6s ease;
`;

const ProgressBar: React.FC<{ step: number }> = ({ step }) => {
  return (
    <ProgressContainer>
      <p style={{ fontWeight: 'bold' , fontSize: '1rem', marginBottom: '0px' ,paddingLeft: '10px'}}>
        {step === 1 ? "Seleccionar servicio" : step === 2 ? "Seleccionar horario" : step === 3 ? "Confirmar turno" : ""}
      </p>
      <ProgressFiller step={step} />
    </ProgressContainer>
  );
};

export default ProgressBar;
