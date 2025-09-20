import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, StyleSheet, View } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import HapticFeedback from 'react-native-haptic-feedback';
import { Caption1, Footnote } from './Typography';
import { Icon, IconName } from './Icon';
import { palette, radius, spacing, elevation } from '../../theme/colors';
import { gradients } from '../../lib/gradients';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ChipProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  selected?: boolean;
  icon?: IconName;
  iconPosition?: 'left' | 'right';
  onRemove?: () => void;
  disabled?: boolean;
  delay?: number;
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },

  // Size variants
  sm: {
    paddingHorizontal: spacing[2],
    paddingVertical: spacing[1],
    borderRadius: radius.md,
    minHeight: 24,
  },
  md: {
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[1.5],
    borderRadius: radius.lg,
    minHeight: 32,
  },
  lg: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[2],
    borderRadius: radius.xl,
    minHeight: 40,
  },

  // Variant styles
  default: {
    backgroundColor: palette.bgLight,
    borderWidth: 1,
    borderColor: palette.border,
  },
  primary: {
    ...elevation.sm,
    shadowColor: palette.primary,
  },
  success: {
    ...elevation.sm,
    shadowColor: palette.success,
  },
  warning: {
    ...elevation.sm,
    shadowColor: palette.warning,
  },
  danger: {
    ...elevation.sm,
    shadowColor: palette.danger,
  },
  info: {
    ...elevation.sm,
    shadowColor: palette.info,
  },
  ghost: {
    backgroundColor: 'transparent',
  },

  // Selected state
  selected: {
    ...elevation.md,
    shadowColor: palette.primary,
  },

  // Content styles
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconLeft: {
    marginRight: spacing[1],
  },
  iconRight: {
    marginLeft: spacing[1],
  },

  removeButton: {
    marginLeft: spacing[1],
    padding: spacing[0.5],
  },

  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  disabled: {
    opacity: 0.5,
  },
});

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'default',
  size = 'md',
  selected = false,
  icon,
  iconPosition = 'left',
  onRemove,
  disabled = false,
  style,
  onPress,
  ...props
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (disabled) return;
    scale.value = withSpring(0.95, { damping: 20, stiffness: 300 });
    HapticFeedback.trigger('impactLight');
  };

  const handlePressOut = () => {
    if (disabled) return;
    scale.value = withSpring(1, { damping: 20, stiffness: 300 });
  };

  const handlePress = (event: any) => {
    if (disabled) return;
    onPress?.(event);
  };

  const handleRemove = () => {
    if (disabled) return;
    HapticFeedback.trigger('impactMedium');
    onRemove?.();
  };

  const getTextColor = () => {
    if (selected || ['primary', 'success', 'warning', 'danger', 'info'].includes(variant)) {
      return palette.textOnPrimary;
    }
    if (variant === 'ghost') {
      return palette.primary;
    }
    return palette.text;
  };

  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return gradients.primary;
      case 'success':
        return gradients.success;
      case 'warning':
        return gradients.warning;
      case 'danger':
        return gradients.danger;
      case 'info':
        return gradients.info;
      default:
        return gradients.primary;
    }
  };

  const chipStyle = [
    styles.base,
    styles[size],
    selected ? styles.selected : styles[variant],
    disabled && styles.disabled,
    animatedStyle,
    style,
  ];

  const iconSize = size === 'sm' ? 'xs' : size === 'lg' ? 'sm' : 'xs';

  const renderContent = () => (
    <View style={styles.content}>
      {icon && iconPosition === 'left' && (
        <View style={styles.iconLeft}>
          <Icon name={icon} size={iconSize} color={getTextColor()} />
        </View>
      )}

      {size === 'sm' ? (
        <Caption1 color={getTextColor()} weight="medium">
          {children}
        </Caption1>
      ) : (
        <Footnote color={getTextColor()} weight="medium">
          {children}
        </Footnote>
      )}

      {icon && iconPosition === 'right' && (
        <View style={styles.iconRight}>
          <Icon name={icon} size={iconSize} color={getTextColor()} />
        </View>
      )}

      {onRemove && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={handleRemove}
          hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
        >
          <Icon name="x" size="xs" color={getTextColor()} />
        </TouchableOpacity>
      )}
    </View>
  );

  // Gradient variants
  if (selected || ['primary', 'success', 'warning', 'danger', 'info'].includes(variant)) {
    return (
      <AnimatedTouchable
        style={chipStyle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        disabled={disabled}
        activeOpacity={0.9}
        {...props}
      >
        <LinearGradient
          colors={selected ? gradients.primary : getGradientColors()}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        {renderContent()}
      </AnimatedTouchable>
    );
  }

  // Default and ghost variants
  return (
    <AnimatedTouchable
      style={chipStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.8}
      {...props}
    >
      {renderContent()}
    </AnimatedTouchable>
  );
};