interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Outer circle with gradient */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#whybot-gradient)"
          className="drop-shadow-lg"
        />
        
        {/* Inner design - question mark and AI elements */}
        <path
          d="M35 35 Q50 25 65 35 Q65 45 55 50 L55 55 M55 65 L55 70"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* AI circuit pattern */}
        <circle cx="30" cy="70" r="2" fill="white" opacity="0.8" />
        <circle cx="70" cy="70" r="2" fill="white" opacity="0.8" />
        <circle cx="50" cy="25" r="2" fill="white" opacity="0.8" />
        
        <line x1="30" y1="70" x2="40" y2="65" stroke="white" strokeWidth="1" opacity="0.6" />
        <line x1="70" y1="70" x2="60" y2="65" stroke="white" strokeWidth="1" opacity="0.6" />
        <line x1="50" y1="25" x2="55" y2="35" stroke="white" strokeWidth="1" opacity="0.6" />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="whybot-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(221, 83%, 53%)" />
            <stop offset="50%" stopColor="hsl(262, 83%, 58%)" />
            <stop offset="100%" stopColor="hsl(280, 83%, 60%)" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}