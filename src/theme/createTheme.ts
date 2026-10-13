import { ThemeConfig } from '../types/config';

export interface AppTheme {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    surface: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
  };

  spacing: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };

  typography: {
    title: number;
    heading: number;
    body: number;
    caption: number;
  };

  radius: {
    sm: number;
    md: number;
    lg: number;
    pill: number;
  };
}

export function createTheme(config: ThemeConfig): AppTheme {
  return {
    colors: {
      primary: config.primary,
      secondary: config.secondary,
      background: config.background,
      surface: config.surface,
      textPrimary: config.textPrimary,
      textSecondary: config.textSecondary,
      accent: config.accent,
    },

    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
      xxl: 40,
    },

    typography: {
      title: 28,
      heading: 20,
      body: 16,
      caption: 13,
    },

    radius: {
      sm: 8,
      md: 12,
      lg: 20,
      pill: 999,
    },
  };
}
