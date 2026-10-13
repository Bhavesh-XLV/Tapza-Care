import AsyncStorage from '@react-native-async-storage/async-storage';

import { LayoutConfig } from '../types/config';
import { isLayoutConfig } from './configValidator';

const CONFIG_CACHE_KEY = '@tapza_care/layout_config';

export async function saveConfigToCache(config: LayoutConfig): Promise<void> {
  await AsyncStorage.setItem(CONFIG_CACHE_KEY, JSON.stringify(config));
}

export async function getConfigFromCache(): Promise<LayoutConfig | null> {
  const cachedConfig = await AsyncStorage.getItem(CONFIG_CACHE_KEY);

  if (!cachedConfig) {
    return null;
  }

  try {
    const parsedConfig: unknown = JSON.parse(cachedConfig);

    if (!isLayoutConfig(parsedConfig)) {
      return null;
    }

    return parsedConfig;
  } catch {
    return null;
  }
}
