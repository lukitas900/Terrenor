import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Sword, Sparkles, BookOpen, Map, Package, Scroll, LayoutGrid, Users } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Início', icon: null },
  { path: '/racas', label: 'Raças', icon: Sword },
  { path: '/magias', label: 'Magias', icon: Sparkles },
  { path: '/religioes', label: 'Religiões', icon: BookOpen },
  { path: '/itens', label: 'Itens', icon: Package },
  { path: '/mapa', label: 'Mapa', icon: Map },
  { path: '/contos', label: 'Contos', icon: Scroll },
  { path: '/jogadores', label: 'Jogadores', icon: Users },
  { path: '/tabuleiro', label: 'Tabuleiro', icon: LayoutGrid },

];

interface HeaderProps {
  onSearch?: (query: string) => void;
  showSearch?: boolean;
}

export function Header({ onSearch, showSearch = false }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#2d1b4e]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <span
              className="text-xl font-bold gradient-text"
              style={{ fontFamily: 'Cinzel Decorative, serif' }}
            >
              TERRENOR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 flex items-center gap-2 ${location.pathname === item.path
                    ? 'text-[#9d4edd] bg-[#2d1b4e]/50'
                    : 'text-[#e0e0e0]/70 hover:text-[#e0e0e0] hover:bg-[#2d1b4e]/30'
                  }`}
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            {showSearch && onSearch && (
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-lg text-[#e0e0e0]/70 hover:text-[#e0e0e0] hover:bg-[#2d1b4e]/30 transition-all"
              >
                <Search className="w-5 h-5" />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-[#e0e0e0]/70 hover:text-[#e0e0e0] hover:bg-[#2d1b4e]/30 transition-all"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && searchOpen && (
          <div className="py-3 border-t border-[#2d1b4e]/30">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#e0e0e0]/50" />
              <input
                type="text"
                placeholder="Buscar..."
                onChange={(e) => onSearch?.(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#1a0b2e] border border-[#2d1b4e] rounded-lg text-[#e0e0e0] placeholder-[#e0e0e0]/50 focus:outline-none focus:border-[#9d4edd]"
                autoFocus
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a]/95 border-t border-[#2d1b4e]/50">
          <nav className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${location.pathname === item.path
                    ? 'text-[#9d4edd] bg-[#2d1b4e]/50'
                    : 'text-[#e0e0e0]/70 hover:text-[#e0e0e0] hover:bg-[#2d1b4e]/30'
                  }`}
              >
                {item.icon && <item.icon className="w-5 h-5" />}
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
