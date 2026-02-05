import type { Metadata } from 'next';
import { ComplaintForm } from './complaint-form';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangleIcon, ClockIcon } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Réclamation',
  description: 'Déposez une réclamation concernant nos services',
};

export default function ComplaintPage() {
  return (
    <div className="relative">
      {/* Background */}
      <div 
        className="absolute top-0 right-1/4 w-[500px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, oklch(0.65 0.2 25), transparent 70%)' }}
        aria-hidden="true"
      />

      <Section className="pt-16">
        <PageHeader 
          title="Réclamation"
          description="Un problème avec nos services ? Décrivez-le et nous le résoudrons 
          dans les meilleurs délais."
        />
      </Section>

      <Section variant="muted">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <Card className="gradient-border glass-strong">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <AlertTriangleIcon size={20} className="text-destructive" />
                  Formulaire de Réclamation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ComplaintForm />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                    <ClockIcon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Délai de Traitement</h3>
                    <p className="text-sm text-muted-foreground">15 jours ouvrés maximum</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Comment ça marche ?</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  {[
                    'Décrivez votre problème en détail',
                    'Nous accusons réception sous 48h',
                    'Analyse et investigation interne',
                    'Résolution et retour détaillé',
                  ].map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary tabular-nums">
                        {i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            <Card className="glass border-destructive/20">
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Recours :</strong>{' '}
                  Si notre réponse ne vous satisfait pas, vous pouvez saisir la CNIL 
                  ou le médiateur de la consommation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
