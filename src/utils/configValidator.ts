import { LayoutConfig } from '../types/config';

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function isLocalizedText(value: unknown): boolean {
  if (!isObject(value)) {
    return false;
  }

  return typeof value.en === 'string' && typeof value.te === 'string';
}

function isThemeConfig(value: unknown): boolean {
  if (!isObject(value)) {
    return false;
  }

  const festival = value.festival;

  if (!isObject(festival)) {
    return false;
  }

  return (
    typeof value.primary === 'string' &&
    typeof value.secondary === 'string' &&
    typeof value.background === 'string' &&
    typeof value.surface === 'string' &&
    typeof value.textPrimary === 'string' &&
    typeof value.textSecondary === 'string' &&
    typeof value.accent === 'string' &&
    isLocalizedText(festival.name) &&
    isLocalizedText(festival.greeting) &&
    typeof festival.bannerImageUrl === 'string'
  );
}

function isTabConfig(value: unknown): boolean {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.id === 'string' &&
    isLocalizedText(value.label) &&
    typeof value.icon === 'string' &&
    (value.screen === 'home' ||
      value.screen === 'bookings' ||
      value.screen === 'prescriptions' ||
      value.screen === 'profile')
  );
}

function isSectionConfig(value: unknown): boolean {
  if (!isObject(value)) {
    return false;
  }

  const background = value.background;

  if (!isObject(background)) {
    return false;
  }

  const validBackground =
    background.kind === 'color' ||
    background.kind === 'gradient' ||
    background.kind === 'image';

  return (
    typeof value.id === 'string' &&
    typeof value.type === 'string' &&
    validBackground &&
    typeof background.value === 'string' &&
    isLocalizedText(value.title) &&
    Array.isArray(value.items)
  );
}

export function isLayoutConfig(value: unknown): value is LayoutConfig {
  if (!isObject(value)) {
    return false;
  }

  return (
    typeof value.version === 'number' &&
    (value.defaultLanguage === 'en' || value.defaultLanguage === 'te') &&
    isThemeConfig(value.theme) &&
    Array.isArray(value.tabs) &&
    value.tabs.every(isTabConfig) &&
    Array.isArray(value.sections) &&
    value.sections.every(isSectionConfig)
  );
}
