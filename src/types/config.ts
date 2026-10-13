export type BackgroundKind = 'color' | 'gradient' | 'image';

export type SectionType =
  | 'hero_banner'
  | 'category_chips'
  | 'quick_actions'
  | 'service_grid'
  | 'doctor_carousel'
  | 'offer_strip';

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
    name: string;
    greeting: string;
    bannerImageUrl: string;
  };
}

export interface TabConfig {
  id: string;
  label: string;
  icon: string;
  screen: 'home' | 'bookings' | 'prescriptions' | 'profile';
}

export interface LayoutSection {
  id: string;
  type: string;
  background: SectionBackground;
  title: string;
  items: unknown[];
}

export interface LayoutConfig {
  version: number;
  theme: ThemeConfig;
  tabs: TabConfig[];
  sections: LayoutSection[];
}
