import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart, Product } from '@/context/CartContext';
import { AdminProduct } from '@/context/AdminContext';

interface ProductCardProps {
  product: Product | AdminProduct;
  delay?: number;
  showPopularBadge?: boolean;
  showStockInfo?: boolean;
  isListView?: boolean;
}

export const ProductCard = ({ 
  product, 
  delay = 0, 
  showPopularBadge = true, 
  showStockInfo = false,
  isListView = false
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  // Check if product has popularity data (AdminProduct)
  const adminProduct = product as AdminProduct;
  const isPopular = showPopularBadge && (
    adminProduct.salesCount >= 10 || 
    adminProduct.isManuallyPopular
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 20;
    const y = (e.clientX - rect.left - rect.width / 2) / -20;
    setRotation({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  if (isListView) {
    return (
      <div
        className="relative cursor-pointer animate-fade-in bg-background border-2 border-foreground rounded-2xl p-4 hover:shadow-lg transition-all duration-300"
        style={{ 
          animationDelay: `${delay}ms`
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Link to={`/product/${product.id}`} className="flex items-center gap-4">
          <div className="flex-shrink-0">
            {'image' in adminProduct && adminProduct.image ? (
              <img
                src={adminProduct.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
            ) : (
              <div className="text-4xl">{product.emoji}</div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-lg uppercase mb-1 text-foreground truncate">{product.name}</h3>
            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
            <div className="flex items-center gap-4">
              <span className="font-display text-xl text-foreground">${product.price.toFixed(2)}</span>
              {showStockInfo && 'stock' in adminProduct && (
                <span className={`text-xs font-mono px-2 py-1 rounded ${
                  adminProduct.stock > 10 
                    ? 'bg-green-100 text-green-800' 
                    : adminProduct.stock > 0 
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                }`}>
                  Stock: {adminProduct.stock}
                </span>
              )}
              {isPopular && showPopularBadge && (
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full font-mono text-xs uppercase">
                  🔥 Popular!
                </span>
              )}
            </div>
          </div>
          <button 
            onClick={handleAddToCart}
            className={`px-4 py-2 font-mono text-sm uppercase tracking-wider rounded-full transition-all duration-200 hover:scale-105 ${
              added 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-foreground text-background'
            }`}
          >
            {added ? '✓ Added!' : 'Add to Cart'}
          </button>
        </Link>
      </div>
    );
  }

  // Grid View (smaller cards for 4x5 layout)
  return (
    <div
      className="relative cursor-pointer animate-fade-in"
      style={{ 
        animationDelay: `${delay}ms`,
        perspective: '1000px' 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/product/${product.id}`}>
        <div
          className={`${product.color} rounded-2xl p-3 md:p-4 transition-all duration-300 ease-out border-2 border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] h-full flex flex-col`}
          style={{
            transform: isHovered
              ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.02)`
              : 'rotateX(0) rotateY(0) scale(1)',
          }}
        >
          <div className={`mb-2 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`}>
            {'image' in adminProduct && adminProduct.image ? (
              <img
                src={adminProduct.image}
                alt={product.name}
                className="w-full h-16 object-cover rounded-lg"
              />
            ) : (
              <div className="text-3xl md:text-4xl">{product.emoji}</div>
            )}
          </div>
          <h3 className="font-display text-sm md:text-base uppercase mb-1 text-foreground line-clamp-2 flex-grow">{product.name}</h3>
          <p className="text-xs text-muted-foreground mb-3 font-mono line-clamp-2">{product.description}</p>
          
          {/* Stock info - only shown when explicitly requested */}
          {showStockInfo && 'stock' in adminProduct && (
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-mono px-2 py-1 rounded ${
                adminProduct.stock > 10 
                  ? 'bg-green-100 text-green-800' 
                  : adminProduct.stock > 0 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}>
                Stock: {adminProduct.stock}
              </span>
            </div>
          )}
          
          <div className="flex items-center justify-between mt-auto">
            <span className="font-display text-lg md:text-xl text-foreground">${product.price.toFixed(2)}</span>
            <button 
              onClick={handleAddToCart}
              className={`px-2 py-1 font-mono text-xs uppercase tracking-wider rounded-full transition-all duration-200 hover:scale-105 ${
                added 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-foreground text-background'
              }`}
            >
              {added ? '✓' : 'Add'}
            </button>
          </div>
        </div>
      </Link>
      
      {/* Popular Badge */}
      {isPopular && showPopularBadge && (
        <div className="absolute -top-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full font-mono text-xs uppercase animate-scale-in shadow-lg">
          🔥
        </div>
      )}
      
      {/* Fresh badge for hover effect */}
      {isHovered && (
        <div className="absolute -top-1 -left-1 bg-accent text-accent-foreground px-2 py-1 rounded-full font-mono text-xs uppercase animate-scale-in">
          Fresh!
        </div>
      )}
    </div>
  );
};
