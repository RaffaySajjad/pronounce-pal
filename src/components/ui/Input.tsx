import React from 'react';
import { TextInput, TextInputProps, View, StyleSheet } from 'react-native';
import { Body, Caption } from './Typography';
import { palette, radius, spacing } from '../../theme/colors';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

const styles = StyleSheet.create({
  container: {
    // Container styles
  },
  label: {
    marginBottom: spacing.sm,
    fontWeight: '500',
  },
  input: {
    backgroundColor: palette.surfaceLight,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: palette.text,
    fontSize: 16,
  },
  inputError: {
    borderColor: palette.danger,
  },
  errorText: {
    marginTop: spacing.xs,
  },
});

export const Input: React.FC<InputProps> = ({
  label,
  error,
  style,
  ...props
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && (
        <Body style={styles.label}>
          {label}
        </Body>
      )}
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor={palette.textMuted}
        {...props}
      />
      {error && (
        <Caption color={palette.danger} style={styles.errorText}>
          {error}
        </Caption>
      )}
    </View>
  );
};
