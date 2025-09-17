import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { palette, radius, spacing, elevation } from '../../theme/colors';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: palette.surfaceLight,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  default: {
    borderWidth: 1,
    borderColor: palette.border,
  },
  elevated: {
    shadowColor: palette.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: elevation.md,
    elevation: elevation.md,
  },
});

export const Card: React.FC<CardProps> = ({ 
  children, 
  variant = 'default',
  style,
  ...props 
}) => {
  return (
    <View 
      style={[
        styles.base,
        variant === 'elevated' ? styles.elevated : styles.default,
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
