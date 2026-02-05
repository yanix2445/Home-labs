import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, className, children }: PageHeaderProps) {
  return (
    <header className={cn('relative mb-12', className)}>
      {/* Background glow */}
      <div 
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, oklch(0.72 0.25 340), transparent 70%)' }}
        aria-hidden="true"
      />
      
      <div className="relative">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
          <span className="text-gradient">{title}</span>
        </h1>
        {description && (
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
            {description}
          </p>
        )}
        {children}
      </div>
    </header>
  );
}
