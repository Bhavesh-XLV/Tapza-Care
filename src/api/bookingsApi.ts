import { mockRequest } from './client';

import { Booking, Slot } from '../types/booking';

interface CreateBookingRequest {
  doctorId: string;
  slot: Slot;
}

const bookedSlotIds = new Set<string>();

export async function createBooking(
  request: CreateBookingRequest,
): Promise<Booking> {
  if (!request.slot.available || bookedSlotIds.has(request.slot.id)) {
    await mockRequest(null);

    throw new Error('BOOKING_CONFLICT');
  }

  await mockRequest(null);

  bookedSlotIds.add(request.slot.id);

  const booking: Booking = {
    id: `booking-${Date.now()}`,
    doctorId: request.doctorId,
    slotId: request.slot.id,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  return booking;
}
