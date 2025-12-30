import { Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/context/CartContext';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-28 pb-20 px-4 flex flex-col items-center justify-center min-h-[70vh]">
          <span className="text-8xl mb-6">🛒</span>
          <h1 className="font-display text-4xl md:text-6xl uppercase mb-4">Cart is Empty</h1>
          <p className="font-mono text-muted-foreground mb-8">Time to stock up on feed!</p>
          <Link 
            to="/shop"
            className="px-8 py-4 bg-primary text-primary-foreground font-display text-lg uppercase rounded-full hover:scale-105 transition-transform"
          >
            Start Shopping
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-display text-4xl md:text-6xl uppercase mb-8 text-center">
            Your <span className="text-stroke">Cart</span>
          </h1>

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <div 
                key={item.id}
                className="bg-card rounded-2xl p-4 md:p-6 border-4 border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] flex flex-col sm:flex-row items-center gap-4"
              >
                <div className={`${item.color} w-20 h-20 rounded-xl flex items-center justify-center text-4xl shrink-0`}>
                  {item.emoji}
                </div>
                
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-display text-xl uppercase">{item.name}</h3>
                  <p className="font-mono text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-foreground rounded-full overflow-hidden">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-muted transition-colors font-mono"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-mono min-w-[40px] text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-muted transition-colors font-mono"
                    >
                      +
                    </button>
                  </div>

                  <span className="font-display text-xl min-w-[80px] text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-2xl hover:scale-125 transition-transform"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card rounded-2xl p-6 border-4 border-foreground shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-muted-foreground">Items ({itemCount})</span>
              <span className="font-mono">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="font-mono text-muted-foreground">Shipping</span>
              <span className="font-mono text-primary">FREE 🚚</span>
            </div>
            <div className="border-t-2 border-foreground pt-4 flex justify-between items-center mb-6">
              <span className="font-display text-2xl">Total</span>
              <span className="font-display text-3xl">${total.toFixed(2)}</span>
            </div>
            
            <Link 
              to="/checkout"
              className="block w-full px-8 py-4 bg-primary text-primary-foreground font-display text-lg uppercase rounded-full text-center hover:scale-105 transition-transform"
            >
              Proceed to Checkout 🌾
            </Link>
          </div>

          <Link 
            to="/shop"
            className="block text-center font-mono text-sm text-muted-foreground mt-6 hover:text-primary transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
