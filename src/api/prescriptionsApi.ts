import prescriptions from '../mocks/prescriptions.json';

import { mockRequest } from './client';

import { Prescription } from '../types/prescription';

export async function getPrescriptions(): Promise<Prescription[]> {
  return mockRequest(prescriptions as Prescription[]);
}
