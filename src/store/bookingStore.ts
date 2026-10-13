import { create } from 'zustand';

import { createBooking } from '../api/bookingsApi';
import { Booking, Slot } from '../types/booking';

type BookingStatus = 'idle' | 'pending' | 'confirmed' | 'conflict' | 'error';

interface BookingState {
  status: BookingStatus;
  booking: Booking | null;
  bookings: Booking[];
  error: string | null;

  submitBooking: (doctorId: string, slot: Slot) => Promise<void>;

  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set, get) => ({
  status: 'idle',
  booking: null,
  bookings: [],
  error: null,

  submitBooking: async (doctorId, slot) => {
    const optimisticBooking: Booking = {
      id: `pending-${Date.now()}`,
      doctorId,
      slotId: slot.id,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    set({
      status: 'pending',
      booking: optimisticBooking,
      error: null,
    });

    try {
      const booking = await createBooking({
        doctorId,
        slot,
      });

      set({
        status: 'confirmed',
        booking,
        bookings: [...get().bookings, booking],
        error: null,
      });
    } catch (error) {
      if (error instanceof Error && error.message === 'BOOKING_CONFLICT') {
        set({
          status: 'conflict',
          booking: null,
          error:
            'This slot is no longer available. Please choose another time.',
        });

        return;
      }

      set({
        status: 'error',
        booking: null,
        error: 'Unable to confirm your appointment. Please try again.',
      });
    }
  },

  resetBooking: () => {
    set({
      status: 'idle',
      booking: null,
      error: null,
    });
  },
}));
