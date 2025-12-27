import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '@theme';
import { useTheme } from '@/context/ThemeContext';

// Screens
import HomeScreen from '@/screens/HomeScreen';
import ProductsScreen from '@/screens/ProductsScreen';
import ChartsScreen from '@/screens/ChartsScreen';
import MoreScreen from '@/screens/MoreScreen';
import KYCScreen from '@/screens/KYCScreen';
import TDSCalculatorScreen from '@/screens/TDSCalculatorScreen';
import BankDetailsScreen from '@/screens/BankDetailsScreen';
import EconomicCalendarScreen from '@/screens/EconomicCalendarScreen';
import MessagesScreen from '@/screens/MessagesScreen';
import TerminalScreen from '@/screens/TerminalScreen';
import ProfileScreen from '@/screens/ProfileScreen';

import { MainTabParamList, MoreStackParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();
const MoreStack = createStackNavigator<MoreStackParamList>();

const MoreStackNavigator = () => {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;

  return (
    <MoreStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: themeColors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: themeColors.border,
        },
        headerTintColor: themeColors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      }}>
      <MoreStack.Screen
        name="MoreScreen"
        component={MoreScreen}
        options={{ title: 'More' }}
      />
      <MoreStack.Screen
        name="KYC"
        component={KYCScreen}
        options={{ title: 'KYC Verification' }}
      />
      <MoreStack.Screen
        name="TDSCalculator"
        component={TDSCalculatorScreen}
        options={{ title: 'TDS Calculator' }}
      />
      <MoreStack.Screen
        name="BankDetails"
        component={BankDetailsScreen}
        options={{ title: 'Bank Details' }}
      />
      <MoreStack.Screen
        name="EconomicCalendar"
        component={EconomicCalendarScreen}
        options={{ title: 'Economic Calendar' }}
      />
      <MoreStack.Screen
        name="Messages"
        component={MessagesScreen}
        options={{ title: 'Messages' }}
      />
      <MoreStack.Screen
        name="Terminal"
        component={TerminalScreen}
        options={{ title: 'Trading Terminal' }}
      />
      <MoreStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </MoreStack.Navigator>
  );
};

export const MainNavigator = () => {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Products':
              iconName = 'shopping-bag';
              break;
            case 'Charts':
              iconName = 'trending-up';
              break;
            case 'More':
              iconName = 'menu';
              break;
            default:
              iconName = 'circle';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: themeColors.textTertiary,
        tabBarStyle: {
          backgroundColor: themeColors.background,
          borderTopColor: themeColors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: themeColors.background,
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: themeColors.border,
        },
        headerTintColor: themeColors.text,
        headerTitleStyle: {
          fontWeight: '600',
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'GoldJar' }}
      />
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{ title: 'Products' }}
      />
      <Tab.Screen
        name="Charts"
        component={ChartsScreen}
        options={{ title: 'Charts' }}
      />
      <Tab.Screen
        name="More"
        component={MoreStackNavigator}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};
