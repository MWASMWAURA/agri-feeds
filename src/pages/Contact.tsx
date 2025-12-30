import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingGrain } from '@/components/FloatingGrain';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingGrain count={8} />
      <Navbar />
      
      <main className="pt-28 pb-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="font-display text-5xl md:text-8xl uppercase mb-4">
              Contact <span className="text-stroke">Us</span>
            </h1>
            <p className="font-mono text-muted-foreground max-w-lg mx-auto">
              Got questions? We'd love to hear from you! 
              Our team is here to help. 🌾
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-card rounded-3xl p-6 md:p-8 border-4 border-foreground shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
              {submitted ? (
                <div className="text-center py-12 animate-fade-in">
                  <span className="text-8xl block mb-6">📨</span>
                  <h2 className="font-display text-3xl mb-4">Message Sent!</h2>
                  <p className="font-mono text-muted-foreground mb-6">
                    Thanks for reaching out! We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-6 py-3 border-4 border-foreground font-display uppercase rounded-full hover:bg-foreground hover:text-background transition-all"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h2 className="font-display text-2xl mb-4">Send us a Message</h2>
                  
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-foreground bg-background font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-foreground bg-background font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border-2 border-foreground bg-background font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Question</option>
                    <option value="wholesale">Wholesale</option>
                    <option value="other">Other</option>
                  </select>
                  
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl border-2 border-foreground bg-background font-mono focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                  
                  <button
                    type="submit"
                    className="w-full px-8 py-4 bg-primary text-primary-foreground font-display text-lg uppercase rounded-full hover:scale-105 transition-transform"
                  >
                    Send Message 🚀
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-farm-green/20 rounded-2xl p-6 border-4 border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:-translate-y-1 transition-transform">
                <span className="text-4xl mb-3 block">📍</span>
                <h3 className="font-display text-xl mb-2">Visit Us</h3>
                <p className="font-mono text-sm text-muted-foreground">
                  123 Farm Road<br />
                  Harvest Valley, IA 50001
                </p>
              </div>

              <div className="bg-farm-gold/30 rounded-2xl p-6 border-4 border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:-translate-y-1 transition-transform">
                <span className="text-4xl mb-3 block">📞</span>
                <h3 className="font-display text-xl mb-2">Call Us</h3>
                <p className="font-mono text-sm text-muted-foreground">
                  1-800-AGRI-FEED<br />
                  Mon-Fri: 8am - 6pm CST
                </p>
              </div>

              <div className="bg-farm-sky/30 rounded-2xl p-6 border-4 border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:-translate-y-1 transition-transform">
                <span className="text-4xl mb-3 block">📧</span>
                <h3 className="font-display text-xl mb-2">Email Us</h3>
                <p className="font-mono text-sm text-muted-foreground">
                  hello@agrifeeds.com<br />
                  support@agrifeeds.com
                </p>
              </div>

              <div className="bg-accent/20 rounded-2xl p-6 border-4 border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] hover:-translate-y-1 transition-transform">
                <span className="text-4xl mb-3 block">💬</span>
                <h3 className="font-display text-xl mb-2">Follow Us</h3>
                <div className="flex gap-4 text-3xl mt-2">
                  <span className="cursor-pointer hover:scale-125 transition-transform">📘</span>
                  <span className="cursor-pointer hover:scale-125 transition-transform">📸</span>
                  <span className="cursor-pointer hover:scale-125 transition-transform">🐦</span>
                  <span className="cursor-pointer hover:scale-125 transition-transform">📺</span>
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

export default Contact;
