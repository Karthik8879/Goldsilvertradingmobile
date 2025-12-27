# 🏆 GoldJar - Premium Gold & Silver Trading Platform

A modern, luxury fintech platform for trading gold, silver, and precious metal coins with real-time pricing, interactive charts, and comprehensive portfolio management.

![Next.js](https://img.shields.io/badge/Next.js-14.2-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

### 🎨 **Luxury Design**
- Dark/Light theme toggle with persistent preferences
- Glassmorphism effects with metallic gold accents
- Smooth animations and transitions throughout
- Fully responsive design (320px → 2560px+)

### 💰 **Trading Features**
- Real-time spot prices for Gold & Silver
- Live product pricing (999 & 995 purity)
- Interactive buy/sell interface
- Advanced trading terminal
- Portfolio tracking with P/L calculations

### 📊 **Analytics & Tools**
- TDS (Tax Deducted at Source) Calculator
- Interactive price charts (Recharts)
- Economic calendar with market events
- News feed with categorized updates

### 🔐 **Security & Compliance**
- KYC verification system
- Secure document upload
- Bank account details management
- OTP-based authentication

### 📱 **Pages**
- **Home** - Hero, live prices, products, charts, news, FAQ, about
- **Trading Terminal** - Professional trading interface
- **KYC** - Document verification
- **TDS Calculator** - Tax calculation tool
- **Bank Details** - Payment information
- **Economic Calendar** - Market events
- **Messages** - Support communication

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/goldjar-nextjs.git
cd goldjar-nextjs

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
goldjar-nextjs/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── terminal/          # Trading terminal
│   ├── kyc/               # KYC verification
│   ├── tds/               # TDS calculator
│   ├── bank-details/      # Bank info
│   ├── calendar/          # Economic calendar
│   └── messages/          # Support messages
│
├── components/
│   ├── home/              # Home page sections
│   ├── layout/            # Header & Footer
│   ├── pages/             # Page-specific components
│   ├── terminal/          # Trading terminal
│   ├── modals/            # Modal dialogs
│   ├── ui/                # Reusable UI components
│   └── figma/             # Figma imports
│
├── hooks/                 # Custom React hooks
├── providers/             # Context providers
└── public/                # Static assets
```

---

## 🎨 Tech Stack

- **Framework:** [Next.js 14.2](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **UI Components:** Custom + [shadcn/ui](https://ui.shadcn.com/)

---

## 🌈 Theme System

The app features a complete dark/light theme system:

```typescript
// Dark Mode (default)
- Background: #0a0a0a
- Text: White
- Accents: Gold (#FFD700)
- Glass: rgba(255, 255, 255, 0.05)

// Light Mode
- Background: #f9fafb
- Text: Black
- Accents: Gold (#FFD700)
- Glass: rgba(0, 0, 0, 0.05)
```

Toggle theme using the button in the header (Moon/Sun icon).

---

## 📱 Responsive Breakpoints

```css
Mobile:  320px - 639px
Tablet:  640px - 1023px
Desktop: 1024px - 1439px
Large:   1440px+
```

All components adapt seamlessly across all screen sizes.

---

## 🔧 Configuration

### Environment Variables
Create a `.env.local` file (optional for future enhancements):

```env
NEXT_PUBLIC_SITE_URL=https://yoursite.com
# Add API keys when integrating real services
```

### Tailwind Configuration
Custom theme values in `app/globals.css`:

```css
@theme {
  --color-charcoal-900: #0a0a0a;
  --color-gold-500: #FFD700;
  /* ... more custom colors */
}
```

---

## 🧪 Testing

```bash
# Type checking
npm run type-check

# Build check
npm run build

# Manual testing checklist:
- [ ] Home page loads all sections
- [ ] Theme toggle works
- [ ] Login modal opens
- [ ] Navigation between pages
- [ ] Mobile hamburger menu
- [ ] Forms accept input
- [ ] Product selection works
- [ ] Charts render correctly
```

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

Or use the Vercel GitHub integration for automatic deployments.

### Other Platforms
- **Netlify:** Works out of the box
- **AWS Amplify:** Full SSR support
- **Railway:** One-click deploy
- **Render:** Automatic builds

---

## 🛣️ Roadmap

- [ ] Supabase integration for real database
- [ ] Real-time price updates via WebSocket
- [ ] Payment gateway integration (Razorpay)
- [ ] Email notifications for KYC/trades
- [ ] Advanced charting with TradingView
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] PWA capabilities

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

---

## 👨‍💻 Development

### Key Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript check
```

### Code Style
- Use TypeScript for all new files
- Follow component-based architecture
- Use Tailwind classes (avoid inline styles)
- Implement proper error handling
- Add loading states for async operations

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Email: support@goldjar.com (example)
- Documentation: See `/CONVERSION_COMPLETE.md`

---

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first approach
- Recharts for beautiful charting library
- shadcn/ui for component patterns
- Lucide for the icon library

---

## ⚠️ Disclaimer

**This is a demo trading platform for educational purposes.** 

- Not for collecting real PII or sensitive data
- Not connected to real payment gateways
- Sample data used for demonstration
- Not financial advice

For production use, implement:
- Real authentication (OAuth, JWT)
- Secure backend API
- Database encryption
- PCI DSS compliance
- Legal compliance for fintech

---

**Built with ❤️ using Next.js 14+ App Router**

*Made for the modern web • Optimized for performance • Designed for scale*

---

## 📸 Screenshots

### Home Page
![Home Page](docs/screenshots/home.png)

### Trading Terminal
![Trading Terminal](docs/screenshots/terminal.png)

### Dark/Light Theme
![Theme Toggle](docs/screenshots/theme.png)

*(Add screenshots to `/docs/screenshots/` folder)*

---

**Star ⭐ this repo if you found it helpful!**
