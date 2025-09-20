import React from 'react';
import { View, ViewProps, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { palette, radius, spacing, elevation } from '../../theme/colors';
import { gradients } from '../../lib/gradients';

interface CardProps extends ViewProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'glass' | 'gradient' | 'outlined' | 'flat';
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  borderRadius?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
  onPress?: () => void;
}

const styles = StyleSheet.create({
  base: {
    overflow: 'hidden',
  },

  // Variant styles
  default: {
    backgroundColor: palette.cardLight,
    borderWidth: 1,
    borderColor: palette.borderLight,
  },
  elevated: {
    backgroundColor: palette.cardLight,
    ...elevation.md,
    shadowColor: palette.shadow,
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    ...elevation.lg,
    shadowColor: palette.shadow,
  },
  gradient: {
    ...elevation.md,
    shadowColor: palette.primary,
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: palette.border,
  },
  flat: {
    backgroundColor: palette.bgLight,
  },

  // Padding variants
  paddingNone: { padding: 0 },
  paddingXs: { padding: spacing[2] },
  paddingSm: { padding: spacing[3] },
  paddingMd: { padding: spacing[4] },
  paddingLg: { padding: spacing[6] },
  paddingXl: { padding: spacing[8] },

  // Shadow variants
  shadowNone: {},
  shadowSm: { ...elevation.sm, shadowColor: palette.shadow },
  shadowMd: { ...elevation.md, shadowColor: palette.shadow },
  shadowLg: { ...elevation.lg, shadowColor: palette.shadow },
  shadowXl: { ...elevation.xl, shadowColor: palette.shadow },

  // Border radius variants
  radiusSm: { borderRadius: radius.sm },
  radiusMd: { borderRadius: radius.md },
  radiusLg: { borderRadius: radius.lg },
  radiusXl: { borderRadius: radius.xl },
  radius2xl: { borderRadius: radius['2xl'] },
  radius3xl: { borderRadius: radius['3xl'] },

  // Gradient overlay
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  shadow = 'none',
  borderRadius = 'xl',
  onPress,
  style,
  ...props
}) => {
  const cardStyle = [
    styles.base,
    styles[variant],
    styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}` as keyof typeof styles],
    shadow !== 'none' && styles[`shadow${shadow.charAt(0).toUpperCase() + shadow.slice(1)}` as keyof typeof styles],
    styles[`radius${borderRadius.charAt(0).toUpperCase() + borderRadius.slice(1)}` as keyof typeof styles],
    style,
  ];

  const CardComponent = onPress ? TouchableOpacity : View;

  // Filter out props that conflict between View and TouchableOpacity
  const { onBlur, onFocus, ...filteredProps } = props;

  // Glass variant with blur effect
  if (variant === 'glass') {
    return (
      <CardComponent style={cardStyle} onPress={onPress} {...filteredProps}>
        <BlurView
          style={styles.gradientOverlay}
          blurType="light"
          blurAmount={10}
          reducedTransparencyFallbackColor="rgba(255, 255, 255, 0.1)"
        />
        <LinearGradient
          colors={gradients.glass}
          style={styles.gradientOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {children}
      </CardComponent>
    );
  }

  // Gradient variant
  if (variant === 'gradient') {
    return (
      <CardComponent style={cardStyle} onPress={onPress} {...filteredProps}>
        <LinearGradient
          colors={gradients.card}
          style={styles.gradientOverlay}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {children}
      </CardComponent>
    );
  }

  // Standard variants
  return (
    <CardComponent style={cardStyle} onPress={onPress} {...filteredProps}>
      {children}
    </CardComponent>
  );
};