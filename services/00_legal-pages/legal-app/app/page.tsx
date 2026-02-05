import { FeatureCard } from '@/components/ui/feature-card';
import { Section } from '@/components/ui/section';
import {
  ShieldIcon,
  FileTextIcon,
  TrashIcon,
  MailIcon,
  AlertTriangleIcon
} from '@/components/ui/icons';
import { Card, CardContent } from '@/components/ui/card';

const legalCards = [
  {
    href: '/privacy',
    icon: <ShieldIcon size={24} />,
    title: 'Politique de Confidentialité',
    description: 'Comment nous collectons, utilisons et protégeons vos données personnelles conformément au RGPD.',
  },
  {
    href: '/terms',
    icon: <FileTextIcon size={24} />,
    title: 'Conditions de Service',
    description: `Règles d'utilisation de nos services : développement web, applications, logiciels et communication.`,
  },
  {
    href: '/deletion',
    icon: <TrashIcon size={24} />,
    title: 'Suppression des Données',
    description: `Exercez votre droit RGPD à l'effacement de vos données collectées via nos services.`,
    highlight: true,
  },
] as const;

const contactCards = [
  {
    href: '/contact',
    icon: <MailIcon size={24} />,
    title: 'Contact',
    description: 'Une question ? Contactez-nous directement via notre formulaire sécurisé.',
  },
  {
    href: '/complaint',
    icon: <AlertTriangleIcon size={24} />,
    title: 'Réclamation',
    description: 'Signalez un problème ou déposez une réclamation concernant nos services.',
  },
] as const;

const stats = [
  { value: '30j', label: 'Délai max. suppression' },
  { value: '48h', label: 'Réponse garantie' },
  { value: '100%', label: 'Conforme RGPD' },
] as const;

export default function HomePage() {
  return (
    <div className="relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-dots opacity-50 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, oklch(0.72 0.25 340 / 30%), transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Hero Section */}
      <Section className="pt-24 pb-16 relative">
        <div className="mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm mb-8 animate-fade-up">
            <ShieldIcon size={16} className="text-primary" />
            <span className="text-muted-foreground">Protection des données garantie</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl mb-6 animate-fade-up delay-100">
            <span className="text-gradient">Documentation</span>
            <br />
            <span className="text-foreground">Légale</span>
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-up delay-200">
            Transparence totale sur la gestion de vos données personnelles
            pour <strong className="text-foreground">Black&nbsp;Rise</strong>,
            entreprise spécialisée dans le développement web, les applications
            logicielles et la communication multicanaux.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 animate-fade-up delay-300">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-gradient tabular-nums">{stat.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Legal Pages */}
      <Section
        id="legal"
        title="Documentation Légale"
        description="Consultez nos politiques et exercez vos droits"
      >
        <ul className="grid gap-6 md:grid-cols-3">
          {legalCards.map((card, i) => (
            <li key={card.href} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <FeatureCard
                {...card}
                variant={'highlight' in card && card.highlight ? 'highlight' : 'default'}
              />
            </li>
          ))}
        </ul>
      </Section>

      {/* Contact & Support */}
      <Section
        id="support"
        title="Contact & Support"
        description="Nous sommes là pour vous aider"
        variant="muted"
      >
        <ul className="grid gap-6 md:grid-cols-2 max-w-3xl">
          {contactCards.map((card, i) => (
            <li key={card.href} className="animate-fade-up" style={{ animationDelay: `${i * 100}ms` }}>
              <FeatureCard {...card} />
            </li>
          ))}
        </ul>
      </Section>

      {/* Legal Info */}
      <Section id="info" className="pb-24">
        <Card className="glass overflow-hidden">
          <CardContent className="p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold mb-4">Informations Légales</h3>
                <dl className="space-y-3 text-sm">
                  {[
                    ['Raison sociale', 'Harrat Yanis, Mohamed-Amine'],
                    ['Nom commercial', 'Black Rise'],
                    ['SIREN', '919 266 668'],
                    ['SIRET', '919 266 668 00020'],
                    ['Code APE', '6201Z — Programmation'],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">{label}</dt>
                      <dd className="font-medium tabular-nums text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4">Conformité RGPD</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Tous nos services respectent le Règlement Général sur la Protection
                  des Données. Vous disposez d&apos;un droit d&apos;accès, de rectification
                  et de suppression de vos données à tout moment.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Accès', 'Rectification', 'Effacement', 'Portabilité'].map((right) => (
                    <span
                      key={right}
                      className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                    >
                      {right}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section >
    </div >
  );
}