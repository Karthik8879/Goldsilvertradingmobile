import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '@theme';
import { useTheme } from '@/context/ThemeContext';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;

  const sizeStyles = {
    sm: { paddingVertical: spacing.sm, paddingHorizontal: spacing.lg },
    md: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl },
    lg: { paddingVertical: spacing.lg, paddingHorizontal: spacing.xxl },
  };

  const textSizes = {
    sm: fontSize.sm,
    md: fontSize.base,
    lg: fontSize.md,
  };

  const isDisabled = disabled || loading;

  if (variant === 'primary') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
        style={[styles.container, style]}>
        <LinearGradient
          colors={[colors.gold, colors.goldDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.gradient,
            sizeStyles[size],
            isDisabled && styles.disabled,
          ]}>
          {loading ? (
            <ActivityIndicator color="#000000" />
          ) : (
            <Text style={[styles.primaryText, { fontSize: textSizes[size] }, textStyle]}>
              {title}
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  if (variant === 'outline') {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisabled}
        activeOpacity={0.8}
        style={[
          styles.container,
          styles.outline,
          sizeStyles[size],
          isDisabled && styles.disabled,
          style,
        ]}>
        {loading ? (
          <ActivityIndicator color={colors.gold} />
        ) : (
          <Text
            style={[
              styles.outlineText,
              { fontSize: textSizes[size] },
              textStyle,
            ]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    );
  }

  // Secondary variant
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[
        styles.container,
        styles.secondary,
        { backgroundColor: themeColors.glass },
        sizeStyles[size],
        isDisabled && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={themeColors.text} />
      ) : (
        <Text
          style={[
            styles.secondaryText,
            { color: themeColors.text, fontSize: textSizes[size] },
            textStyle,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    color: '#000000',
    fontWeight: fontWeight.bold,
  },
  secondary: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  secondaryText: {
    fontWeight: fontWeight.semibold,
  },
  outline: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.gold,
    backgroundColor: 'transparent',
  },
  outlineText: {
    color: colors.gold,
    fontWeight: fontWeight.semibold,
  },
  disabled: {
    opacity: 0.5,
  },
});
