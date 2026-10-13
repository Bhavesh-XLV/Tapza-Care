import { z } from 'zod';

const themeSchema = z.object({
  primary: z.string(),
  secondary: z.string(),
  background: z.string(),
  surface: z.string(),
  textPrimary: z.string(),
  textSecondary: z.string(),
  accent: z.string(),
  festival: z.object({
    name: z.string(),
    greeting: z.string(),
    bannerImageUrl: z.string(),
  }),
});

const tabSchema = z.object({
  id: z.string(),
  label: z.string(),
  icon: z.string(),
  screen: z.enum(['home', 'bookings', 'prescriptions', 'profile']),
});

const sectionSchema = z.object({
  id: z.string(),
  type: z.string(),
  background: z.object({
    kind: z.enum(['color', 'gradient', 'image']),
    value: z.string(),
  }),
  title: z.string(),
  items: z.array(z.unknown()),
});

export const layoutConfigSchema = z.object({
  version: z.number(),
  theme: themeSchema,
  tabs: z.array(tabSchema),
  sections: z.array(sectionSchema),
});

export function validateLayoutConfig(data: unknown) {
  return layoutConfigSchema.safeParse(data);
}
