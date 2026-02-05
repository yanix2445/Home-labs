import type { Metadata } from 'next';
import { ContactForm } from './contact-form';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MailIcon, ClockIcon } from '@/components/ui/icons';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Black Rise pour toute question ou demande',
};

const contactInfo = [
  { label: 'Email', value: 'yanis.amine.harrat@gmail.com' },
  { label: 'Adresse', value: `15 Allée des Demoiselles d'Avignon, 92000 Nanterre` },
  { label: 'SIREN', value: '919 266 668' },
] as const;

export default function ContactPage() {
  return (
    <div className="relative">
      {/* Background */}
      <div 
        className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, oklch(0.72 0.25 340), transparent 70%)' }}
        aria-hidden="true"
      />

      <Section className="pt-16">
        <PageHeader 
          title="Contact"
          description="Une question, une suggestion ou une demande particulière ? 
          Nous vous répondons sous 48 heures."
        />
      </Section>

      <Section variant="muted">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Form */}
          <div className="lg:col-span-3">
            <Card className="gradient-border glass-strong">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <MailIcon size={20} className="text-primary" />
                  Formulaire de Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="glass">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ClockIcon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Délai de Réponse</h3>
                    <p className="text-sm text-muted-foreground">48 heures maximum</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Coordonnées</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-4 text-sm">
                  {contactInfo.map(({ label, value }) => (
                    <div key={label}>
                      <dt className="text-muted-foreground mb-1">{label}</dt>
                      <dd className="font-medium overflow-wrap-break-word">{value}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </div>
  );
}
