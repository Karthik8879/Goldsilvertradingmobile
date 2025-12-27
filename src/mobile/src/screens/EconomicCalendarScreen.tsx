import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '@/components/ui/Card';
import { colors, spacing, fontSize } from '@theme';
import { useTheme } from '@/context/ThemeContext';

const EconomicCalendarScreen = () => {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView style={styles.content}>
        <Card>
          <Text style={[styles.title, { color: themeColors.text }]}>Economic Calendar</Text>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: spacing.lg },
  title: { fontSize: fontSize.xl, fontWeight: '700' },
});

export default EconomicCalendarScreen;
