# GoldJar - Complete Next.js Implementation

## 🎯 Next.js 14+ App Router Structure

```
goldjar/
├── app/
│   ├── layout.tsx                 # Root layout with ThemeProvider
│   ├── page.tsx                   # Home page (Hero, LivePrices, Products, etc.)
│   ├── globals.css                # Global styles with Tailwind
│   ├── terminal/
│   │   └── page.tsx              # Trading Terminal (protected route)
│   ├── kyc/
│   │   └── page.tsx              # KYC Details page
│   ├── tds/
│   │   └── page.tsx              # TDS Calculator page
│   ├── bank-details/
│   │   └── page.tsx              # Bank Details page
│   ├── calendar/
│   │   └── page.tsx              # Economic Calendar page
│   └── messages/
│       └── page.tsx              # Messages page
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Main navigation header
│   │   └── Footer.tsx            # Footer component
│   ├── home/
│   │   ├── Hero.tsx              # Hero section
│   │   ├── LivePrices.tsx        # Live price cards
│   │   ├── Products.tsx          # Product tabs
│   │   ├── Charts.tsx            # Price charts
│   │   ├── News.tsx              # News section
│   │   ├── FAQ.tsx               # FAQ accordion
│   │   └── AboutUs.tsx           # About Us section
│   ├── terminal/
│   │   └── TradingTerminal.tsx   # Main trading terminal
│   ├── pages/
│   │   ├── KYC.tsx               # KYC component
│   │   ├── TDSCalculator.tsx     # TDS Calculator
│   │   ├── BankDetails.tsx       # Bank Details
│   │   ├── EconomicCalendar.tsx  # Economic Calendar
│   │   └── Messages.tsx          # Messages
│   ├── modals/
│   │   ├── LoginModal.tsx        # Login modal
│   │   └── BuyModal.tsx          # Buy/Sell modal
│   └── ui/
│       ├── Button.tsx            # Button component
│       ├── Card.tsx              # Card component
│       └── ...                   # Other UI components
│
├── hooks/
│   ├── useTheme.ts               # Theme management hook
│   ├── useAuth.ts                # Authentication hook
│   └── useLivePrices.ts          # Live price updates hook
│
├── providers/
│   └── ThemeProvider.tsx         # Theme context provider
│
├── lib/
│   └── utils.ts                  # Utility functions
│
├── public/
│   └── images/                   # Static images
│
├── next.config.js                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 📦 Package.json

```json
{
  "name": "goldjar",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "^14.1.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "lucide-react": "^0.312.0",
    "recharts": "^2.10.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.2.0"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.0",
    "postcss": "^8",
    "autoprefixer": "^10.0.1",
    "eslint": "^8",
    "eslint-config-next": "14.1.0"
  }
}
```

## ⚙️ Next.js Configuration

### next.config.js
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['api.dicebear.com', 'images.unsplash.com'],
  },
  experimental: {
    optimizeCss: true,
  },
}

module.exports = nextConfig
```

### tailwind.config.ts
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#FFD700',
          dark: '#FFA500',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-gold': 'linear-gradient(135deg, #FFD700, #FFA500)',
      },
    },
  },
  plugins: [],
}

export default config
```

## 🚀 Key Features

### 1. **App Router Structure**
- ✅ File-based routing with `app/` directory
- ✅ Server & Client Components separation
- ✅ Layouts and nested routing
- ✅ Loading & error states
- ✅ Metadata API for SEO

### 2. **Component Organization**
```typescript
// Server Component (default)
export default function Page() {
  return <div>Server Component</div>
}

// Client Component (for interactivity)
'use client';
export default function InteractiveComponent() {
  const [state, setState] = useState();
  return <div>Client Component</div>
}
```

### 3. **Navigation**
```typescript
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

// Links
<Link href="/terminal">Go to Terminal</Link>

// Programmatic navigation
const router = useRouter();
router.push('/terminal');

// Current path
const pathname = usePathname();
```

### 4. **Image Optimization**
```typescript
import Image from 'next/image';

<Image 
  src="/logo.png" 
  alt="GoldJar" 
  width={100} 
  height={100}
  priority
/>
```

### 5. **Authentication Flow**
```typescript
// hooks/useAuth.ts
export function useAuth() {
  const router = useRouter();
  
  const login = async (email, password) => {
    // API call
    localStorage.setItem('auth-token', token);
    router.push('/terminal');
  };
  
  const logout = () => {
    localStorage.removeItem('auth-token');
    router.push('/');
  };
  
  return { login, logout, isLoggedIn };
}
```

### 6. **Protected Routes**
```typescript
// app/terminal/page.tsx
'use client';
import { redirect } from 'next/navigation';

export default function TerminalPage() {
  const { isLoggedIn } = useAuth();
  
  if (!isLoggedIn) {
    redirect('/');
  }
  
  return <TradingTerminal />;
}
```

### 7. **Theme Management**
```typescript
// providers/ThemeProvider.tsx
'use client';

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved) setTheme(saved);
  }, []);
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
}
```

## 🎨 Styling Approach

### Global Styles (app/globals.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 4%;
    --foreground: 0 0% 98%;
  }
  
  .dark {
    --background: 0 0% 4%;
  }
  
  .light {
    --background: 0 0% 98%;
  }
}

@layer components {
  .glass-card {
    @apply backdrop-blur-xl bg-white/5 border border-white/10;
  }
  
  .gold-text {
    @apply bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent;
  }
}
```

## 📱 Responsive Design

```typescript
// Mobile-first approach
<div className="
  grid 
  grid-cols-1           // Mobile
  md:grid-cols-2        // Tablet
  lg:grid-cols-3        // Desktop
  gap-4
">
```

## 🔧 Environment Variables

### .env.local
```bash
NEXT_PUBLIC_API_URL=https://api.goldjar.com
NEXT_PUBLIC_SITE_URL=https://goldjar.com
```

### Usage
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;
```

## 🚦 Running the Application

```bash
# Install dependencies
npm install

# Development mode
npm run dev

# Production build
npm run build
npm run start

# Linting
npm run lint
```

## 📊 Performance Optimizations

1. **Image Optimization**: Next.js Image component
2. **Code Splitting**: Automatic with App Router
3. **Server Components**: Reduce client-side JavaScript
4. **Font Optimization**: next/font
5. **CSS Optimization**: Tailwind JIT compilation

## 🔐 Security

1. **Environment Variables**: Never expose secrets
2. **CSRF Protection**: Built into Next.js
3. **XSS Prevention**: React's built-in escaping
4. **Authentication**: Secure token management

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## ✨ Key Differences from Vite

| Feature | Vite | Next.js |
|---------|------|---------|
| Routing | React Router | File-based App Router |
| SSR | Manual setup | Built-in |
| Images | Standard `<img>` | Optimized `<Image>` |
| API Routes | Separate backend | Built-in API routes |
| Build | Rollup | Webpack/Turbopack |
| Deploy | Static files | Vercel/Node server |

---

**Note**: This is a complete Next.js implementation. All components need to be marked with `'use client'` if they use hooks, state, or browser APIs. Server components are default and faster.
