import React, { useState } from 'react';
import { FaCalendarAlt, FaCalendarPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
const FooterContainer = styled.footer`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #ccc;
`;

const IconWrapper = styled.div<{ $isSelected: boolean }>`
  cursor: pointer;
  border: 2px solid transparent; /* Borde transparente por defecto */
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;

  /* Estilo cuando está seleccionado */
  ${({ $isSelected }) => $isSelected && `
    border-bottom: 2px solid #007bff;
   color:#007bff; /* Cambia el color de fondo */
  `}

  &:hover {
    color: #007bff;
  }
`;
const IconText = styled.div`
  margin-top: 8px; // Espaciado entre el icono y el texto
  font-size: 0.75rem; // Tamaño del texto
`;


const Footer : React.FC<{setStep : (step: number) => void}> =({setStep}) =>  {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleReservasClick = () => {
    console.log('Navegar a las reservas del usuario');
    setSelected('reservas');
    navigate('/bookings');
    setStep(1);
  };

  const handleNuevaReservaClick = () => {
    console.log('Navegar a hacer una nueva reserva');
    setSelected('nuevaReserva');
    navigate('/');
    setStep(1);
  };

  return (
    <FooterContainer>
      <IconWrapper
        onClick={handleReservasClick}
        $isSelected={selected === 'reservas'}
      >
        <FaCalendarAlt size="1.5em" title="Mis turnos" />
       <IconText>Mis turnos</IconText>
      </IconWrapper>
      <IconWrapper
        onClick={handleNuevaReservaClick}
        $isSelected={selected === 'nuevaReserva'}
      >
        <FaCalendarPlus size="1.5em" title="Hacer una reserva" />
        <IconText>Hacer una reserva</IconText>
       
      </IconWrapper>
    </FooterContainer>
  );
}

export default Footer;

