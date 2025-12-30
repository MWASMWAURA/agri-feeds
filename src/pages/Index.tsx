import { Navbar } from '@/components/Navbar';
import { InteractiveHero } from '@/components/InteractiveHero';
import { MarqueeText } from '@/components/MarqueeText';
import { ProductGrid } from '@/components/ProductGrid';
import { FeaturesSection } from '@/components/FeaturesSection';
import { Footer } from '@/components/Footer';
import { FloatingGrain } from '@/components/FloatingGrain';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <FloatingGrain count={15} />
      <Navbar />
      
      <main className="pt-20">
        <InteractiveHero />
        
        <MarqueeText 
          text="🌾 CHICKEN FEED • 🐄 CATTLE MIX • 🐷 PIG PELLETS • 🐴 HORSE OATS • 🐑 SHEEP FEED • 🐐 GOAT MIX" 
          className="py-6 bg-primary text-primary-foreground font-display text-xl md:text-3xl"
        />
        
        <ProductGrid />
        <FeaturesSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
