import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import HapticFeedback from 'react-native-haptic-feedback';
import { Body, Caption } from './Typography';
import { spacing } from '../../theme/colors';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ListItemProps {
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  leftElement: {
    marginRight: spacing.md,
  },
  content: {
    flex: 1,
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  rightElement: {
    marginLeft: spacing.md,
  },
});

export const ListItem: React.FC<ListItemProps> = ({
  title,
  subtitle,
  onPress,
  rightElement,
  leftElement,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.98);
    HapticFeedback.trigger('impactLight');
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
  };

  if (!onPress) {
    return (
      <View style={styles.container}>
        {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
        <View style={styles.content}>
          <Body>{title}</Body>
          {subtitle && <Caption style={styles.subtitle}>{subtitle}</Caption>}
        </View>
        {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
      </View>
    );
  }

  return (
    <AnimatedTouchable
      style={[styles.container, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      activeOpacity={0.9}
    >
      {leftElement && <View style={styles.leftElement}>{leftElement}</View>}
      <View style={styles.content}>
        <Body>{title}</Body>
        {subtitle && <Caption style={styles.subtitle}>{subtitle}</Caption>}
      </View>
      {rightElement && <View style={styles.rightElement}>{rightElement}</View>}
    </AnimatedTouchable>
  );
};
