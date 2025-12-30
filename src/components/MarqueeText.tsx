interface MarqueeTextProps {
  text: string;
  className?: string;
}

export const MarqueeText = ({ text, className = '' }: MarqueeTextProps) => {
  const repeatedText = Array(8).fill(text).join(' • ');
  
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="animate-marquee inline-block">
        <span className="inline-block pr-8">{repeatedText}</span>
        <span className="inline-block pr-8">{repeatedText}</span>
      </div>
    </div>
  );
};
