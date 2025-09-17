// See PRD Section 4: Scope — MVP Features
// Reusable Text component with consistent typography

import React from 'react';
import { Text as RNText, StyleSheet, TextStyle } from 'react-native';

interface TextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success';
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  style?: TextStyle;
}

const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = 'primary',
  align = 'left',
  weight = 'normal',
  style,
}) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'h1':
        return styles.h1;
      case 'h2':
        return styles.h2;
      case 'h3':
        return styles.h3;
      case 'caption':
        return styles.caption;
      case 'label':
        return styles.label;
      default:
        return styles.body;
    }
  };

  const getColorStyle = () => {
    switch (color) {
      case 'secondary':
        return styles.secondaryColor;
      case 'muted':
        return styles.mutedColor;
      case 'error':
        return styles.errorColor;
      case 'success':
        return styles.successColor;
      default:
        return styles.primaryColor;
    }
  };

  const getAlignStyle = () => {
    switch (align) {
      case 'center':
        return styles.alignCenter;
      case 'right':
        return styles.alignRight;
      default:
        return styles.alignLeft;
    }
  };

  const getWeightStyle = () => {
    switch (weight) {
      case 'medium':
        return styles.weightMedium;
      case 'semibold':
        return styles.weightSemibold;
      case 'bold':
        return styles.weightBold;
      default:
        return styles.weightNormal;
    }
  };

  return (
    <RNText
      style={[
        getVariantStyle(),
        getColorStyle(),
        getAlignStyle(),
        getWeightStyle(),
        style,
      ]}
    >
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  // Variants
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
  label: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '500',
  },

  // Colors
  primaryColor: {
    color: '#1f2937',
  },
  secondaryColor: {
    color: '#6b7280',
  },
  mutedColor: {
    color: '#9ca3af',
  },
  errorColor: {
    color: '#dc2626',
  },
  successColor: {
    color: '#059669',
  },

  // Alignment
  alignLeft: {
    textAlign: 'left',
  },
  alignCenter: {
    textAlign: 'center',
  },
  alignRight: {
    textAlign: 'right',
  },

  // Weight
  weightNormal: {
    fontWeight: 'normal',
  },
  weightMedium: {
    fontWeight: '500',
  },
  weightSemibold: {
    fontWeight: '600',
  },
  weightBold: {
    fontWeight: 'bold',
  },
});

export default Text;
