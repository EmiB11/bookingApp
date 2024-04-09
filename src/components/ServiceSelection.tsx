
import React, { useState } from 'react';
import styled from 'styled-components';
import IService  from '../interfaces/Iservice';
import { useStore } from '../state/store';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 20px;
  border: 1px solid #ccc;
  margin: 20px;
 
`;

const Category = styled.div`
  margin-bottom: 10px;
  & > h2 {
    font-size: 1.3rem;
    cursor: pointer;
    font-weight: 600;
  }
  background-color: #f5f5f5;
`;

const ServiceList = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  background-color: #fff;
`;

const ServiceItem = styled.div<{ $isSelected: boolean }>`
  padding: 10px;
  margin: 5px 0;
  border: 1px solid ${({ $isSelected }) => ($isSelected ? 'blue' : '#ccc')};
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ $isSelected }) => ($isSelected ? '#e6f7ff' : 'none')};
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

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
  border-top: 1px solid #ccc;
  padding-top: 10px;
  padding-bottom: 25px;
  padding-right: 20px;
  flex: 1;
  
`;

const ServiceSelection: React.FC<{categoriesArray: {category: string,  services: {id: number, name: string, description: string}[]}[], setStep: (step: number) => void}> = ({ categoriesArray , setStep}) => {
  const [selectedService, setSelectedService] = useState<IService | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { selectService  } = useStore();
  const navigate = useNavigate();
  const handleServiceSelect = (service: IService) => {
    setSelectedService(service);
    selectService(service.id);
  };

  return (
    <>
    <Container>
      <h1>Categorías</h1>
      {categoriesArray.map((category) => (
        <Category key={category.category} >
          <h2 onClick={() => setExpandedCategory(category.category)}>
            {category.category}
          </h2>
          {expandedCategory === category.category && (
            <ServiceList>
              {category.services.map((service) => (
                <ServiceItem
                  key={service.id}
                  $isSelected={selectedService?.id === service.id}
                  onClick={() => handleServiceSelect(service)}
                >
                  <p>{service.name}</p>
                  <p>{service.description}</p>
                 
                </ServiceItem>
              ))}
            </ServiceList>
          )}
        </Category>
      ))}
    </Container>
      <ButtonContainer>
      
      <Button disabled={!selectedService} onClick={() => {
        setStep(2)
        navigate('/schedule')
        }}>
        Siguiente
      </Button>
      </ButtonContainer>
    </>
  );
};

export default ServiceSelection;
