import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { colors, spacing, fontSize, fontWeight } from '@theme';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { MoreStackParamList } from '@/navigation/types';

type NavigationProp = StackNavigationProp<MoreStackParamList, 'MoreScreen'>;

const MoreScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigation = useNavigation<NavigationProp>();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;

  const menuItems = [
    { title: 'Trading Terminal', icon: 'bar-chart-2', screen: 'Terminal' as const },
    { title: 'KYC Verification', icon: 'user-check', screen: 'KYC' as const },
    { title: 'TDS Calculator', icon: 'calculator', screen: 'TDSCalculator' as const },
    { title: 'Bank Details', icon: 'credit-card', screen: 'BankDetails' as const },
    { title: 'Economic Calendar', icon: 'calendar', screen: 'EconomicCalendar' as const },
    { title: 'Messages', icon: 'message-circle', screen: 'Messages' as const },
    { title: 'Profile', icon: 'user', screen: 'Profile' as const },
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView style={styles.content}>
        {/* Theme Toggle */}
        <Card style={styles.section}>
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Icon name={theme === 'dark' ? 'moon' : 'sun'} size={20} color={colors.gold} />
            </View>
            <Text style={[styles.itemText, { color: themeColors.text }]}>
              {theme === 'dark' ? 'Dark' : 'Light'} Mode
            </Text>
            <TouchableOpacity onPress={toggleTheme} style={styles.toggle}>
              <Text style={{ color: colors.gold }}>Toggle</Text>
            </TouchableOpacity>
          </View>
        </Card>

        {/* Menu Items */}
        <Card style={styles.section}>
          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.row,
                index < menuItems.length - 1 && styles.rowBorder,
                { borderColor: themeColors.border },
              ]}
              onPress={() => navigation.navigate(item.screen)}>
              <View style={styles.iconContainer}>
                <Icon name={item.icon} size={20} color={colors.gold} />
              </View>
              <Text style={[styles.itemText, { color: themeColors.text }]}>
                {item.title}
              </Text>
              <Icon name="chevron-right" size={20} color={themeColors.textTertiary} />
            </TouchableOpacity>
          ))}
        </Card>

        {/* Logout */}
        <Button title="Logout" onPress={logout} variant="outline" style={styles.logoutButton} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: spacing.lg },
  section: { marginBottom: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  rowBorder: {
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: colors.gold + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  itemText: {
    flex: 1,
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
  toggle: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  logoutButton: {
    marginTop: spacing.xl,
  },
});

export default MoreScreen;
