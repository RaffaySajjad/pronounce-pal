import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withDelay } from 'react-native-reanimated';
import { Caption } from './Typography';
import { palette, radius, spacing } from '../../theme/colors';

const AnimatedView = Animated.createAnimatedComponent(View);

interface ChipProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger';
  delay?: number;
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  default: {
    backgroundColor: palette.surfaceLight,
    borderColor: palette.border,
  },
  success: {
    backgroundColor: `${palette.success}20`,
    borderColor: `${palette.success}40`,
  },
  warning: {
    backgroundColor: `${palette.warning}20`,
    borderColor: `${palette.warning}40`,
  },
  danger: {
    backgroundColor: `${palette.danger}20`,
    borderColor: `${palette.danger}40`,
  },
});

export const Chip: React.FC<ChipProps> = ({ 
  children, 
  variant = 'default', 
  delay = 0,
}) => {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    scale.value = withDelay(delay, withSpring(1));
    opacity.value = withDelay(delay, withSpring(1));
  }, [delay, scale, opacity]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const textColors = {
    default: palette.text,
    success: palette.success,
    warning: palette.warning,
    danger: palette.danger,
  };

  return (
    <AnimatedView 
      style={[styles.base, styles[variant], animatedStyle]}
    >
      <Caption color={textColors[variant]}>{children}</Caption>
    </AnimatedView>
  );
};
