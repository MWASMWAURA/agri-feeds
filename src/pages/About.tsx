import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { FloatingGrain } from '@/components/FloatingGrain';

const milestones = [
  { year: '1952', event: 'Founded in rural Iowa', emoji: '🏠' },
  { year: '1975', event: 'Expanded to 10 states', emoji: '🗺️' },
  { year: '1998', event: 'Organic certification achieved', emoji: '🌿' },
  { year: '2010', event: 'Launched sustainable packaging', emoji: '♻️' },
  { year: '2024', event: 'Serving 50,000+ farms', emoji: '🚀' },
];

const team = [
  { name: 'Martha Fields', role: 'Founder & CEO', emoji: '👩‍🌾' },
  { name: 'John Harvest', role: 'Head of R&D', emoji: '🧑‍🔬' },
  { name: 'Sarah Meadows', role: 'Operations Director', emoji: '👩‍💼' },
  { name: 'Mike Barns', role: 'Customer Success', emoji: '🧑‍🤝‍🧑' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <FloatingGrain count={10} />
      <Navbar />
      
      <main className="pt-28 pb-20">
        {/* Hero */}
        <section className="px-4 md:px-8 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-display text-5xl md:text-8xl uppercase mb-6">
              About <span className="text-stroke">Us</span>
            </h1>
            <p className="font-mono text-lg text-muted-foreground max-w-2xl mx-auto">
              For over 70 years, we've been crafting premium feeds that keep farms thriving. 
              From our humble beginnings to serving thousands of farms nationwide, 
              our mission remains the same: healthy animals, happy farmers. 🌾
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="px-4 md:px-8 mb-20">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { value: '70+', label: 'Years', emoji: '📅' },
              { value: '50K+', label: 'Farms Served', emoji: '🏡' },
              { value: '100%', label: 'Natural', emoji: '🌿' },
              { value: '24/7', label: 'Support', emoji: '💬' },
            ].map((stat) => (
              <div key={stat.label} className="bg-card rounded-2xl p-6 border-4 border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] text-center hover:scale-105 transition-transform">
                <span className="text-4xl block mb-2">{stat.emoji}</span>
                <span className="font-display text-3xl md:text-4xl block">{stat.value}</span>
                <span className="font-mono text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="px-4 md:px-8 mb-20 bg-card py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl text-center uppercase mb-12">
              Our <span className="text-primary">Story</span>
            </h2>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className="flex items-center gap-6 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-20 h-20 bg-background rounded-full border-4 border-foreground flex items-center justify-center text-4xl shrink-0 shadow-[4px_4px_0px_0px_hsl(var(--foreground))]">
                    {milestone.emoji}
                  </div>
                  <div>
                    <span className="font-display text-2xl text-primary">{milestone.year}</span>
                    <p className="font-mono text-muted-foreground">{milestone.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="px-4 md:px-8 mb-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl text-center uppercase mb-12">
              Meet the <span className="text-stroke-primary">Team</span>
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div 
                  key={member.name}
                  className="bg-card rounded-2xl p-6 border-4 border-foreground shadow-[4px_4px_0px_0px_hsl(var(--foreground))] text-center hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_hsl(var(--primary))] transition-all cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <span className="text-6xl block mb-4">{member.emoji}</span>
                  <h3 className="font-display text-lg">{member.name}</h3>
                  <p className="font-mono text-xs text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="px-4 md:px-8">
          <div className="max-w-4xl mx-auto bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 border-4 border-foreground shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
            <h2 className="font-display text-3xl md:text-4xl text-center uppercase mb-8">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <span className="text-5xl block mb-3">🌱</span>
                <h3 className="font-display text-xl mb-2">Sustainability</h3>
                <p className="font-mono text-sm opacity-80">Eco-friendly practices from farm to feed</p>
              </div>
              <div>
                <span className="text-5xl block mb-3">❤️</span>
                <h3 className="font-display text-xl mb-2">Animal Welfare</h3>
                <p className="font-mono text-sm opacity-80">Nutrition designed for animal health</p>
              </div>
              <div>
                <span className="text-5xl block mb-3">🤝</span>
                <h3 className="font-display text-xl mb-2">Community</h3>
                <p className="font-mono text-sm opacity-80">Supporting local farmers worldwide</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
