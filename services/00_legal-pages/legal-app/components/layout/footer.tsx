import Link from 'next/link';
import { SparklesIcon } from '@/components/ui/icons';

const legalLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/mentions-legales', label: 'Mentions Légales' },
  { href: '/privacy', label: 'Politique de Confidentialité' },
  { href: '/cookies', label: 'Politique de Cookies' },
  { href: '/terms', label: 'Conditions de Service' },
  { href: '/deletion', label: 'Suppression des Données' },
  { href: '/complaint', label: 'Réclamation' },
  { href: '/contact', label: 'Contact' },
] as const;

const contactLinks = [
  { href: '/contact', label: 'Formulaire de Contact' },
  { href: '/complaint', label: 'Réclamation' },
  { href: 'mailto:yanis.amine.harrat@gmail.com', label: 'Email', external: true },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-white/5" role="contentinfo">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at bottom, oklch(0.72 0.25 340 / 10%), transparent 60%)'
        }}
        aria-hidden="true"
      />

      <div className="container relative py-16">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 font-semibold transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:ring-ring rounded-lg"
              aria-label="Black Rise — Accueil"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <SparklesIcon size={20} />
              </div>
              <span className="text-xl tracking-tight">Black&nbsp;Rise</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Holding technologique multisectoriel : développement logiciel,
              jeux vidéo, commerce digital et création de contenu.
            </p>
          </div>

          {/* Legal Links */}
          <nav aria-label="Documentation légale">
            <h2 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Documentation
            </h2>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-foreground/80 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <nav aria-label="Contact">
            <h2 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              Contact
            </h2>
            <ul className="space-y-3">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  {'external' in link ? (
                    <a
                      href={link.href}
                      className="text-sm text-foreground/80 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-ring rounded"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-muted-foreground tabular-nums">
              © 2026 Black&nbsp;Rise — Harrat&nbsp;Yanis. SIREN&nbsp;919&nbsp;266&nbsp;668
            </p>
            <address className="text-xs text-muted-foreground not-italic">
              15&nbsp;Allée des Demoiselles d&apos;Avignon, 92000&nbsp;Nanterre
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}
