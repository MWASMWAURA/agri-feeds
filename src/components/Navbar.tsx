import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

export const Navbar = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { itemCount } = useCart();

  const links = [
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b-4 border-foreground">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-xl md:text-2xl uppercase flex items-center gap-2 hover:scale-105 transition-transform">
          <span className="text-2xl md:text-3xl">🌾</span>
          AGRI FEEDS
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative font-mono uppercase text-sm tracking-wider"
              onMouseEnter={() => setIsHovered(link.name)}
              onMouseLeave={() => setIsHovered(null)}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-1 bg-primary transition-all duration-200 ${
                  isHovered === link.name ? 'w-full' : 'w-0'
                }`}
              />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link 
            to="/cart"
            className="relative px-4 md:px-6 py-2 bg-primary text-primary-foreground font-display uppercase rounded-full overflow-hidden group hover:scale-105 transition-transform"
          >
            <span className="relative z-10 flex items-center gap-2">
              <span className="hidden sm:inline">Cart</span>
              <span className="sm:hidden">🛒</span>
              <span className="bg-background text-foreground text-xs px-2 py-0.5 rounded-full">
                {itemCount}
              </span>
            </span>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t-2 border-foreground animate-fade-in">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-4 py-3 font-mono uppercase text-sm tracking-wider border-b border-border hover:bg-muted"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
