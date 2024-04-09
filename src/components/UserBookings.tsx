// src/components/UserBookings.tsx
import React from 'react';
import styled from 'styled-components';
import { useStore } from '../state/store';

const BookingsContainer = styled.div`
  padding: 20px;
`;

const BookingCard = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const NoBookingsMessage = styled.p`
  text-align: center;
`;

const UserBookings: React.FC = () => {
  // Esta data debería ser reemplazada con la recuperada del estado global o de la API
  const bookings = useStore((state) => state.userBookings); // Suponiendo que 'userBookings' es parte de tu estado global

  return (
    <BookingsContainer>
      {bookings.length > 0 ? (
        bookings.map((booking, index) => (
          <BookingCard key={index}>
            <h3>{booking.service.name}</h3>
            <p>Fecha: {booking.date}</p>
            <p>Horario: {booking.timeslot}</p>
            {/* Más detalles de la reserva según se requiera */}
          </BookingCard>
        ))
      ) : (
        <NoBookingsMessage>No tienes reservas actualmente.</NoBookingsMessage>
      )}
    </BookingsContainer>
  );
};

export default UserBookings;
