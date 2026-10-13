import slots from '../mocks/slots.json';

import { mockRequest } from './client';

import { Slot } from '../types/booking';

export async function getSlots(
  doctorId: string,
  date: string,
): Promise<Slot[]> {
  const filteredSlots = (slots as Slot[]).filter(slot => {
    return slot.doctorId === doctorId && slot.startsAt.startsWith(date);
  });

  return mockRequest(filteredSlots);
}
