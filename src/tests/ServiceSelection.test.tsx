
import React from 'react';
import { render, fireEvent ,screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceSelection from '../components/ServiceSelection';
import { BrowserRouter as Router } from 'react-router-dom';
interface IService {
  id: number;
  name: string;
  description: string;
}

interface ICategory {
  category: string;
  services: IService[];
}

describe('ServiceSelection Component', () => {
  const categoriesArray: ICategory[] = [
    { category: 'Cleaning', services: [{ id: 1, name: 'Window Cleaning', description: 'Cleaning of windows' }] },
    { category: 'Maintenance', services: [{ id: 2, name: 'AC Repair', description: 'Air conditioner maintenance' }] }
  ];
  
  it('should render with correct initial state', () => {
    render(<Router><ServiceSelection categoriesArray={categoriesArray} setStep={() => {}} /></Router>);
    expect(screen.getByText('Categorías')).toBeInTheDocument();
    expect(screen.getByText('Cleaning')).toBeInTheDocument();
    expect(screen.getByText('Maintenance')).toBeInTheDocument();
  });

  it('should expand category to show services on click', () => {
   
    render(<Router><ServiceSelection categoriesArray={categoriesArray} setStep={() => {}} /></Router>);
    
    fireEvent.click(screen.getByText('Cleaning'));
    
    expect(screen.getByText('Window Cleaning')).toBeInTheDocument();
    expect(screen.getByText('Cleaning of windows')).toBeInTheDocument();
    expect(screen.queryByText('AC Repair')).not.toBeInTheDocument(); // Maintenance category is not clicked, hence services should not be visible.
  });

  it('should select a service on click and enable the Next button', () => {
     render(<Router><ServiceSelection categoriesArray={categoriesArray} setStep={() => {}} /></Router>);
  
    // Expanding the category to show services
    fireEvent.click(screen.getByText('Cleaning'));
  
    // Clicking on a service to select it
    fireEvent.click(screen.getByText('Window Cleaning'));
  
    // Checking if the Next button is enabled after a service is selected
    const nextButton = screen.getByRole('button', { name: 'Siguiente' });
    expect(nextButton).not.toBeDisabled();
  });
});
