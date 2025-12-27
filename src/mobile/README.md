# 📱 GoldJar Mobile - React Native

Premium Gold & Silver Trading Mobile Application built with React Native CLI (no Expo).

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- React Native CLI
- Xcode 14+ (for iOS)
- Android Studio (for Android)
- CocoaPods (for iOS)

### Installation

```bash
# Navigate to mobile directory
cd mobile

# Install dependencies
npm install

# iOS: Install pods
cd ios && pod install && cd ..

# Run on Android
npm run android

# Run on iOS
npm run ios
```

---

## 📦 Project Structure

```
mobile/
├── android/              # Android native code
├── ios/                  # iOS native code  
├── src/
│   ├── components/
│   │   └── ui/          # Reusable UI components
│   ├── context/         # React Context (Theme, Auth)
│   ├── navigation/      # Navigation setup
│   ├── screens/         # All app screens
│   ├── theme/           # Colors, spacing, typography
│   └── App.tsx          # Root component
├── babel.config.js
├── metro.config.js
├── package.json
└── tsconfig.json
```

---

## 🎨 Features

### ✅ Implemented

- **Authentication**
  - OTP-based login
  - Session management
  - Logout functionality

- **Theme System**
  - Dark mode (default)
  - Light mode
  - Persistent theme storage
  - Automatic theme switching

- **Navigation**
  - Bottom tab navigation
  - Stack navigation
  - Nested navigators
  - Deep linking support

- **Screens**
  - Home (Dashboard with live prices)
  - Products (Buy/Sell interface)
  - Charts (Market analysis)
  - More (Settings & utilities)
  - KYC Verification
  - TDS Calculator
  - Bank Details
  - Economic Calendar
  - Messages
  - Trading Terminal
  - Profile

- **UI Components**
  - Custom Button (Primary, Secondary, Outline)
  - Glass Card with blur effects
  - Gradient backgrounds
  - Icons (Feather Icons)
  - Responsive layouts

---

## 🎯 Design System

### Colors

```typescript
// Brand
Gold: #FFD700
Gold Dark: #FFA500

// Dark Theme
Background: #0a0a0a
Text: #ffffff

// Light Theme
Background: #f9fafb
Text: #000000

// Semantic
Success: #10b981
Error: #ef4444
Warning: #f59e0b
Info: #3b82f6
```

### Typography

```typescript
Sizes: 10, 12, 14, 16, 18, 20, 24, 32, 40
Weights: Regular (400), Medium (500), Semibold (600), Bold (700)
```

### Spacing

```typescript
xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32, huge: 48
```

---

## 🛠️ Tech Stack

- **Framework:** React Native 0.73.2 (CLI)
- **Language:** TypeScript 5.0
- **Navigation:** React Navigation v6
- **Icons:** React Native Vector Icons (Feather)
- **Gradients:** React Native Linear Gradient
- **Blur:** React Native Blur
- **Storage:** Async Storage
- **Charts:** React Native Chart Kit
- **State:** React Context API

---

## 📱 Screens Breakdown

### 1. **Home Screen** ✅
- Live spot prices (Gold & Silver)
- Quick actions (Buy, Sell, Portfolio, Reports)
- Portfolio summary
- Market news feed
- Hero section with gradients

### 2. **Products Screen** ✅
- Tabbed interface (Gold, Silver, Coin)
- Product listing with prices
- Buy/Sell buttons
- Real-time price updates
- Purity indicators

### 3. **Charts Screen** 🔨
- Interactive price charts
- Multiple timeframes
- Technical indicators
- Market analysis

### 4. **More Screen** ✅
- Settings menu
- Theme toggle
- Navigation to all utility screens
- Profile access
- Logout

### 5. **Login Screen** ✅
- Phone number input
- OTP verification
- Animated transitions
- Error handling

### 6. **Utility Screens** (Placeholders created):
- KYC Verification
- TDS Calculator
- Bank Details
- Economic Calendar
- Messages
- Trading Terminal
- Profile

---

## 🔧 Configuration

### iOS Setup

```bash
# Install CocoaPods dependencies
cd ios
pod install

# Open workspace
open GoldJar.xcworkspace

# Update Bundle Identifier in Xcode
# Update Display Name
# Configure signing & capabilities
```

### Android Setup

```bash
# Open Android Studio
# File → Open → mobile/android

# Update package name in:
# - android/app/build.gradle
# - android/app/src/main/AndroidManifest.xml
# - android/app/src/main/java/.../MainActivity.java

# Update app name in:
# - android/app/src/main/res/values/strings.xml
```

---

## 🎨 Customization

### Change Theme Colors

Edit `/src/theme/colors.ts`:

```typescript
export const colors = {
  gold: '#YOUR_COLOR',
  // ... other colors
};
```

### Add New Screens

1. Create screen in `/src/screens/YourScreen.tsx`
2. Add to navigation in `/src/navigation/MainNavigator.tsx`
3. Add route type in `/src/navigation/types.ts`

### Add New Components

```typescript
// /src/components/ui/YourComponent.tsx
import { useTheme } from '@/context/ThemeContext';

export const YourComponent = () => {
  const { theme } = useTheme();
  const themeColors = theme === 'dark' ? colors.dark : colors.light;
  
  return (
    // Your component JSX
  );
};
```

---

## 🚢 Build & Deploy

### Android (APK)

```bash
# Generate release APK
cd android
./gradlew assembleRelease

# APK location:
# android/app/build/outputs/apk/release/app-release.apk
```

### Android (AAB for Play Store)

```bash
cd android
./gradlew bundleRelease

# AAB location:
# android/app/build/outputs/bundle/release/app-release.aab
```

### iOS (TestFlight)

```bash
# Open Xcode
open ios/GoldJar.xcworkspace

# Select "Any iOS Device"
# Product → Archive
# Distribute → App Store Connect
```

---

## 🐛 Troubleshooting

### iOS Build Fails

```bash
cd ios
rm -rf Pods Podfile.lock
pod install --repo-update
```

### Android Build Fails

```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Metro Bundler Issues

```bash
# Clear cache
npm start -- --reset-cache

# Or
npx react-native start --reset-cache
```

### TypeScript Errors

```bash
# Clear TypeScript cache
rm -rf node_modules
npm install
```

---

## 📋 TODO / Roadmap

- [ ] Implement actual chart library integration
- [ ] Add real-time price WebSocket
- [ ] Implement biometric authentication
- [ ] Add push notifications
- [ ] Integrate payment gateway
- [ ] Add offline mode support
- [ ] Implement deep linking
- [ ] Add analytics (Firebase/Amplitude)
- [ ] Add crash reporting
- [ ] Implement unit tests
- [ ] Add E2E tests (Detox)
- [ ] Optimize bundle size
- [ ] Add code splitting
- [ ] Implement CI/CD pipeline

---

## 📄 Scripts

```bash
npm run android       # Run on Android
npm run ios           # Run on iOS
npm start             # Start Metro bundler
npm run lint          # Run ESLint
npm run clean         # Clean Android build
npm run clean:ios     # Clean iOS build & reinstall pods
```

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

MIT License - see LICENSE file for details

---

## 🆘 Support

For issues or questions:
- Check troubleshooting section
- Open an issue on GitHub
- Contact: support@goldjar.com

---

**Built with ❤️ using React Native CLI**

*Made for iOS & Android • Optimized for performance*
