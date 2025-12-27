import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Card } from '@/components/ui/Card';
import Icon from 'react-native-vector-icons/Feather';
import { colors, spacing, fontSize, fontWeight } from '@theme';
import { useTheme } from '@/context/ThemeContext';

const ProductsScreen = () => {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;
  const [activeTab, setActiveTab] = useState<'gold' | 'silver' | 'coin'>('gold');

  const products = [
    { id: '1', name: 'Gold Retail 999', purity: '999', buyPrice: 6289, sellPrice: 6250, change: 1.2 },
    { id: '2', name: 'Gold RTGS 999', purity: '999', buyPrice: 6285, sellPrice: 6246, change: 1.1 },
    { id: '3', name: 'Gold GST 999', purity: '999', buyPrice: 6292, sellPrice: 6253, change: 1.3 },
  ];

  return (
    <View style={[styles.container, { backgroundColor: themeColors.background }]}>
      {/* Tabs */}
      <View style={[styles.tabs, { backgroundColor: themeColors.surface }]}>
        {['gold', 'silver', 'coin'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab as any)}>
            <Text style={[
              styles.tabText,
              { color: activeTab === tab ? '#000' : themeColors.textSecondary },
            ]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content}>
        {products.map((product) => (
          <Card key={product.id} style={styles.productCard}>
            <View style={styles.productHeader}>
              <View>
                <Text style={[styles.productName, { color: themeColors.text }]}>
                  {product.name}
                </Text>
                <Text style={[styles.purity, { color: themeColors.textSecondary }]}>
                  Purity: {product.purity}
                </Text>
              </View>
              <View style={styles.change}>
                <Icon name="trending-up" size={14} color={colors.success} />
                <Text style={{ color: colors.success, fontSize: fontSize.sm }}>
                  +{product.change}%
                </Text>
              </View>
            </View>

            <View style={styles.priceRow}>
              <View style={styles.priceBox}>
                <Text style={[styles.priceLabel, { color: themeColors.textSecondary }]}>
                  BUY
                </Text>
                <Text style={[styles.price, { color: colors.gold }]}>
                  ₹{product.buyPrice}
                </Text>
              </View>
              <View style={styles.priceBox}>
                <Text style={[styles.priceLabel, { color: themeColors.textSecondary }]}>
                  SELL
                </Text>
                <Text style={[styles.price, { color: colors.gold }]}>
                  ₹{product.sellPrice}
                </Text>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    padding: spacing.xs,
    gap: spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderRadius: 999,
  },
  activeTab: {
    backgroundColor: colors.gold,
  },
  tabText: {
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  content: {
    flex: 1,
    padding: spacing.lg,
  },
  productCard: {
    marginBottom: spacing.md,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  productName: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  purity: {
    fontSize: fontSize.sm,
  },
  change: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  priceBox: {
    flex: 1,
  },
  priceLabel: {
    fontSize: fontSize.xs,
    marginBottom: spacing.xs,
  },
  price: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
});

export default ProductsScreen;
