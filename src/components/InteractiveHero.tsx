import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const InteractiveHero = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    setClickCount(prev => prev + 1);
    const newSparkle = { id: Date.now(), x: e.clientX, y: e.clientY };
    setSparkles(prev => [...prev, newSparkle]);
    setTimeout(() => {
      setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
    }, 1000);
  };

  const messages = [
    "FEED THE FUTURE 🌾",
    "GROW WITH US! 🌱",
    "HAPPY ANIMALS! 🐄",
    "PREMIUM QUALITY! ⭐",
    "FARM FRESH! 🚜"
  ];

  return (
    <section 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden cursor-crosshair"
      onClick={handleClick}
    >
      {/* Background circles that follow mouse */}
      <div 
        className="absolute w-96 h-96 rounded-full bg-primary/20 blur-3xl transition-all duration-1000 ease-out"
        style={{
          left: mousePos.x - 192,
          top: mousePos.y - 192,
        }}
      />
      <div 
        className="absolute w-64 h-64 rounded-full bg-secondary/30 blur-2xl transition-all duration-700 ease-out"
        style={{
          left: mousePos.x - 128 + 100,
          top: mousePos.y - 128 - 50,
        }}
      />
      
      {/* Sparkles on click */}
      {sparkles.map(sparkle => (
        <span
          key={sparkle.id}
          className="fixed text-4xl animate-ping pointer-events-none z-50"
          style={{ left: sparkle.x - 20, top: sparkle.y - 20 }}
        >
          🌾
        </span>
      ))}

      {/* Main title */}
      <div className="relative z-10 text-center px-4">
        <h1 
          className="font-display text-7xl md:text-9xl uppercase mb-4 text-foreground leading-none"
          style={{
            transform: `translate(${(mousePos.x - window.innerWidth / 2) / 50}px, ${(mousePos.y - window.innerHeight / 2) / 50}px)`,
          }}
        >
          AGRI
          <span className="text-stroke block">FEEDS</span>
        </h1>
        
        <p className="font-mono text-lg md:text-xl text-muted-foreground mb-8 max-w-md mx-auto">
          Premium nutrition for your livestock. 
          <span className="text-primary"> Click anywhere!</span>
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-8">
          <button
            onClick={() => navigate('/shop')}
            className="group relative px-8 py-4 bg-primary text-primary-foreground font-display text-lg uppercase rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
          >
            <span className="relative z-10">Shop Now</span>
            <div className="absolute inset-0 bg-foreground transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
          <button
            onClick={() => navigate('/about')}
            className="px-8 py-4 border-4 border-foreground text-foreground font-display text-lg uppercase rounded-full hover:bg-foreground hover:text-background transition-all duration-200 wiggle-hover"
          >
            Learn More
          </button>
        </div>

        {/* Click counter */}
        {clickCount > 0 && (
          <div className="font-mono text-sm text-muted-foreground animate-fade-in">
            {messages[clickCount % messages.length]} (×{clickCount})
          </div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-10 text-6xl float" style={{ animationDelay: '0s' }}>🌽</div>
      <div className="absolute top-20 right-10 text-5xl float" style={{ animationDelay: '0.5s' }}>🐓</div>
      <div className="absolute bottom-32 right-20 text-7xl float" style={{ animationDelay: '1s' }}>🌾</div>
      <div className="absolute top-40 left-20 text-4xl float" style={{ animationDelay: '1.5s' }}>🐄</div>
    </section>
  );
};
