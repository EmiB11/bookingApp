// src/__tests__/ScheduleSelection.test.tsx
import React from 'react';
import { render, fireEvent , screen} from '@testing-library/react';
import '@testing-library/jest-dom';

import { BrowserRouter as Router } from 'react-router-dom';
import ScheduleSelection from '../components/ScheduleSelection';

interface ISlots {
    date: string;
    serviceId: number;
    availableTimeslots: string[];
}

const mockSlots: ISlots = {
  date: '2023-04-14',
  availableTimeslots: ['10:00', '11:00', '12:00'],
  serviceId: 1
};

describe('ScheduleSelection Component', () => {
    it('renders correctly and formats the date', () => {
        render(
          <Router>
            <ScheduleSelection slots={mockSlots} setStep={() => {}} />
          </Router>
        );
        expect(screen.getByText('Próximos turnos disponibles:')).toBeInTheDocument();
        // Aquí, asumimos que la fecha se formatea correctamente a "13 de abril", lo que dependerá de la implementación real del componente
        expect(screen.getByText('13 de abril')).toBeInTheDocument(); 
        mockSlots.availableTimeslots.forEach(timeslot => {
          expect(screen.getByText(timeslot)).toBeInTheDocument();
        });
      });
    
      it('selects a timeslot and enables the Next button', () => {
        render(
          <Router>
            <ScheduleSelection slots={mockSlots} setStep={() => {}} />
          </Router>
        );
        // Simulate clicking on a timeslot
    fireEvent.click(screen.getByText('10:00'));

    // The Next button should be enabled after selecting a timeslot
    const nextButton = screen.getByRole('button', { name: 'Siguiente' });
    expect(nextButton).not.toBeDisabled();
      });
});
  it('allows navigation back on the Previous button click', () => {
    const mockSetStep = jest.fn();
    render(
        <Router>
          <ScheduleSelection slots={mockSlots} setStep={mockSetStep}/>
        </Router>
      );
    // Simulate clicking on the Previous button
    fireEvent.click(screen.getByRole('button', { name: /Anterior/i }));


    // Verify setStep was called to navigate back
    expect(mockSetStep).toHaveBeenCalledWith(1);
  });

 

