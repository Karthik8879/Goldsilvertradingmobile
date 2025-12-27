import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors, spacing, fontSize } from '@theme';
import { useTheme } from '@/context/ThemeContext';

const KYCScreen = () => {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView style={styles.content}>
        <Card>
          <Text style={[styles.title, { color: themeColors.text }]}>KYC Verification</Text>
          <Text style={[styles.subtitle, { color: themeColors.textSecondary }]}>
            Upload documents to complete verification
          </Text>
          <Button title="Upload Documents" onPress={() => {}} style={styles.button} />
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: spacing.lg },
  title: { fontSize: fontSize.xl, fontWeight: '700', marginBottom: spacing.sm },
  subtitle: { fontSize: fontSize.base, marginBottom: spacing.lg },
  button: { marginTop: spacing.lg },
});

export default KYCScreen;
