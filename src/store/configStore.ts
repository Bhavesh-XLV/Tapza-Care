import { create } from 'zustand';

import { LayoutConfig } from '../types/config';
import { getConfig } from '../api/configApi';
import { getConfigFromCache } from '../utils/configCache';

interface ConfigState {
  config: LayoutConfig | null;
  isLoading: boolean;
  error: string | null;

  loadConfig: () => Promise<void>;
  updateConfig: (config: LayoutConfig) => void;
}

export const useConfigStore = create<ConfigState>(set => ({
  config: null,
  isLoading: false,
  error: null,

  loadConfig: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const config = await getConfig();

      set({
        config,
        isLoading: false,
        error: null,
      });
    } catch {
      const cachedConfig = await getConfigFromCache();

      if (cachedConfig) {
        set({
          config: cachedConfig,
          isLoading: false,
          error: null,
        });

        return;
      }

      set({
        isLoading: false,
        error: 'Unable to load configuration',
      });
    }
  },

  updateConfig: config => {
    set({
      config,
    });
  },
}));
