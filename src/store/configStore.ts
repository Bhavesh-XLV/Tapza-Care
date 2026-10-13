import { create } from 'zustand';

import { LayoutConfig } from '../types/config';
import { getConfig } from '../api/configApi';

interface ConfigState {
  config: LayoutConfig | null;
  isLoading: boolean;
  error: string | null;

  loadConfig: () => Promise<void>;
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
      });
    } catch (error) {
      set({
        isLoading: false,
        error: 'Unable to load configuration',
      });
    }
  },
}));
