export const colors = {
  // Brand Colors
  gold: '#FFD700',
  goldDark: '#FFA500',
  goldLight: '#FFE55C',
  
  // Dark Theme
  dark: {
    background: '#0a0a0a',
    backgroundSecondary: '#1a1a1a',
    surface: '#262626',
    surfaceHover: '#333333',
    border: 'rgba(255, 255, 255, 0.1)',
    borderLight: 'rgba(255, 255, 255, 0.05)',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassHover: 'rgba(255, 255, 255, 0.1)',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.6)',
    textTertiary: 'rgba(255, 255, 255, 0.4)',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
  
  // Light Theme
  light: {
    background: '#f9fafb',
    backgroundSecondary: '#ffffff',
    surface: '#ffffff',
    surfaceHover: '#f3f4f6',
    border: 'rgba(0, 0, 0, 0.1)',
    borderLight: 'rgba(0, 0, 0, 0.05)',
    glass: 'rgba(0, 0, 0, 0.05)',
    glassHover: 'rgba(0, 0, 0, 0.1)',
    text: '#000000',
    textSecondary: 'rgba(0, 0, 0, 0.6)',
    textTertiary: 'rgba(0, 0, 0, 0.4)',
    overlay: 'rgba(0, 0, 0, 0.5)',
  },
  
  // Semantic Colors
  success: '#10b981',
  successLight: '#34d399',
  successDark: '#059669',
  
  error: '#ef4444',
  errorLight: '#f87171',
  errorDark: '#dc2626',
  
  warning: '#f59e0b',
  warningLight: '#fbbf24',
  warningDark: '#d97706',
  
  info: '#3b82f6',
  infoLight: '#60a5fa',
  infoDark: '#2563eb',
  
  // Chart Colors
  green: '#10b981',
  red: '#ef4444',
  blue: '#3b82f6',
  purple: '#8b5cf6',
  
  // Transparency
  transparent: 'transparent',
};

export type Theme = 'dark' | 'light';

export const getThemeColors = (theme: Theme) => {
  return theme === 'dark' ? colors.dark : colors.light;
};
