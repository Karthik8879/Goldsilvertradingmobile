# Bulk Component Conversion Script

## 🚀 Automated Conversion Steps

Since there are many components to convert, here's the systematic approach:

### Phase 1: Copy & Update Imports (All Components)
For each component in `/components`, copy to new location and:

1. Add `'use client';` at the top (if it uses state/effects/handlers)
2. Update all imports from `'./X'` to `'@/components/X'`
3. Add `theme: 'dark' | 'light'` prop to interface
4. Update className conditions for theme

### Phase 2: File Structure

```
/components/
├── home/
│   ├── Hero.tsx ✅
│   ├── LivePrices.tsx ✅
│   ├── Products.tsx ⏳
│   ├── Charts.tsx ⏳
│   ├── News.tsx ⏳
│   ├── FAQ.tsx ⏳
│   └── AboutUs.tsx ⏳
├── layout/
│   ├── Header.tsx ✅
│   └── Footer.tsx ✅
├── pages/
│   ├── KYC.tsx ⏳
│   ├── TDSCalculator.tsx ⏳
│   ├── BankDetails.tsx ⏳
│   ├── EconomicCalendar.tsx ⏳
│   └── Messages.tsx ⏳
├── terminal/
│   └── TradingTerminal.tsx ⏳
├── modals/
│   ├── LoginModal.tsx ⏳
│   └── BuyModal.tsx ⏳
└── ui/
    ├── Button.tsx (copy as-is)
    ├── Card.tsx (copy as-is)
    └── Badge.tsx (copy as-is)
```

## 📝 Quick Conversion Template

For any component, follow this pattern:

### Before (Vite):
```typescript
import React, { useState } from 'react';
import { Button } from './ui/Button';

export function MyComponent() {
  return <div className="text-white bg-[#0a0a0a]">...</div>;
}
```

### After (Next.js):
```typescript
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';

interface MyComponentProps {
  theme: 'dark' | 'light';
}

export function MyComponent({ theme }: MyComponentProps) {
  return (
    <div className={`${
      theme === 'dark' 
        ? 'text-white bg-[#0a0a0a]' 
        : 'text-black bg-gray-50'
    }`}>
      ...
    </div>
  );
}
```

## 🎯 Priority Order

### HIGH PRIORITY (Core user flow):
1. **LoginModal.tsx** - Users need to login
2. **TradingTerminal.tsx** - Main trading interface
3. **Products.tsx** - Product browsing
4. **Charts.tsx** - Price charts

### MEDIUM PRIORITY (Information pages):
5. **News.tsx** - Market news
6. **FAQ.tsx** - Help section
7. **AboutUs.tsx** - Company info
8. **KYC.tsx** - KYC form
9. **BankDetails.tsx** - Banking info

### LOW PRIORITY (Secondary features):
10. **TDSCalculator.tsx** - Tax calculator
11. **EconomicCalendar.tsx** - Events
12. **Messages.tsx** - Messaging
13. **BuyModal.tsx** - Purchase modal

## ⚡ Speed Conversion Commands

For components without theme-specific styling, you can:

1. **Copy file to new location**:
   ```bash
   cp /components/ComponentName.tsx /components/category/ComponentName.tsx
   ```

2. **Add 'use client'** at line 1
3. **Find & Replace** in file:
   - `from './` → `from '@/components/`
   - `from '../` → `from '@/components/`

4. **Add theme prop**:
   ```typescript
   interface ComponentNameProps {
     theme: 'dark' | 'light';
   }
   
   export function ComponentName({ theme }: ComponentNameProps) {
     // ... component code
   }
   ```

5. **Update theme-sensitive styles**:
   - Find: `className="text-white"`
   - Replace: `className={theme === 'dark' ? 'text-white' : 'text-black'}`

## 📋 Conversion Checklist Template

For each component:

- [ ] File copied to correct location
- [ ] `'use client'` added (if needed)
- [ ] All imports updated to use `@/components/...`
- [ ] Theme prop added to interface
- [ ] All theme-sensitive styles updated
- [ ] Navigation updated to use Next.js Link/useRouter
- [ ] Component tested in both dark/light mode
- [ ] Mobile responsive checked

## 🔍 Common Patterns to Update

### Pattern 1: Background Colors
```typescript
// Find
className="bg-[#0a0a0a]"

// Replace
className={theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}
```

### Pattern 2: Text Colors
```typescript
// Find
className="text-white"

// Replace
className={theme === 'dark' ? 'text-white' : 'text-black'}
```

### Pattern 3: Borders
```typescript
// Find
className="border-white/10"

// Replace
className={theme === 'dark' ? 'border-white/10' : 'border-gray-200'}
```

### Pattern 4: Glass Effects
```typescript
// Find
className="bg-white/5"

// Replace
className={theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}
```

## 🎨 Master Theme Pattern Reference

```typescript
// Backgrounds
'bg-[#0a0a0a]' → {theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}
'bg-[#1a1a1a]' → {theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}
'bg-white/5' → {theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}
'bg-white/10' → {theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}

// Text
'text-white' → {theme === 'dark' ? 'text-white' : 'text-black'}
'text-white/60' → {theme === 'dark' ? 'text-white/60' : 'text-gray-600'}
'text-white/80' → {theme === 'dark' ? 'text-white/80' : 'text-gray-800'}

// Borders
'border-white/10' → {theme === 'dark' ? 'border-white/10' : 'border-gray-200'}
'border-white/20' → {theme === 'dark' ? 'border-white/20' : 'border-gray-300'}

// Keep as-is (accent colors)
'text-[#FFD700]' → NO CHANGE
'bg-gradient-to-r from-[#FFD700] to-[#FFA500]' → NO CHANGE
'text-green-500' → NO CHANGE
'text-red-500' → NO CHANGE
```

## ✅ Post-Conversion Verification

After converting all components:

1. **Build Test**: `npm run build` should complete without errors
2. **Run Dev**: `npm run dev` should start without issues
3. **Navigate**: Test all routes (/, /terminal, /kyc, etc.)
4. **Theme Toggle**: Test dark/light mode on all pages
5. **Login Flow**: Test login → terminal → logout
6. **Responsive**: Test on mobile (375px), tablet (768px), desktop (1440px)
7. **Modals**: Test all modals open/close correctly

## 🐛 Common Post-Conversion Issues

### Issue: Build fails with "useState is not defined"
**Fix**: Add `'use client'` to that component

### Issue: Styles not applying correctly
**Fix**: Check theme prop is passed down and used in classNames

### Issue: Navigation not working
**Fix**: Update `<a href>` to `<Link href>` and use `useRouter` instead of `useNavigate`

### Issue: Images not loading
**Fix**: Update `next.config.js` to include image domains

---

**Remember**: Test after each component conversion, don't wait until all are done!
