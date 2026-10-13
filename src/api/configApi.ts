import normalConfig from '../mocks/normalConfig.json';
import { mockRequest } from './client';
import { LayoutConfig } from '../types/config';

export async function getConfig(): Promise<LayoutConfig> {
  return mockRequest(normalConfig as LayoutConfig);
}
