import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { palette } from '../../theme/colors';

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  color?: string;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: palette.text,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '500',
    color: palette.text,
    lineHeight: 28,
  },
  body: {
    fontSize: 16,
    fontWeight: '400',
    color: palette.text,
    lineHeight: 24,
  },
  caption: {
    fontSize: 14,
    fontWeight: '400',
    color: palette.textMuted,
    lineHeight: 20,
  },
});

export const Title: React.FC<TypographyProps> = ({ children, style, color, ...props }) => (
  <Text
    style={[styles.title, color && { color }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const Subtitle: React.FC<TypographyProps> = ({ children, style, color, ...props }) => (
  <Text
    style={[styles.subtitle, color && { color }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const Body: React.FC<TypographyProps> = ({ children, style, color, ...props }) => (
  <Text
    style={[styles.body, color && { color }, style]}
    {...props}
  >
    {children}
  </Text>
);

export const Caption: React.FC<TypographyProps> = ({ children, style, color, ...props }) => (
  <Text
    style={[styles.caption, color && { color }, style]}
    {...props}
  >
    {children}
  </Text>
);
