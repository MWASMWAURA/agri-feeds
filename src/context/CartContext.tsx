import { createContext, useContext, useState, ReactNode } from 'react';
import { useAdmin } from './AdminContext';

export interface Product {
  id: string;
  name: string;
  emoji: string;
  price: number;
  description: string;
  color: string;
  longDescription?: string;
  weight?: string;
  ingredients?: string[];
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const products: Product[] = [
  {
    id: 'chicken-feed',
    name: 'Chicken Feed',
    emoji: '🐓',
    price: 24.99,
    description: 'Premium layer pellets for healthy, happy hens',
    color: 'bg-farm-gold/40',
    longDescription: 'Our premium chicken feed is specially formulated to provide complete nutrition for laying hens. Rich in calcium for strong eggshells and packed with essential vitamins.',
    weight: '25 kg',
    ingredients: ['Corn', 'Soybean Meal', 'Wheat', 'Calcium Carbonate', 'Vitamins A, D, E'],
  },
  {
    id: 'cattle-mix',
    name: 'Cattle Mix',
    emoji: '🐄',
    price: 45.99,
    description: 'High-protein blend for beef & dairy cattle',
    color: 'bg-farm-green/30',
    longDescription: 'A scientifically balanced feed for optimal cattle growth and milk production. Contains high-quality proteins and essential minerals for healthy livestock.',
    weight: '50 kg',
    ingredients: ['Alfalfa', 'Corn Gluten', 'Molasses', 'Salt', 'Phosphorus', 'Trace Minerals'],
  },
  {
    id: 'pig-pellets',
    name: 'Pig Pellets',
    emoji: '🐷',
    price: 32.99,
    description: 'Balanced nutrition for growing swine',
    color: 'bg-accent/30',
    longDescription: 'Complete feed for pigs at all growth stages. Promotes lean muscle development and healthy weight gain with optimized protein levels.',
    weight: '40 kg',
    ingredients: ['Barley', 'Wheat Middlings', 'Fish Meal', 'Lysine', 'Methionine'],
  },
  {
    id: 'horse-oats',
    name: 'Horse Oats',
    emoji: '🐴',
    price: 38.99,
    description: 'Premium whole oats for equine excellence',
    color: 'bg-secondary/40',
    longDescription: 'Pure, clean whole oats perfect for horses of all ages. Provides sustained energy for work and performance horses.',
    weight: '30 kg',
    ingredients: ['Whole Oats', 'Flaxseed', 'Beet Pulp', 'Vitamin E', 'Selenium'],
  },
  {
    id: 'sheep-feed',
    name: 'Sheep Feed',
    emoji: '🐑',
    price: 28.99,
    description: 'Complete nutrition for wool & meat production',
    color: 'bg-farm-sky/30',
    longDescription: 'Specially designed for sheep health and wool quality. Contains copper-controlled formula safe for all sheep breeds.',
    weight: '25 kg',
    ingredients: ['Timothy Hay', 'Oats', 'Barley', 'Zinc', 'Cobalt', 'Iodine'],
  },
  {
    id: 'goat-mix',
    name: 'Goat Mix',
    emoji: '🐐',
    price: 26.99,
    description: 'All-purpose feed for dairy & meat goats',
    color: 'bg-farm-brown/20',
    longDescription: 'Versatile feed suitable for dairy does and meat goats. Supports milk production and healthy kid development.',
    weight: '25 kg',
    ingredients: ['Alfalfa Pellets', 'Corn', 'Oats', 'Copper', 'Selenium', 'Vitamin B12'],
  },
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { recordSale } = useAdmin();

  const addToCart = (product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        // Record sale when quantity is updated
        recordSale(product.id, 1);
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Record sale for new item
      recordSale(product.id, 1);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
