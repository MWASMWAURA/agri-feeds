import { Link } from 'react-router-dom';
import { MarqueeText } from './MarqueeText';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <MarqueeText 
        text="FRESH FEEDS • HAPPY ANIMALS • HEALTHY FARMS" 
        className="text-xl md:text-4xl font-display py-6 text-farm-gold mb-8"
      />
      
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="font-display text-2xl mb-4">AGRI FEEDS</h3>
            <p className="font-mono text-sm opacity-70">
              Premium agricultural nutrition since 1952. Feeding farms, feeding futures.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">Quick Links</h4>
            <ul className="font-mono text-sm space-y-2 opacity-70">
              <li><Link to="/shop" className="hover:opacity-100 transition-opacity">Shop All</Link></li>
              <li><Link to="/about" className="hover:opacity-100 transition-opacity">About Us</Link></li>
              <li><Link to="/contact" className="hover:opacity-100 transition-opacity">Contact</Link></li>
              <li><Link to="/cart" className="hover:opacity-100 transition-opacity">Cart</Link></li>
              <li><Link to="/admin" className="hover:opacity-100 transition-opacity text-farm-gold">Admin Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg mb-4">Stay Connected</h4>
            <div className="flex gap-4 text-3xl">
              <span className="cursor-pointer hover:scale-125 transition-transform">📧</span>
              <span className="cursor-pointer hover:scale-125 transition-transform">📱</span>
              <span className="cursor-pointer hover:scale-125 transition-transform">🌐</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-background/20 pt-6 text-center font-mono text-xs opacity-50">
          © 2024 Agri Feeds Co. All rights reserved. Made with 🌾 for farmers.
        </div>
      </div>
    </footer>
  );
};
