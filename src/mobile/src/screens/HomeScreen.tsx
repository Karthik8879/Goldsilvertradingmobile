import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { Card } from '@/components/ui/Card';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '@theme';
import { useTheme } from '@/context/ThemeContext';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;

  const spotPrices = [
    { metal: 'Gold', price: '₹6,289', change: '+1.2%', positive: true },
    { metal: 'Silver', price: '₹76.50', change: '-0.5%', positive: false },
  ];

  const quickActions = [
    { title: 'Buy Gold', icon: 'shopping-cart', color: colors.gold },
    { title: 'Sell Gold', icon: 'trending-down', color: colors.error },
    { title: 'Portfolio', icon: 'pie-chart', color: colors.info },
    { title: 'Reports', icon: 'file-text', color: colors.purple },
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        {/* Hero Section */}
        <LinearGradient
          colors={[colors.gold + '20', colors.goldDark + '10', 'transparent']}
          style={styles.heroGradient}>
          <View style={styles.hero}>
            <Text style={[styles.heroTitle, { color: themeColors.text }]}>
              Welcome to{' '}
              <Text style={{ color: colors.gold }}>GoldJar</Text>
            </Text>
            <Text style={[styles.heroSubtitle, { color: themeColors.textSecondary }]}>
              Premium Gold & Silver Trading Platform
            </Text>
          </View>
        </LinearGradient>

        {/* Live Spot Prices */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Live Spot Prices
          </Text>
          <View style={styles.priceGrid}>
            {spotPrices.map((item, index) => (
              <Card key={index} style={styles.priceCard}>
                <View style={styles.priceHeader}>
                  <Icon
                    name="trending-up"
                    size={20}
                    color={item.positive ? colors.success : colors.error}
                  />
                  <Text style={[styles.metalName, { color: themeColors.text }]}>
                    {item.metal}
                  </Text>
                </View>
                <Text style={[styles.price, { color: colors.gold }]}>
                  {item.price}
                </Text>
                <View style={styles.changeRow}>
                  <Icon
                    name={item.positive ? 'arrow-up' : 'arrow-down'}
                    size={14}
                    color={item.positive ? colors.success : colors.error}
                  />
                  <Text
                    style={[
                      styles.change,
                      { color: item.positive ? colors.success : colors.error },
                    ]}>
                    {item.change}
                  </Text>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Quick Actions
          </Text>
          <View style={styles.actionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity key={index} activeOpacity={0.7}>
                <Card style={styles.actionCard}>
                  <View
                    style={[
                      styles.actionIcon,
                      { backgroundColor: action.color + '20' },
                    ]}>
                    <Icon name={action.icon} size={24} color={action.color} />
                  </View>
                  <Text style={[styles.actionTitle, { color: themeColors.text }]}>
                    {action.title}
                  </Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Portfolio Summary */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
            Portfolio Summary
          </Text>
          <Card style={styles.portfolioCard}>
            <View style={styles.portfolioRow}>
              <Text style={[styles.portfolioLabel, { color: themeColors.textSecondary }]}>
                Total Value
              </Text>
              <Text style={[styles.portfolioValue, { color: themeColors.text }]}>
                ₹2,50,000
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.portfolioRow}>
              <Text style={[styles.portfolioLabel, { color: themeColors.textSecondary }]}>
                Today's P/L
              </Text>
              <Text style={[styles.portfolioValue, { color: colors.success }]}>
                +₹5,250 (2.1%)
              </Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.portfolioRow}>
              <Text style={[styles.portfolioLabel, { color: themeColors.textSecondary }]}>
                Holdings
              </Text>
              <Text style={[styles.portfolioValue, { color: themeColors.text }]}>
                Gold: 150g • Silver: 2kg
              </Text>
            </View>
          </Card>
        </View>

        {/* Market News */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: themeColors.text }]}>
              Market News
            </Text>
            <TouchableOpacity>
              <Text style={{ color: colors.gold, fontSize: fontSize.sm }}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          <Card style={styles.newsCard}>
            <View style={styles.newsItem}>
              <View style={styles.newsBadge}>
                <Text style={styles.newsBadgeText}>Market</Text>
              </View>
              <Text style={[styles.newsTitle, { color: themeColors.text }]}>
                Gold prices surge amid economic uncertainty
              </Text>
              <Text style={[styles.newsTime, { color: themeColors.textTertiary }]}>
                2 hours ago
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
  },
  heroGradient: {
    paddingTop: spacing.xl,
  },
  hero: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  heroSubtitle: {
    fontSize: fontSize.base,
    textAlign: 'center',
  },
  section: {
    padding: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
  },
  priceGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  priceCard: {
    flex: 1,
  },
  priceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  metalName: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.semibold,
  },
  price: {
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  change: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionCard: {
    width: (width - spacing.lg * 2 - spacing.md) / 2,
    alignItems: 'center',
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  actionTitle: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  portfolioCard: {
    padding: spacing.lg,
  },
  portfolioRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  portfolioLabel: {
    fontSize: fontSize.base,
  },
  portfolioValue: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    marginVertical: spacing.md,
  },
  newsCard: {
    padding: spacing.lg,
  },
  newsItem: {
    gap: spacing.sm,
  },
  newsBadge: {
    backgroundColor: colors.gold + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    alignSelf: 'flex-start',
  },
  newsBadgeText: {
    color: colors.gold,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  newsTitle: {
    fontSize: fontSize.base,
    fontWeight: fontWeight.medium,
  },
  newsTime: {
    fontSize: fontSize.xs,
  },
});

export default HomeScreen;
