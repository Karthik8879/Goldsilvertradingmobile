# 🚀 GoldJar Mobile - Complete Setup Guide

Step-by-step guide to set up and run the React Native mobile app.

---

## 📋 Prerequisites

### Required Software

1. **Node.js** (v18 or higher)
   ```bash
   node --version  # Should be v18+
   ```

2. **npm** or **yarn**
   ```bash
   npm --version
   ```

3. **Watchman** (for macOS)
   ```bash
   brew install watchman
   ```

4. **React Native CLI**
   ```bash
   npm install -g react-native-cli
   ```

### For iOS Development

5. **Xcode** (v14 or higher)
   - Download from Mac App Store
   - Install Command Line Tools:
     ```bash
     xcode-select --install
     ```

6. **CocoaPods**
   ```bash
   sudo gem install cocoapods
   ```

### For Android Development

7. **Android Studio**
   - Download from: https://developer.android.com/studio
   - Install Android SDK (API 33+)
   - Configure environment variables:
   
   Add to `~/.zshrc` or `~/.bash_profile`:
   ```bash
   export ANDROID_HOME=$HOME/Library/Android/sdk
   export PATH=$PATH:$ANDROID_HOME/emulator
   export PATH=$PATH:$ANDROID_HOME/platform-tools
   ```

8. **Java JDK** (v11 or v17)
   ```bash
   brew install --cask zulu11
   ```

---

## 🛠️ Installation Steps

### Step 1: Clone & Install

```bash
# Navigate to mobile directory
cd mobile

# Install Node dependencies
npm install
```

### Step 2: iOS Setup

```bash
# Install CocoaPods dependencies
cd ios
pod install
cd ..
```

If you encounter issues:
```bash
cd ios
rm -rf Pods Podfile.lock
pod install --repo-update
cd ..
```

### Step 3: Android Setup

No additional steps required. Android dependencies are managed by Gradle.

---

## ▶️ Running the App

### On iOS Simulator

```bash
# Start Metro bundler (in one terminal)
npm start

# Run on iOS (in another terminal)
npm run ios

# Or specify simulator
npm run ios -- --simulator="iPhone 15 Pro"
```

### On Android Emulator

```bash
# Start Metro bundler (in one terminal)
npm start

# Run on Android (in another terminal)
npm run android
```

**Note:** Make sure an Android emulator is running before executing `npm run android`.

---

## 🔧 Configuration

### Update App Name

1. **iOS:**
   - Open `ios/GoldJar.xcworkspace` in Xcode
   - Select project → General → Display Name

2. **Android:**
   - Edit `android/app/src/main/res/values/strings.xml`:
   ```xml
   <string name="app_name">GoldJar</string>
   ```

### Update Package Name/Bundle ID

1. **iOS:**
   - Open Xcode
   - Select project → General → Bundle Identifier
   - Example: `com.yourcompany.goldjar`

2. **Android:**
   - Edit `android/app/build.gradle`:
   ```gradle
   defaultConfig {
       applicationId "com.yourcompany.goldjar"
   }
   ```

### Configure Icons & Splash Screen

1. **iOS:**
   - Replace icons in `ios/GoldJar/Images.xcassets/AppIcon.appiconset/`
   - Use 1024x1024 PNG

2. **Android:**
   - Replace icons in `android/app/src/main/res/mipmap-*/`
   - Use Android Asset Studio: https://romannurik.github.io/AndroidAssetStudio/

---

## 🎨 Customizing the App

### Change Theme Colors

Edit `src/theme/colors.ts`:

```typescript
export const colors = {
  gold: '#FFD700',        // Change primary color
  goldDark: '#FFA500',    // Change secondary color
  // ... other colors
};
```

### Add New Screen

1. Create screen file:
```typescript
// src/screens/NewScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';

const NewScreen = () => {
  return (
    <View>
      <Text>New Screen</Text>
    </View>
  );
};

export default NewScreen;
```

2. Add to navigation:
```typescript
// src/navigation/MainNavigator.tsx
import NewScreen from '@/screens/NewScreen';

// Add to Tab.Navigator or Stack.Navigator
<Tab.Screen name="NewScreen" component={NewScreen} />
```

---

## 📱 Testing on Physical Device

### iOS (via Xcode)

1. Connect iPhone via USB
2. Open `ios/GoldJar.xcworkspace` in Xcode
3. Select your device from target dropdown
4. Click Run (▶️)
5. Trust developer certificate on iPhone:
   - Settings → General → Device Management

### Android (via USB)

1. Enable Developer Options on Android:
   - Settings → About Phone → Tap "Build Number" 7 times

2. Enable USB Debugging:
   - Settings → Developer Options → USB Debugging

3. Connect device via USB

4. Verify connection:
   ```bash
   adb devices
   ```

5. Run app:
   ```bash
   npm run android
   ```

---

## 🏗️ Building for Production

### Android APK

```bash
cd android

# Debug APK (for testing)
./gradlew assembleDebug

# Release APK (signed)
./gradlew assembleRelease
```

