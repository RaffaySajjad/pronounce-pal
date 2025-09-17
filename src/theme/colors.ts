export const palette = {
  primary: "#4F46E5",
  primaryDark: "#4338CA",
  accent: "#22D3EE",
  bg: "#0B0C10",
  surface: "#111318",
  bgLight: "#F7F8FA",
  surfaceLight: "#FFFFFF",
  text: "#0F172A",
  textMuted: "#475569",
  textOnPrimary: "#FFFFFF",
  border: "#E5E7EB",
  shadow: "rgba(2,6,23,0.15)",
  success: "#16A34A",
  warning: "#F59E0B",
  danger: "#EF4444",
};

export const radius = {
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
};

export const spacing = {
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
};

export const elevation = {
  sm: 6,
  md: 12,
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
    border: "#374151",
    shadow: "rgba(0,0,0,0.3)",
    success: palette.success,
    warning: palette.warning,
    danger: palette.danger,
  },
};
