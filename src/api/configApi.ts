import normalConfig from '../mocks/normalConfig.json';

import { mockRequest } from './client';

import { LayoutConfig } from '../types/config';
import { isLayoutConfig } from '../utils/configValidator';
import { saveConfigToCache } from '../utils/configCache';

export async function getConfig(): Promise<LayoutConfig> {
  const response = await mockRequest(normalConfig);

  if (!isLayoutConfig(response)) {
    throw new Error('Invalid configuration');
  }

  await saveConfigToCache(response);

  return response;
}
