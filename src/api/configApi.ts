import normalConfig from '../mocks/normalConfig.json';
import diwaliConfig from '../mocks/diwaliConfig.json';

import { mockRequest } from './client';

import { LayoutConfig } from '../types/config';
import { isLayoutConfig } from '../utils/configValidator';
import { saveConfigToCache } from '../utils/configCache';

export type ConfigMode = 'normal' | 'diwali';

let currentConfigMode: ConfigMode = 'normal';

export function setConfigMode(mode: ConfigMode): void {
  currentConfigMode = mode;
}

export function getConfigMode(): ConfigMode {
  return currentConfigMode;
}

export async function getConfig(): Promise<LayoutConfig> {
  const config = currentConfigMode === 'diwali' ? diwaliConfig : normalConfig;

  const response = await mockRequest(config);

  if (!isLayoutConfig(response)) {
    throw new Error('Invalid configuration');
  }

  await saveConfigToCache(response);

  return response;
}
