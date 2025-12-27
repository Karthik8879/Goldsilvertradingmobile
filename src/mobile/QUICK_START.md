# ⚡ GoldJar Mobile - Quick Start

Get up and running in 5 minutes!

---

## 🚀 **Instant Setup**

```bash
# 1. Navigate to mobile folder
cd mobile

# 2. Install dependencies
npm install

# 3A. Run on iOS (macOS only)
cd ios && pod install && cd ..
npm run ios

# 3B. Run on Android
npm run android
```

That's it! 🎉

---

## 📱 **Test Credentials**

**Phone:** Any 10-digit number  
**OTP:** Any 6 digits

*(Demo mode - auto-accepts any OTP)*

---

## 🎨 **Quick Customization**

### Change Colors

`src/theme/colors.ts`:
```typescript
export const colors = {
  gold: '#YOUR_COLOR',      // Change this
  goldDark: '#YOUR_COLOR',  // And this
  // ...
};
```

### Change App Name

**iOS:** `ios/GoldJar/Info.plist` → `CFBundleDisplayName`  
**Android:** `android/app/src/main/res/values/strings.xml`

---

## 🐛 **Common Issues**

### Metro won't start?
```bash
npm start -- --reset-cache
```

### iOS build fails?
```bash
cd ios && rm -rf Pods && pod install && cd ..
```

### Android build fails?
```bash
cd android && ./gradlew clean && cd ..
```

---

## 📂 **Key Files**

| File | Purpose |
|------|---------|
| `src/App.tsx` | Root component |
| `src/navigation/MainNavigator.tsx` | Bottom tabs |
| `src/screens/HomeScreen.tsx` | Dashboard |
| `src/context/ThemeContext.tsx` | Theme logic |
| `src/theme/colors.ts` | Color system |

---

## ✅ **Verification Checklist**

- [ ] `npm install` completed without errors
- [ ] Pods installed (iOS)
- [ ] App launches on simulator/emulator
- [ ] Can login with any phone number
- [ ] Can navigate between tabs
- [ ] Theme toggle works
- [ ] Can logout

---

## 🎯 **Next Steps**

1. Explore all screens
2. Test theme switching
3. Customize colors
4. Add your business logic
5. Connect real APIs
6. Test on physical device
7. Build for production

---

## 📞 **Need Help?**

- Check `SETUP_GUIDE.md` for detailed setup
- Check `README.md` for full documentation
- Check `MOBILE_APP_COMPLETE.md` for overview

---

**Ready to code! 🚀**
