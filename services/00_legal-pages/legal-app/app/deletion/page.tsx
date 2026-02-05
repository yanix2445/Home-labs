import type { Metadata } from 'next';
import { DeletionForm } from './deletion-form';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircleIcon, ClockIcon, TrashIcon, ShieldIcon } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Suppression des Données',
  description: 'Demandez la suppression de vos données personnelles conformément à vos droits RGPD',
};

const steps = [
  {
    icon: <TrashIcon size={20} />,
    title: 'Demande',
    description: 'Remplissez le formulaire avec vos informations',
  },
  {
    icon: <ClockIcon size={20} />,
    title: 'Traitement',
    description: 'Nous vérifions et traitons votre demande',
  },
  {
    icon: <CheckCircleIcon size={20} />,
    title: 'Confirmation',
    description: 'Vos données sont supprimées sous 30 jours',
  },
] as const;

const rights = [
  {
    title: 'Ce qui sera supprimé',
    items: [
      'Données de compte et profil utilisateur',
      'Historique des communications',
      'Préférences et paramètres',
      'Données marketing et newsletters',
    ],
  },
  {
    title: 'Ce qui peut être conservé',
    items: [
      'Données de facturation (10 ans — obligation légale)',
      'Logs de sécurité anonymisés',
      'Données nécessaires aux obligations fiscales',
    ],
  },
] as const;

export default function DeletionPage() {
  return (
    <div className="relative">
      {/* Background */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, oklch(0.65 0.2 25), transparent 70%)' }}
        aria-hidden="true"
      />

      <Section className="pt-16">
        <PageHeader 
          title="Suppression des Données"
          description="Exercez votre droit RGPD à l'effacement de vos données personnelles. 
          Cette action est irréversible et s'applique à l'ensemble de nos services."
        />

        {/* Process Steps */}
        <div className="grid gap-4 md:grid-cols-3 mb-12">
          {steps.map((step, i) => (
            <Card key={step.title} className="glass relative overflow-hidden">
              {/* Step number */}
              <div className="absolute top-4 right-4 text-5xl font-bold text-primary/10 tabular-nums">
                {i + 1}
              </div>
              <CardContent className="pt-6 relative">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  {step.icon}
                </div>
                <h3 className="font-semibold mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section variant="muted">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <Card className="gradient-border glass-strong">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <ShieldIcon size={20} className="text-primary" />
                  Formulaire de Suppression
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DeletionForm />
              </CardContent>
            </Card>
          </div>

          {/* Info sidebar */}
          <div className="lg:col-span-2 space-y-6">
            {rights.map((section) => (
              <Card key={section.title} className="glass">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground" role="list">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="text-primary mt-1" aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}

            <Card className="glass border-primary/30">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Délai de traitement :</strong>{' '}
                  Maximum 30 jours conformément au RGPD. 
                  Vous recevrez une confirmation par email.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
