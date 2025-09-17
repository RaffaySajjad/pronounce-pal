import { Easing } from 'react-native-reanimated';

export const animations = {
  spring: {
    damping: 15,
    stiffness: 150,
    mass: 1,
  },
  timing: {
    duration: 200,
    easing: Easing.out(Easing.cubic),
  },
  quickTiming: {
    duration: 120,
    easing: Easing.out(Easing.cubic),
  },
};

export const pressAnimation = (scale = 0.98) => ({
  transform: [{ scale }],
});

export const slideIn = {
  transform: [{ translateY: 20 }],
  opacity: 0,
};

export const slideInAnimated = {
  transform: [{ translateY: 0 }],
  opacity: 1,
};
