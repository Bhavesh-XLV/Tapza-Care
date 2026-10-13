export type BackgroundKind = 'color' | 'gradient' | 'image';

export type SectionType =
  | 'hero_banner'
  | 'category_chips'
  | 'quick_actions'
  | 'service_grid'
  | 'doctor_carousel'
  | 'offer_strip';

export type SupportedLanguage = 'en' | 'te';

export interface LocalizedText {
  en: string;
  te: string;
}

export interface SectionBackground {
  kind: BackgroundKind;
  value: string;
}

export interface ThemeConfig {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  festival: {
    name: LocalizedText;
    greeting: LocalizedText;
    bannerImageUrl: string;
  };
}

export interface TabConfig {
  id: string;
  label: LocalizedText;
  icon: string;
  screen: 'home' | 'bookings' | 'prescriptions' | 'profile';
}

export interface LocalizedSection {
  title: LocalizedText;
}

export interface LayoutSection {
  id: string;
  type: string;
  background: SectionBackground;
  title: LocalizedText;
  items: unknown[];
}

export interface LayoutConfig {
  version: number;
  defaultLanguage: SupportedLanguage;
  theme: ThemeConfig;
  tabs: TabConfig[];
  sections: LayoutSection[];
}
