import { create } from 'zustand';
import { SupportedLanguage } from '../types/config';

interface LanguageState {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
}

export const useLanguageStore = create<LanguageState>(set => ({
  language: 'en',

  setLanguage: language => {
    set({ language });
  },
}));
