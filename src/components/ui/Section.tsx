import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { Subtitle } from './Typography';
import { spacing } from '../../theme/colors';

interface SectionProps extends ViewProps {
  title?: string;
  children: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.md,
  },
});

export const Section: React.FC<SectionProps> = ({
  title,
  children,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]} {...props}>
      {title && (
        <Subtitle style={styles.title}>
          {title}
        </Subtitle>
      )}
      {children}
    </View>
  );
};
