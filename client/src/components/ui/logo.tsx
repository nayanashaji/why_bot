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
     return (
    <<div className={`${sizeClasses[size]} ${className} relative rounded-full overflow-hidden shadow-lg`}>
      <img
        src="/whybot.jpg" 
        alt="Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
