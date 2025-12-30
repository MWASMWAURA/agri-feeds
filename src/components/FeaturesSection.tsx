import { useState } from 'react';

const features = [
  { icon: '🌿', title: 'All Natural', description: 'No artificial additives or preservatives' },
  { icon: '🔬', title: 'Lab Tested', description: 'Quality verified by independent labs' },
  { icon: '🚚', title: 'Fast Delivery', description: 'Next-day delivery available' },
  { icon: '♻️', title: 'Sustainable', description: 'Eco-friendly packaging & sourcing' },
];

export const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-card relative overflow-hidden">
      <div className="absolute inset-0 grain-pattern pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="font-display text-4xl md:text-6xl text-center uppercase mb-16">
          Why Choose <span className="text-primary">Us?</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`relative p-6 rounded-2xl border-4 border-foreground bg-background cursor-pointer transition-all duration-300 ${
                activeIndex === index 
                  ? 'shadow-[8px_8px_0px_0px_hsl(var(--primary))] -translate-y-2' 
                  : 'shadow-[4px_4px_0px_0px_hsl(var(--foreground))]'
              }`}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <div 
                className={`text-5xl mb-4 transition-transform duration-300 ${
                  activeIndex === index ? 'scale-125 animate-bounce' : ''
                }`}
              >
                {feature.icon}
              </div>
              <h3 className="font-display text-lg uppercase mb-2">{feature.title}</h3>
              <p className="font-mono text-sm text-muted-foreground">{feature.description}</p>
              
              {activeIndex === index && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-scale-in">
                  <span className="text-accent-foreground text-lg">✓</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
