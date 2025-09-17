import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ViewStyle, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import HapticFeedback from 'react-native-haptic-feedback';
import LinearGradient from 'react-native-linear-gradient';
import { Body } from './Typography';
import { gradients } from '../../lib/gradients';
import { palette, radius, spacing } from '../../theme/colors';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minHeight: 40,
  },
  md: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 48,
  },
  lg: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.lg,
    minHeight: 56,
  },
  secondary: {
    backgroundColor: palette.surfaceLight,
    borderWidth: 1,
    borderColor: palette.border,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: radius.md,
  },
});

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onPressIn,
  onPressOut,
  onPress,
  disabled,
  style,
  ...props
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = (event: any) => {
    scale.value = withSpring(0.98);
    HapticFeedback.trigger('impactLight');
    onPressIn?.(event);
  };

  const handlePressOut = (event: any) => {
    scale.value = withSpring(1);
    onPressOut?.(event);
  };

  const buttonStyle = [
    styles.base,
    styles[size],
    variant === 'secondary' && styles.secondary,
    animatedStyle,
    style,
  ];

  if (variant === 'primary') {
    return (
      <AnimatedTouchable
        style={buttonStyle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.9}
        {...props}
      >
        <LinearGradient
          colors={gradients.primary}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        <Body color={palette.textOnPrimary} style={{ fontWeight: '600' }}>
          {children}
        </Body>
      </AnimatedTouchable>
    );
  }

  if (variant === 'secondary') {
    return (
      <AnimatedTouchable
        style={buttonStyle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.9}
        {...props}
      >
        <Body color={palette.text} style={{ fontWeight: '600' }}>
          {children}
        </Body>
      </AnimatedTouchable>
    );
  }

  return (
    <AnimatedTouchable
      style={buttonStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
      {...props}
    >
      <Body color={palette.primary} style={{ fontWeight: '600' }}>
        {children}
      </Body>
    </AnimatedTouchable>
  );
};
