# Component Conversion Guide - Vite to Next.js

## 🎯 Conversion Checklist

### ✅ Already Converted:
- `/app/layout.tsx` - Root layout
- `/app/page.tsx` - Home page
- `/app/globals.css` - Global styles
- `/app/terminal/page.tsx` - Trading Terminal page
- `/app/kyc/page.tsx` - KYC page
- `/app/tds/page.tsx` - TDS Calculator page
- `/app/bank-details/page.tsx` - Bank Details page
- `/app/calendar/page.tsx` - Economic Calendar page
- `/app/messages/page.tsx` - Messages page
- `/components/layout/Header.tsx` - Main header
- `/components/layout/Footer.tsx` - Footer
- `/components/home/Hero.tsx` - Hero section
- `/components/home/LivePrices.tsx` - Live prices
- `/hooks/useTheme.ts` - Theme hook
- `/hooks/useAuth.ts` - Auth hook
- `/providers/ThemeProvider.tsx` - Theme provider

### 🔄 Need to Convert:

#### Home Components:
1. **Products.tsx** → `/components/home/Products.tsx`
   - Add `'use client'`
   - Update imports to use `@/components/...`
   - Add theme prop

2. **Charts.tsx** → `/components/home/Charts.tsx`
   - Add `'use client'`
   - Update recharts imports
   - Add theme prop

3. **News.tsx** → `/components/home/News.tsx`
   - Add `'use client'`
   - Update imports
   - Add theme prop

4. **FAQ.tsx** → `/components/home/FAQ.tsx`
   - Add `'use client'`
   - Update imports
   - Add theme prop

5. **AboutUs.tsx** → `/components/home/AboutUs.tsx`
   - Can be server component (no state)
   - Update imports
   - Add theme prop

#### Page Components:
6. **KYC.tsx** → `/components/pages/KYC.tsx`
   - Add `'use client'`
   - Update imports
   - Add theme prop

7. **TDSCalculator.tsx** → `/components/pages/TDSCalculator.tsx`
   - Add `'use client'`
   - Update imports
   - Add theme prop

8. **BankDetails.tsx** → `/components/pages/BankDetails.tsx`
   - Add `'use client'`
   - Update imports
   - Add theme prop

9. **EconomicCalendar.tsx** → `/components/pages/EconomicCalendar.tsx`
   - Add `'use client'`
   - Update imports
   - Add theme prop

10. **Messages.tsx** → `/components/pages/Messages.tsx`
    - Add `'use client'`
    - Update imports
    - Add theme prop

#### Terminal Components:
11. **TradingTerminal.tsx** → `/components/terminal/TradingTerminal.tsx`
    - Add `'use client'`
    - Update imports
    - Already has theme prop

#### Modal Components:
12. **LoginModal.tsx** → `/components/modals/LoginModal.tsx`
    - Add `'use client'`
    - Update imports
    - Use `useAuth` hook for login
    - Add theme prop

13. **BuyModal.tsx** → `/components/modals/BuyModal.tsx`
    - Add `'use client'`
    - Update imports
    - Add theme prop

#### UI Components:
14. **Button.tsx** → Keep in `/components/ui/Button.tsx`
15. **Card.tsx** → Keep in `/components/ui/Card.tsx`
16. **Badge.tsx** → Keep in `/components/ui/Badge.tsx`

## 🔧 Conversion Steps for Each Component

### Step 1: Add 'use client' directive
```typescript
'use client';  // Add at the very top if component uses:
               // - useState, useEffect, useContext
               // - Event handlers (onClick, onChange, etc.)
               // - Browser APIs (localStorage, window, etc.)
```

### Step 2: Update imports
```typescript
// OLD (Vite)
import { Button } from './ui/Button';
import { Card } from './ui/Card';

// NEW (Next.js)
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
```

### Step 3: Add theme prop
```typescript
// OLD
export function ComponentName() {
  return <div className="text-white">...</div>;
}

// NEW
interface ComponentProps {
  theme: 'dark' | 'light';
}

export function ComponentName({ theme }: ComponentProps) {
  return (
    <div className={theme === 'dark' ? 'text-white' : 'text-black'}>
      ...
    </div>
  );
}
```

### Step 4: Update navigation
```typescript
// OLD (React Router)
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/terminal');

// NEW (Next.js)
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/terminal');
```

### Step 5: Update links
```typescript
// OLD
<a href="/kyc">KYC</a>

// NEW
import Link from 'next/link';
<Link href="/kyc">KYC</Link>
```

## 📋 Quick Conversion Template

```typescript
'use client';

import React, { useState } from 'react';
import { ComponentName } from '@/components/...';

interface YourComponentProps {
  theme: 'dark' | 'light';
  // ... other props
}

export function YourComponent({ theme }: YourComponentProps) {
  const [state, setState] = useState();

  return (
    <div className={theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}>
      {/* Your JSX */}
    </div>
  );
}
```

## 🎨 Theme Patterns

### Background Colors:
```typescript
className={`${theme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-gray-50'}`}
className={`${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}`}
```

### Text Colors:
```typescript
className={`${theme === 'dark' ? 'text-white' : 'text-black'}`}
className={`${theme === 'dark' ? 'text-white/60' : 'text-gray-600'}`}
className={`${theme === 'dark' ? 'text-white/80' : 'text-gray-800'}`}
```

### Border Colors:
```typescript
className={`${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}
className={`${theme === 'dark' ? 'border-white/20' : 'border-gray-300'}`}
```

### Card/Panel Backgrounds:
```typescript
className={`${theme === 'dark' ? 'bg-white/5' : 'bg-gray-100'}`}
className={`${theme === 'dark' ? 'bg-white/10' : 'bg-gray-200'}`}
```

## 🚀 After Conversion

1. **Test each component** in both dark and light modes
2. **Check responsive design** on mobile, tablet, and desktop
3. **Verify navigation** between pages works correctly
4. **Test authentication flow** from login to terminal
5. **Check all modals** open and close properly

## 📝 Common Issues & Solutions

### Issue: "useState is not defined"
**Solution**: Add `'use client'` directive at the top

### Issue: "Cannot find module '@/components/...'"
**Solution**: Make sure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Issue: "Hydration mismatch"
**Solution**: Don't use `localStorage` or `window` during initial render. Use `useEffect`:
```typescript
const [mounted, setMounted] = useState(false);

useEffect(() => {
  setMounted(true);
  const saved = localStorage.getItem('key');
  // ...
}, []);

if (!mounted) return null;
```

### Issue: "Image not loading"
**Solution**: For external images, add domain to `next.config.js`:
```javascript
module.exports = {
  images: {
    domains: ['images.unsplash.com', 'cdn.pixabay.com'],
  },
}
```

## ✅ Final Checklist

- [ ] All components have `'use client'` if needed
- [ ] All imports use `@/components/...` pattern
- [ ] All components accept `theme` prop
- [ ] All navigation uses Next.js `Link` or `useRouter`
- [ ] All pages are in `/app` directory
- [ ] All shared components are in `/components`
- [ ] Dark/light mode works everywhere
- [ ] Mobile responsive on all pages
- [ ] No console errors
- [ ] Build completes successfully (`npm run build`)

---

**Pro Tip**: Convert components in this order:
1. UI components (Button, Card, Badge) ✅
2. Layout components (Header, Footer) ✅
3. Home page components (Hero, LivePrices, Products, etc.)
4. Page components (KYC, TDS, etc.)
5. Modal components (Login, Buy)
6. Complex components (TradingTerminal)
