import { cn } from '@/lib/utils';

interface SectionProps {
  id?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'muted' | 'gradient';
}

export function Section({ 
  id, 
  title, 
  description, 
  children, 
  className,
  variant = 'default',
}: SectionProps) {
  return (
    <section 
      id={id}
      aria-labelledby={title ? `${id}-heading` : undefined}
      className={cn(
        'py-16',
        variant === 'muted' && 'bg-muted/30',
        variant === 'gradient' && 'bg-gradient-animated',
        className
      )}
    >
      <div className="container">
        {(title || description) && (
          <div className="mb-10">
            {title && (
              <h2 
                id={`${id}-heading`}
                className="text-2xl font-semibold tracking-tight sm:text-3xl mb-3"
              >
                {title}
              </h2>
            )}
            {description && (
              <p className="text-muted-foreground max-w-2xl">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
