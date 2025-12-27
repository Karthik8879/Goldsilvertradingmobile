export * from './colors';
export * from './spacing';

import { colors, getThemeColors, Theme } from './colors';
import { spacing, borderRadius, fontSize, fontWeight } from './spacing';

export const theme = {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  getThemeColors,
};

export type { Theme };
