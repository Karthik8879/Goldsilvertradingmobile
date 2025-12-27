import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius } from '@theme';
import { useTheme } from '@/context/ThemeContext';

interface CardProps {
  children: ReactNode;
  style?: ViewStyle;
  glowOnPress?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, style, glowOnPress }) => {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: themeColors.glass,
          borderColor: themeColors.border,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 3,
  },
});
