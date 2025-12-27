import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { colors, spacing, borderRadius } from '@theme';
import { useTheme } from '@/context/ThemeContext';

interface GlassCardProps {
  children: ReactNode;
  style?: ViewStyle;
  intensity?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  style,
  intensity = 10,
}) => {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColors.glass,
          borderColor: themeColors.border,
        },
        style,
      ]}>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    overflow: 'hidden',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    // Elevation for Android
    elevation: 5,
  },
  content: {
    flex: 1,
  },
});
