import React from 'react';
import { Text, TextProps, StyleSheet, Platform } from 'react-native';
import { palette } from '../../theme/colors';

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  color?: string;
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
}

// iOS Human Interface Guidelines typography scale
const styles = StyleSheet.create({
  // Large titles (iOS 11+ style)
  largeTitle: {
    fontSize: 34,
    fontWeight: '700',
    color: palette.text,
    lineHeight: 41,
    letterSpacing: Platform.OS === 'ios' ? 0.37 : 0,
  },

  // Title hierarchy
  title1: {
    fontSize: 28,
    fontWeight: '700',
    color: palette.text,
    lineHeight: 34,
    letterSpacing: Platform.OS === 'ios' ? 0.36 : 0,
  },
  title2: {
    fontSize: 22,
    fontWeight: '700',
    color: palette.text,
    lineHeight: 28,
    letterSpacing: Platform.OS === 'ios' ? 0.35 : 0,
  },
  title3: {
    fontSize: 20,
    fontWeight: '600',
    color: palette.text,
    lineHeight: 25,
    letterSpacing: Platform.OS === 'ios' ? 0.38 : 0,
  },

  // Headline
  headline: {
    fontSize: 17,
    fontWeight: '600',
    color: palette.text,
    lineHeight: 22,
    letterSpacing: Platform.OS === 'ios' ? -0.41 : 0,
  },

  // Body text
  body: {
    fontSize: 17,
    fontWeight: '400',
    color: palette.text,
    lineHeight: 22,
    letterSpacing: Platform.OS === 'ios' ? -0.41 : 0,
  },
  bodyEmphasized: {
    fontSize: 17,
    fontWeight: '600',
    color: palette.text,
    lineHeight: 22,
    letterSpacing: Platform.OS === 'ios' ? -0.41 : 0,
  },

  // Callout
  callout: {
    fontSize: 16,
    fontWeight: '400',
    color: palette.text,
    lineHeight: 21,
    letterSpacing: Platform.OS === 'ios' ? -0.32 : 0,
  },
  calloutEmphasized: {
    fontSize: 16,
    fontWeight: '600',
    color: palette.text,
    lineHeight: 21,
    letterSpacing: Platform.OS === 'ios' ? -0.32 : 0,
  },

  // Subheadline
  subheadline: {
    fontSize: 15,
    fontWeight: '400',
    color: palette.textSecondary,
    lineHeight: 20,
    letterSpacing: Platform.OS === 'ios' ? -0.24 : 0,
  },
  subheadlineEmphasized: {
    fontSize: 15,
    fontWeight: '600',
    color: palette.text,
    lineHeight: 20,
    letterSpacing: Platform.OS === 'ios' ? -0.24 : 0,
  },

  // Footnote
  footnote: {
    fontSize: 13,
    fontWeight: '400',
    color: palette.textMuted,
    lineHeight: 18,
    letterSpacing: Platform.OS === 'ios' ? -0.08 : 0,
  },
  footnoteEmphasized: {
    fontSize: 13,
    fontWeight: '600',
    color: palette.textSecondary,
    lineHeight: 18,
    letterSpacing: Platform.OS === 'ios' ? -0.08 : 0,
  },

  // Caption
  caption1: {
    fontSize: 12,
    fontWeight: '400',
    color: palette.textMuted,
    lineHeight: 16,
    letterSpacing: Platform.OS === 'ios' ? 0 : 0,
  },
  caption2: {
    fontSize: 11,
    fontWeight: '400',
    color: palette.textMuted,
    lineHeight: 13,
    letterSpacing: Platform.OS === 'ios' ? 0.07 : 0,
  },
});

// Font weight mapping
const getFontWeight = (weight?: string): any => {
  switch (weight) {
    case 'light': return '300';
    case 'regular': return '400';
    case 'medium': return '500';
    case 'semibold': return '600';
    case 'bold': return '700';
    default: return undefined;
  }
};

// Typography components following iOS HIG
export const LargeTitle: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.largeTitle,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const Title1: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.title1,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const Title2: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.title2,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const Title3: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.title3,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const Headline: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.headline,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const Body: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.body,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const BodyEmphasized: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.bodyEmphasized,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const Callout: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.callout,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const CalloutEmphasized: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.calloutEmphasized,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const Subheadline: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.subheadline,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const SubheadlineEmphasized: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.subheadlineEmphasized,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const Footnote: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.footnote,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const FootnoteEmphasized: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.footnoteEmphasized,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const Caption1: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.caption1,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

export const Caption2: React.FC<TypographyProps> = ({ children, style, color, weight, ...props }) => (
  <Text
    style={[
      styles.caption2,
      color && { color },
      weight && { fontWeight: getFontWeight(weight) },
      style
    ]}
    {...props}
  >
    {children}
  </Text>
);

// Legacy exports for backward compatibility
export const Title = Title1;
export const Subtitle = Title3;
