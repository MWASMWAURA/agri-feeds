import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useCart } from '@/context/CartContext';

const Checkout = () => {
  const { items, total, clearCart, itemCount } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-28 pb-20 px-4 flex flex-col items-center justify-center min-h-[70vh]">
          <span className="text-8xl mb-6">🛒</span>
          <h1 className="font-display text-4xl uppercase mb-4">No Items to Checkout</h1>
          <Link 
            to="/shop"
            className="px-8 py-4 bg-primary text-primary-foreground font-display uppercase rounded-full hover:scale-105 transition-transform"
          >
            Start Shopping
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-28 pb-20 px-4 flex flex-col items-center justify-center min-h-[70vh]">
          <div className="text-center animate-fade-in">
            <span className="text-9xl block mb-6">🎉</span>
            <h1 className="font-display text-4xl md:text-6xl uppercase mb-4">Order Complete!</h1>
            <p className="font-mono text-muted-foreground mb-8 max-w-md">
              Thank you for your order! Your farm animals will be feasting soon. 
              Check your email for order confirmation.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/shop"
                className="px-8 py-4 bg-primary text-primary-foreground font-display uppercase rounded-full hover:scale-105 transition-transform"
              >
                Continue Shopping
              </Link>
              <Link 
                to="/"
                className="px-8 py-4 border-4 border-foreground font-display uppercase rounded-full hover:bg-foreground hover:text-background transition-all"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="font-display text-4xl md:text-6xl uppercase mb-8 text-center">
            Check<span className="text-stroke">out</span>
          </h1>

          {/* Progress Steps */}
          <div className="flex justify-center gap-4 mb-12">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-display text-lg border-4 transition-all ${
                  step >= s 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'border-foreground'
                }`}>
                  {step > s ? '✓' : s}
                </div>
                {s < 3 && (
                  <div className={`w-8 md:w-16 h-1 rounded ${step > s ? 'bg-primary' : 'bg-muted'}`} />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="bg-card rounded-2xl p-6 md:p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_hsl(var(--foreground))] animate-fade-in">
                    <h2 className="font-display text-2xl mb-6">📧 Contact Info</h2>
                    <div className="space-y-4">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-foreground bg-background font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="mt-6 w-full px-8 py-4 bg-primary text-primary-foreground font-display uppercase rounded-full hover:scale-105 transition-transform"
                    >
                      Continue to Shipping →
                    </button>
                  </div>
                )}

                {step === 2 && (
                  <div className="bg-card rounded-2xl p-6 md:p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_hsl(var(--foreground))] animate-fade-in">
                    <h2 className="font-display text-2xl mb-6">🚚 Shipping Address</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 rounded-xl border-2 border-foreground bg-background font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 rounded-xl border-2 border-foreground bg-background font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="md:col-span-2 px-4 py-3 rounded-xl border-2 border-foreground bg-background font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 rounded-xl border-2 border-foreground bg-background font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 rounded-xl border-2 border-foreground bg-background font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <input
                        type="text"
                        name="zip"
                        placeholder="ZIP Code"
                        value={formData.zip}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 rounded-xl border-2 border-foreground bg-background font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 px-8 py-4 border-4 border-foreground font-display uppercase rounded-full hover:bg-foreground hover:text-background transition-all"
                      >
                        ← Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        className="flex-1 px-8 py-4 bg-primary text-primary-foreground font-display uppercase rounded-full hover:scale-105 transition-transform"
                      >
                        Continue to Payment →
                      </button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="bg-card rounded-2xl p-6 md:p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_hsl(var(--foreground))] animate-fade-in">
                    <h2 className="font-display text-2xl mb-6">💳 Payment</h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        name="cardNumber"
                        placeholder="Card Number"
                        value={formData.cardNumber}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-foreground bg-background font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          name="expiry"
                          placeholder="MM/YY"
                          value={formData.expiry}
                          onChange={handleChange}
                          required
                          className="px-4 py-3 rounded-xl border-2 border-foreground bg-background font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <input
                          type="text"
                          name="cvv"
                          placeholder="CVV"
                          value={formData.cvv}
                          onChange={handleChange}
                          required
                          className="px-4 py-3 rounded-xl border-2 border-foreground bg-background font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="flex-1 px-8 py-4 border-4 border-foreground font-display uppercase rounded-full hover:bg-foreground hover:text-background transition-all"
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className="flex-1 px-8 py-4 bg-primary text-primary-foreground font-display uppercase rounded-full hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isProcessing ? '🌾 Processing...' : 'Place Order 🎉'}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 border-4 border-foreground shadow-[8px_8px_0px_0px_hsl(var(--foreground))] sticky top-28">
                <h2 className="font-display text-xl mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="flex-1">
                        <p className="font-mono text-sm">{item.name}</p>
                        <p className="font-mono text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-mono text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-foreground pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-mono text-sm text-muted-foreground">Subtotal ({itemCount})</span>
                    <span className="font-mono">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="font-mono text-sm text-muted-foreground">Shipping</span>
                    <span className="font-mono text-primary">FREE</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t-2 border-foreground">
                    <span className="font-display text-xl">Total</span>
                    <span className="font-display text-2xl">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
