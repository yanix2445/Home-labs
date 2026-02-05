import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ArrowRightIcon } from './icons';

interface FeatureCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  variant?: 'default' | 'highlight';
}

export function FeatureCard({ 
  href, 
  icon, 
  title, 
  description, 
  className,
  variant = 'default',
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative block rounded-2xl p-6 transition-all duration-300',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        variant === 'default' && 'glass hover:glow hover:-translate-y-1',
        variant === 'highlight' && 'gradient-border glass-strong hover:glow-lg hover:-translate-y-2',
        className
      )}
    >
      {/* Icon container */}
      <div className={cn(
        'mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110',
        variant === 'default' && 'bg-primary/10 text-primary',
        variant === 'highlight' && 'bg-primary/20 text-primary'
      )}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {description}
      </p>

      {/* Arrow indicator */}
      <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
        <span className="mr-2">En savoir plus</span>
        <ArrowRightIcon 
          size={16} 
          className="transition-transform duration-300 group-hover:translate-x-1" 
        />
      </div>
    </Link>
  );
}
