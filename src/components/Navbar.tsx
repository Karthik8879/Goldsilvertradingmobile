import { Coins } from 'lucide-react';
import { WorldClock } from './WorldClock';

interface NavbarProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
}

export function Navbar({ isLoggedIn, onLoginClick }: NavbarProps) {
  const menuItems = [
    'About Us',
    'Live Rate',
    'Updates',
    'Bank Details',
    'Economic Calendar',
    'Contact Details'
  ];

  return (
    <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      {/* World Clock Bar */}
      <div className="bg-black/60 border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-8 py-2 flex justify-end">
          <WorldClock />
        </div>
      </div>
      
      <div className="max-w-[1440px] mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-lg flex items-center justify-center shadow-lg shadow-yellow-500/30">
              <Coins className="w-6 h-6 text-black" />
            </div>
            <span className="text-xl text-white tracking-tight">
              <span className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">Gold</span>
              <span className="text-white">Trade</span>
            </span>
          </div>

          {/* Menu Items */}
          <div className="flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm text-white/80 hover:text-[#FFD700] transition-colors relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#FFD700] to-[#FFA500] group-hover:w-full transition-all duration-300 shadow-lg shadow-yellow-500/50"></span>
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <>
                <button
                  onClick={onLoginClick}
                  className="px-6 py-2 border border-[#FFD700]/50 rounded-lg text-sm text-white hover:border-[#FFD700] hover:shadow-lg hover:shadow-yellow-500/30 transition-all"
                >
                  Login
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#FFD700] to-[#FFA500] rounded-full"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}