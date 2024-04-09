// src/__tests__/ConfirmationScreen.test.tsx
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import ConfirmationScreen from '../components/ConfirmationScreen';
import * as storeModule from '../state/store';
// Importa directamente useStore y useNavigate

import * as ReactRouter from 'react-router-dom';

const mockUseStore = jest.spyOn(storeModule, 'useStore');
const mockNavigate = jest.spyOn(ReactRouter, 'useNavigate');
// Mock de useStore y useNavigate utilizando jest.mock directamente en el módulo
jest.mock('../state/store', () => ({
  ...jest.requireActual('../state/store'), // Utiliza las implementaciones reales excepto para lo que se sobrescribe
  useStore: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // Mantiene las implementaciones reales de react-router-dom
  useNavigate: jest.fn(), // Sobrescribe useNavigate con un mock
}));

describe('ConfirmationScreen Component', () => {
  // Configura los datos mock y las implementaciones de los mocks antes de cada prueba
  beforeEach(() => {
    mockUseStore.mockImplementation(() => ({
      selectedTimeslot: { date: '2023-04-14', timeslot: '10:00' },
      selectedServiceId: 1,
      services: [{ id: 1, name: 'Window Cleaning', description: 'Cleaning of windows' }],
      confirmBooking: jest.fn(),
    }));
  
    mockNavigate.mockImplementation(() => jest.fn());
  });

  it('renders with selected service and timeslot', () => {
    render(
      <Router>
        <ConfirmationScreen setStep={jest.fn()} />
      </Router>
    );

    expect(screen.getByText('Confirmar Reserva')).toBeInTheDocument();
    expect(screen.getByText('Fecha: 2023-04-14')).toBeInTheDocument();
    expect(screen.getByText('Horario: 10:00')).toBeInTheDocument();
  });

  it('confirms booking on Confirm button click', async () => {
    const setStepMock = jest.fn();
    render(
      <Router>
        <ConfirmationScreen setStep={setStepMock} />
      </Router>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Confirmar' }));
    
    expect(setStepMock).toHaveBeenCalledWith(4);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
