import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingGrain } from '@/components/FloatingGrain';
import { useCart } from '@/context/CartContext';
import { useAdmin, AdminProduct } from '@/context/AdminContext';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { products } = useAdmin();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">Product Not Found 😢</h1>
          <Link to="/shop" className="font-mono text-primary underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    navigate('/checkout');
  };

  // Cast to AdminProduct to access additional properties
  const adminProduct = product as AdminProduct;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingGrain count={8} />
      <Navbar />
      
      <main className="pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-2 font-mono text-sm mb-8 hover:text-primary transition-colors"
          >
            ← Back to Shop
          </Link>

          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            {/* Product Image */}
            <div className={`${product.color} rounded-3xl p-12 md:p-20 border-4 border-foreground shadow-[12px_12px_0px_0px_hsl(var(--foreground))] flex items-center justify-center relative`}>
              {'image' in adminProduct && adminProduct.image ? (
                <img
                  src={adminProduct.image}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              ) : (
                <span className="text-[150px] md:text-[200px] animate-bounce">{product.emoji}</span>
              )}
              
              {/* Popular Badge */}
              {(adminProduct.salesCount >= 10 || adminProduct.isManuallyPopular) && (
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full font-mono text-sm uppercase animate-scale-in shadow-lg">
                  🔥 Popular!
                </div>
              )}
              
              {/* Stock Badge (for admin context) */}
              {'stock' in adminProduct && (
                <div className={`absolute -top-4 -left-4 px-3 py-2 rounded-full font-mono text-xs ${
                  adminProduct.stock > 10
                    ? 'bg-green-100 text-green-800'
                    : adminProduct.stock > 0
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                }`}>
                  Stock: {adminProduct.stock}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-mono text-sm uppercase text-muted-foreground">Premium Feed</span>
                <span className="font-mono text-sm uppercase text-muted-foreground">•</span>
                <span className="font-mono text-sm uppercase text-muted-foreground">{adminProduct.category}</span>
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl uppercase mb-4">{product.name}</h1>
              <p className="font-mono text-muted-foreground mb-6">{product.longDescription || product.description}</p>
              
              <div className="flex flex-wrap gap-4 mb-6">
                {product.weight && (
                  <div className="bg-muted px-4 py-2 rounded-full font-mono text-sm">
                    📦 {product.weight}
                  </div>
                )}
                <div className="bg-muted px-4 py-2 rounded-full font-mono text-sm">
                  🌿 All Natural
                </div>
                <div className="bg-muted px-4 py-2 rounded-full font-mono text-sm">
                  📊 {adminProduct.salesCount} sold
                </div>
              </div>

              {product.ingredients && product.ingredients.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-display text-lg mb-2">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.ingredients.map((ing, index) => (
                      <span key={`${ing}-${index}`} className="bg-card border-2 border-foreground px-3 py-1 rounded-full font-mono text-xs">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mb-6">
                <span className="font-display text-5xl">${product.price.toFixed(2)}</span>
                <span className="font-mono text-muted-foreground">per bag</span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="font-mono">Quantity:</span>
                <div className="flex items-center border-4 border-foreground rounded-full overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-muted transition-colors font-display text-xl"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-mono min-w-[60px] text-center">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-muted transition-colors font-display text-xl"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleAddToCart}
                  className={`flex-1 px-8 py-4 border-4 border-foreground font-display text-lg uppercase rounded-full transition-all duration-200 hover:scale-105 ${
                    added ? 'bg-primary text-primary-foreground' : 'hover:bg-foreground hover:text-background'
                  }`}
                >
                  {added ? '✓ Added to Cart!' : 'Add to Cart'}
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 px-8 py-4 bg-primary text-primary-foreground font-display text-lg uppercase rounded-full transition-all duration-200 hover:scale-105"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
