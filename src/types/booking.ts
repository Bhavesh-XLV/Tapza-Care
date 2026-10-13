export interface Slot {
  id: string;
  doctorId: string;
  startsAt: string;
  endsAt: string;
  available: boolean;
}

export interface Booking {
  id: string;
  doctorId: string;
  slotId: string;
  status: 'confirmed' | 'cancelled';
  createdAt: string;
}
