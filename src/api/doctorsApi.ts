import doctors from '../mocks/doctors.json';

import { mockRequest } from './client';

import { Doctor } from '../types/doctor';

export async function getDoctors(): Promise<Doctor[]> {
  return mockRequest(doctors as Doctor[]);
}
