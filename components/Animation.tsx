import { Animated, StyleSheet } from 'react-native';

export const createGradientAnimation = (animatedValue: Animated.Value) => {
  const startX = animatedValue.interpolate({
    inputRange: [0, 2],
    outputRange: [0, 0.5],
  });

  const endY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  return { startX, endY };
};

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
  },
});

export const gradientStyle = styles.gradient;