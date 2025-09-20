import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ViewStyle, StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import HapticFeedback from 'react-native-haptic-feedback';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import { Body, Callout, Caption1 } from './Typography';
import { Icon, IconName } from './Icon';
import { gradients } from '../../lib/gradients';
import { palette, radius, spacing, elevation } from '../../theme/colors';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'glass';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  children?: React.ReactNode;
  style?: ViewStyle;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  fullWidth?: boolean;
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: radius.xl,
    overflow: 'hidden',
  },

  // Size variants
  xs: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    minHeight: 32,
    borderRadius: radius.md,
  },
  sm: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    minHeight: 40,
    borderRadius: radius.lg,
  },
  md: {
    paddingHorizontal: spacing[6],
    paddingVertical: spacing[3],
    minHeight: 48,
    borderRadius: radius.xl,
  },
  lg: {
    paddingHorizontal: spacing[8],
    paddingVertical: spacing[4],
    minHeight: 56,
    borderRadius: radius['2xl'],
  },
  xl: {
    paddingHorizontal: spacing[10],
    paddingVertical: spacing[5],
    minHeight: 64,
    borderRadius: radius['2xl'],
  },

  // Variant styles
  primary: {
    ...elevation.md,
    shadowColor: palette.primary,
  },
  secondary: {
    backgroundColor: palette.surfaceLight,
    borderWidth: 1,
    borderColor: palette.border,
    ...elevation.sm,
    shadowColor: palette.shadow,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  danger: {
    ...elevation.md,
    shadowColor: palette.danger,
  },
  success: {
    ...elevation.md,
    shadowColor: palette.success,
  },
  glass: {
    ...elevation.lg,
    shadowColor: palette.shadow,
  },

  // Content styles
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  iconLeft: {
    marginRight: spacing[2],
  },
  iconRight: {
    marginLeft: spacing[2],
  },

  fullWidth: {
    width: '100%',
  },

  disabled: {
    opacity: 0.5,
  },

  loading: {
    opacity: 0.8,
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
  loading,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  ...props
}) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = (event: any) => {
    if (disabled || loading) return;
    scale.value = withSpring(0.96, { damping: 20, stiffness: 300 });
    opacity.value = withTiming(0.8, { duration: 100 });
    HapticFeedback.trigger('impactLight');
    onPressIn?.(event);
  };

  const handlePressOut = (event: any) => {
    if (disabled || loading) return;
    scale.value = withSpring(1, { damping: 20, stiffness: 300 });
    opacity.value = withTiming(1, { duration: 150 });
    onPressOut?.(event);
  };

  const getTextColor = () => {
    switch (variant) {
      case 'primary':
        return palette.textOnPrimary;
      case 'secondary':
        return palette.text;
      case 'ghost':
        return palette.primary;
      case 'danger':
        return palette.textOnPrimary;
      case 'success':
        return palette.textOnPrimary;
      case 'glass':
        return palette.text;
      default:
        return palette.text;
    }
  };

  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return gradients.primary;
      case 'danger':
        return gradients.danger;
      case 'success':
        return gradients.success;
      default:
        return gradients.primary;
    }
  };

  const buttonStyle = [
    styles.base,
    styles[size],
    styles[variant],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    loading && styles.loading,
    animatedStyle,
    style,
  ];

  const renderContent = () => (
    <View style={styles.content}>
      {icon && iconPosition === 'left' && (
        <View style={styles.iconLeft}>
          <Icon
            name={icon}
            size={size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : 'md'}
            color={getTextColor()}
          />
        </View>
      )}

      {loading ? (
        <Icon
          name="refresh"
          size={size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : 'md'}
          color={getTextColor()}
        />
      ) : children ? (
        <>
          {size === 'xs' ? (
            <Caption1 color={getTextColor()} weight="semibold">
              {children}
            </Caption1>
          ) : size === 'sm' ? (
            <Callout color={getTextColor()} weight="semibold">
              {children}
            </Callout>
          ) : (
            <Body color={getTextColor()} weight="semibold">
              {children}
            </Body>
          )}
        </>
      ) : null}

      {icon && iconPosition === 'right' && !loading && (
        <View style={styles.iconRight}>
          <Icon
            name={icon}
            size={size === 'xs' ? 'sm' : size === 'xl' ? 'lg' : 'md'}
            color={getTextColor()}
          />
        </View>
      )}
    </View>
  );

  // Glass variant with blur effect
  if (variant === 'glass') {
    return (
      <AnimatedTouchable
        style={buttonStyle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.9}
        {...props}
      >
        <BlurView
          style={styles.gradient}
          blurType="light"
          blurAmount={20}
          reducedTransparencyFallbackColor={palette.surfaceLight}
        />
        <LinearGradient
          colors={gradients.glass}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {renderContent()}
      </AnimatedTouchable>
    );
  }

  // Gradient variants (primary, danger, success)
  if (['primary', 'danger', 'success'].includes(variant)) {
    return (
      <AnimatedTouchable
        style={buttonStyle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        disabled={disabled || loading}
        activeOpacity={0.9}
        {...props}
      >
        <LinearGradient
          colors={getGradientColors()}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {renderContent()}
      </AnimatedTouchable>
    );
  }

  // Secondary and ghost variants
  return (
    <AnimatedTouchable
      style={buttonStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      {...props}
    >
      {renderContent()}
    </AnimatedTouchable>
  );
};
