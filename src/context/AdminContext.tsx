import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from './CartContext';

export interface AdminProduct extends Product {
  salesCount: number;
  isManuallyPopular: boolean;
  category: string;
  stock: number;
  dateAdded: string;
  image?: string; // base64 encoded image data
}

export interface SaleRecord {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalAmount: number;
  timestamp: string;
  customerEmail?: string;
}

interface AdminContextType {
  products: AdminProduct[];
  salesHistory: SaleRecord[];
  addProduct: (product: Omit<AdminProduct, 'salesCount' | 'dateAdded' | 'id'>) => void;
  updateProduct: (id: string, updates: Partial<AdminProduct>) => void;
  deleteProduct: (id: string) => void;
  recordSale: (productId: string, quantity: number, customerEmail?: string) => void;
  searchProducts: (query: string) => AdminProduct[];
  filterProductsByCategory: (category: string) => AdminProduct[];
  getPopularProducts: () => AdminProduct[];
  toggleManualPopular: (id: string) => void;
  getSalesAnalytics: () => {
    totalSales: number;
    totalRevenue: number;
    topSellingProducts: { product: AdminProduct; salesCount: number }[];
    recentSales: SaleRecord[];
    categoryStats: { category: string; count: number; revenue: number }[];
  };
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PRODUCTS: 'agri-admin-products',
  SALES: 'agri-admin-sales',
};

const categories = ['Feed', 'Supplements', 'Equipment', 'Treats'];

const defaultProducts: AdminProduct[] = [
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
    salesCount: 45,
    isManuallyPopular: false,
    category: 'Feed',
    stock: 150,
    dateAdded: '2024-01-15',
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
    salesCount: 32,
    isManuallyPopular: true,
    category: 'Feed',
    stock: 89,
    dateAdded: '2024-01-16',
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
    salesCount: 28,
    isManuallyPopular: false,
    category: 'Feed',
    stock: 67,
    dateAdded: '2024-01-17',
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
    salesCount: 19,
    isManuallyPopular: false,
    category: 'Feed',
    stock: 43,
    dateAdded: '2024-01-18',
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
    salesCount: 23,
    isManuallyPopular: false,
    category: 'Feed',
    stock: 78,
    dateAdded: '2024-01-19',
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
    salesCount: 31,
    isManuallyPopular: false,
    category: 'Feed',
    stock: 92,
    dateAdded: '2024-01-20',
  },
];

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [salesHistory, setSalesHistory] = useState<SaleRecord[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    const savedSales = localStorage.getItem(STORAGE_KEYS.SALES);
    
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      setProducts(defaultProducts);
    }
    
    if (savedSales) {
      setSalesHistory(JSON.parse(savedSales));
    }
  }, []);

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  // Save sales to localStorage whenever sales change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(salesHistory));
  }, [salesHistory]);

  const addProduct = (productData: Omit<AdminProduct, 'salesCount' | 'dateAdded' | 'id'>) => {
    // Generate a unique ID
    const id = productData.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();
    
    const newProduct: AdminProduct = {
      ...productData,
      id,
      salesCount: 0,
      dateAdded: new Date().toISOString().split('T')[0],
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<AdminProduct>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const recordSale = (productId: string, quantity: number, customerEmail?: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const sale: SaleRecord = {
      id: Date.now().toString(),
      productId,
      productName: product.name,
      quantity,
      totalAmount: product.price * quantity,
      timestamp: new Date().toISOString(),
      customerEmail,
    };

    setSalesHistory(prev => [sale, ...prev]);
    
    // Update product sales count
    setProducts(prev => prev.map(p => 
      p.id === productId 
        ? { ...p, salesCount: p.salesCount + quantity }
        : p
    ));
  };

  const searchProducts = (query: string): AdminProduct[] => {
    if (!query.trim()) return products;
    
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(lowercaseQuery)
      )
    );
  };

  const filterProductsByCategory = (category: string): AdminProduct[] => {
    if (category === 'All') return products;
    return products.filter(product => product.category === category);
  };

  const getPopularProducts = (): AdminProduct[] => {
    return [...products].sort((a, b) => {
      // First prioritize manually popular items
      if (a.isManuallyPopular && !b.isManuallyPopular) return -1;
      if (!a.isManuallyPopular && b.isManuallyPopular) return 1;
      
      // Then sort by sales count
      return b.salesCount - a.salesCount;
    });
  };

  const toggleManualPopular = (id: string) => {
    setProducts(prev => prev.map(product =>
      product.id === id 
        ? { ...product, isManuallyPopular: !product.isManuallyPopular }
        : product
    ));
  };

  const getSalesAnalytics = () => {
    const totalSales = salesHistory.reduce((sum, sale) => sum + sale.quantity, 0);
    const totalRevenue = salesHistory.reduce((sum, sale) => sum + sale.totalAmount, 0);
    
    const topSellingProducts = products
      .map(product => ({ product, salesCount: product.salesCount }))
      .sort((a, b) => b.salesCount - a.salesCount)
      .slice(0, 5);

    const recentSales = salesHistory.slice(0, 10);

    const categoryStats = categories.map(category => {
      const categoryProducts = products.filter(p => p.category === category);
      const categorySales = salesHistory.filter(sale => 
        categoryProducts.some(p => p.id === sale.productId)
      );
      const revenue = categorySales.reduce((sum, sale) => sum + sale.totalAmount, 0);
      
      return {
        category,
        count: categoryProducts.length,
        revenue,
      };
    });

    return {
      totalSales,
      totalRevenue,
      topSellingProducts,
      recentSales,
      categoryStats,
    };
  };

  return (
    <AdminContext.Provider value={{
      products,
      salesHistory,
      addProduct,
      updateProduct,
      deleteProduct,
      recordSale,
      searchProducts,
      filterProductsByCategory,
      getPopularProducts,
      toggleManualPopular,
      getSalesAnalytics,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within an AdminProvider');
  return context;
};