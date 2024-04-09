// src/state/store.ts
import {create} from 'zustand';
import IService from '../interfaces/Iservice';


interface IUserBooking {
  service: IService;
  date: string;
  timeslot: string;
}

interface ITimesSlot {
  date: string;
  timeslot: string;
}

interface BookingState {
  // Estados
  services: IService[];
  userBookings: IUserBooking[];
  selectedServiceId: number | null;
  selectedTimeslot: ITimesSlot | null;

  // Acciones
  setServices: (services: IService[]) => void;
  setUserBookings: (bookings: IUserBooking[]) => void;
  selectService: (id: number) => void;
  selectTimeslot: (timeslot: ITimesSlot) => void;
  confirmBooking: () => void;
  cancelBooking: (bookingIndex: number) => void;
}

export const useStore = create<BookingState>((set) => ({
  // Estados iniciales
  services: [],
  userBookings: [],
  selectedServiceId: null,
  selectedTimeslot: null,

  // Implementación de acciones
  setServices: (services) => set(() => ({ services })),
  setUserBookings: (bookings) => set(() => ({ userBookings: bookings })),
  selectService: (id) => set(() => ({ selectedServiceId: id })),
  selectTimeslot: (timeslot) => set(() => ({ selectedTimeslot: timeslot })),
  confirmBooking: () => set((state) => {
    const selectedService = state.services.find(service => service.id === state.selectedServiceId);
    if (selectedService && state.selectedTimeslot) {
      const newBooking: IUserBooking = {
        service: selectedService,
        date: state.selectedTimeslot.date, // Asegúrate de establecer la fecha correctamente
        timeslot: state.selectedTimeslot.timeslot,
      };
      return {
        userBookings: [...state.userBookings, newBooking],
        selectedServiceId: null, // Limpiamos la selección
        selectedTimeslot: null, // Limpiamos la selección
      };
    }
    // Devolvemos el estado existente si no se cumple la condición
    return state;
  }),
  cancelBooking: (bookingIndex) => set((state) => ({
    userBookings: state.userBookings.filter((_, index) => index !== bookingIndex),
  })),
}));
