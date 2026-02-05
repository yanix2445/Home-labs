'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SparklesIcon } from '@/components/ui/icons';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/privacy', label: 'Confidentialité' },
  { href: '/terms', label: 'Conditions' },
  { href: '/deletion', label: 'Suppression' },
  { href: '/complaint', label: 'Réclamation' },
  { href: '/mentions-legales', label: 'Mentions' },
  { href: '/cookies', label: 'Cookies' },
  { href: '/contact', label: 'Contact' },
] as const;

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Gradient border bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent" />

      <div className="glass-strong">
        <div className="container flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 font-semibold transition-all hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg"
            aria-label="Black Rise — Accueil"
          >
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold transition-transform group-hover:scale-105">
              <SparklesIcon size={18} className="absolute opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="group-hover:opacity-0 transition-opacity">B</span>
            </div>
            <span className="hidden sm:inline tracking-tight">Black&nbsp;Rise</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-3 py-2 text-sm rounded-lg transition-all duration-200',
                  'hover:text-foreground',
                  'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  pathname === link.href
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute inset-x-1 -bottom-px h-px bg-linear-to-r from-transparent via-primary to-transparent" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="transition-transform duration-200"
              style={{ transform: isMobileMenuOpen ? 'rotate(90deg)' : 'none' }}
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="8" x2="20" y2="8" />
                  <line x1="4" y1="16" x2="20" y2="16" />
                </>
              )}
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <nav
        id="mobile-menu"
        className={cn(
          'md:hidden overflow-hidden transition-all duration-300',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        )}
        aria-label="Navigation mobile"
        style={{ overscrollBehavior: 'contain' }}
      >
        <div className="glass border-t border-white/5">
          <div className="container py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  'block px-4 py-3 text-sm rounded-lg transition-all duration-200',
                  'hover:bg-primary/10',
                  'focus-visible:ring-2 focus-visible:ring-ring',
                  pathname === link.href
                    ? 'text-foreground bg-primary/10 font-medium'
                    : 'text-muted-foreground'
                )}
                aria-current={pathname === link.href ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
