import { ProductCard } from './ProductCard';
import { products } from '@/context/CartContext';

export const ProductGrid = () => {
  return (
    <section className="py-20 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-7xl uppercase mb-4">
            Our <span className="text-stroke-primary">Products</span>
          </h2>
          <p className="font-mono text-muted-foreground max-w-lg mx-auto">
            Hand-crafted nutrition for every animal on your farm. 
            Hover over each product for a surprise! 🎉
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <ProductCard 
              key={product.id} 
              product={product}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
