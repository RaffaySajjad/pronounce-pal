// Professional gradient palette inspired by premium iOS apps
export const palette = {
  // Primary gradient: Blue to Purple (enterprise-grade)
  primary: '#6366F1',
  primaryDark: '#4F46E5',
  primaryLight: '#818CF8',
  secondary: '#8B5CF6',
  secondaryDark: '#7C3AED',
  accent: '#06B6D4',
  accentLight: '#67E8F9',

  // Neutral backgrounds (iOS-inspired)
  bg: '#0B0C10',
  surface: '#111318',
  bgLight: '#FAFAFA',
  surfaceLight: '#FFFFFF',
  cardLight: '#FFFFFF',
  cardDark: '#1A1B23',

  // Text hierarchy
  text: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#64748B',
  textOnPrimary: '#FFFFFF',
  textOnSurface: '#F8FAFC',

  // UI elements
  border: '#E2E8F0',
  borderLight: '#F1F5F9',
  divider: '#CBD5E1',

  // Shadows and overlays
  shadow: 'rgba(15, 23, 42, 0.08)',
  shadowMedium: 'rgba(15, 23, 42, 0.12)',
  shadowLarge: 'rgba(15, 23, 42, 0.16)',
  overlay: 'rgba(15, 23, 42, 0.4)',

  // Status colors
  success: '#10B981',
  successLight: '#D1FAE5',
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  info: '#3B82F6',
  infoLight: '#DBEAFE',
};

// iOS-inspired radius system
export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  full: 9999,
};

// 8pt grid system for consistent spacing
export const spacing = {
  '0': 0,
  '0.5': 2,
  '1': 4,
  '1.5': 6,
  '2': 8,
  '2.5': 10,
  '3': 12,
  '3.5': 14,
  '4': 16,
  '5': 20,
  '6': 24,
  '7': 28,
  '8': 32,
  '9': 36,
  '10': 40,
  '11': 44,
  '12': 48,
  '14': 56,
  '16': 64,
  '20': 80,
  '24': 96,
  '32': 128,
  // Aliases for easier usage
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// iOS-style elevation system
export const elevation = {
  xs: {
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  sm: {
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  md: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 16,
    elevation: 8,
  },
  xl: {
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 12,
  },
};

export const lightTheme = {
  colors: {
    primary: palette.primary,
    primaryFg: palette.textOnPrimary,
    accent: palette.accent,
    bg: palette.bgLight,
    surface: palette.surfaceLight,
    text: palette.text,
    textMuted: palette.textMuted,
    border: palette.border,
    shadow: palette.shadow,
    success: palette.success,
    warning: palette.warning,
    danger: palette.danger,
  },
};

export const darkTheme = {
  colors: {
    primary: palette.primary,
    primaryFg: palette.textOnPrimary,
    accent: palette.accent,
    bg: palette.bg,
    surface: palette.surface,
    text: palette.textOnPrimary,
    textMuted: palette.textMuted,
    border: '#374151',
    shadow: 'rgba(0,0,0,0.3)',
    success: palette.success,
    warning: palette.warning,
    danger: palette.danger,
  },
};