**Location:** `android/app/build/outputs/apk/release/app-release.apk`

### Android AAB (for Play Store)

```bash
cd android
./gradlew bundleRelease
```

**Location:** `android/app/build/outputs/bundle/release/app-release.aab`

### iOS IPA (for App Store)

1. Open `ios/GoldJar.xcworkspace` in Xcode
2. Select "Any iOS Device" as target
3. Product → Archive
4. Window → Organizer
5. Select archive → Distribute App
6. Choose App Store Connect
7. Upload

---

## 🐛 Common Issues & Solutions

### Issue: Metro Bundler Port Conflict

**Solution:**
```bash
# Kill process on port 8081
lsof -ti:8081 | xargs kill -9

# Restart
npm start
```

### Issue: iOS Build Fails - CocoaPods

**Solution:**
```bash
cd ios
rm -rf Pods Podfile.lock ~/Library/Caches/CocoaPods
pod deintegrate
pod install
cd ..
```

### Issue: Android Build Fails - Gradle

**Solution:**
```bash
cd android
./gradlew clean
cd ..
npm run android
```

### Issue: Module Not Found

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules
npm install

# Clear Metro cache
npm start -- --reset-cache
```

### Issue: iOS Simulator Not Opening

**Solution:**
```bash
# Reset simulator
xcrun simctl erase all

# Or specify simulator explicitly
npx react-native run-ios --simulator="iPhone 15 Pro"
```

### Issue: Android Emulator Slow

**Solution:**
- Enable hardware acceleration in Android Studio
- Allocate more RAM to emulator (AVD Manager → Edit → Advanced)
- Use x86_64 system image (faster than ARM)

---

## 🔒 Code Signing (iOS)

1. **Apple Developer Account**
   - Enroll at: https://developer.apple.com

2. **Certificates & Profiles**
   - Xcode → Preferences → Accounts
   - Add Apple ID
   - Download certificates

3. **Automatic Signing**
   - Open Xcode
   - Select project → Signing & Capabilities
   - Check "Automatically manage signing"
   - Select Team

---

## 📦 Dependencies Explained

### Core Dependencies

- `react-native`: Framework
- `react`: UI library
- `typescript`: Type safety

### Navigation

- `@react-navigation/native`: Navigation container
- `@react-navigation/stack`: Stack navigator
- `@react-navigation/bottom-tabs`: Tab navigator
- `react-native-gesture-handler`: Gesture support
- `react-native-screens`: Native screen optimization

### UI & Styling

- `react-native-vector-icons`: Icon library
- `react-native-linear-gradient`: Gradient backgrounds
- `react-native-blur`: Blur effects
- `react-native-svg`: SVG support

### Data & Storage

- `@react-native-async-storage/async-storage`: Local storage

### Charts (Optional)

- `react-native-chart-kit`: Charts and graphs

---

## 🚀 Performance Optimization

### Enable Hermes (JavaScript Engine)

**iOS:**
Edit `ios/Podfile`:
```ruby
:hermes_enabled => true
```

**Android:**
Already enabled by default in React Native 0.70+

### Reduce Bundle Size

```bash
# Enable ProGuard (Android)
# Edit android/app/build.gradle
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
    }
}
```

### Image Optimization

- Use WebP format
- Compress images before adding to app
- Use `react-native-fast-image` for caching

---

## 📊 Monitoring & Analytics

### Add Firebase (Optional)

```bash
npm install @react-native-firebase/app
npm install @react-native-firebase/analytics
```

### Add Crashlytics

```bash
npm install @react-native-firebase/crashlytics
```

---

## ✅ Pre-Launch Checklist

### Code Quality
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All imports working
- [ ] No console.logs in production

### UI/UX
- [ ] Test on multiple screen sizes
- [ ] Test dark/light themes
- [ ] Check navigation flow
- [ ] Verify button states

### Performance
- [ ] App loads in < 3 seconds
- [ ] Smooth scrolling
- [ ] No memory leaks
- [ ] Images optimized

### Security
- [ ] API keys in environment variables
- [ ] Sensitive data encrypted
- [ ] SSL pinning implemented
- [ ] No hardcoded credentials

### Store Requirements
- [ ] App icons (all sizes)
- [ ] Screenshots (all device sizes)
- [ ] App description
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Support email

---

## 📞 Getting Help

### Resources

- **React Native Docs:** https://reactnative.dev
- **React Navigation:** https://reactnavigation.org
- **Stack Overflow:** Tag `react-native`
- **Discord:** React Native Community

### Debugging Tools

- **React Native Debugger:** https://github.com/jhen0409/react-native-debugger
- **Flipper:** Built-in debugging platform
- **Reactotron:** State management inspector

---

## 🎉 Success!

If you've followed all steps, your app should now be running!

**Next Steps:**
1. Customize the UI to match your brand
2. Add your business logic
3. Integrate real APIs
4. Test thoroughly
5. Deploy to stores

---

**Happy Coding! 🚀**
