'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const serviceOptions = [
  { id: 'dev', label: 'Développement — Applications web, chatbots, APIs' },
  { id: 'games', label: 'Jeux vidéo — Comptes, achats in-game, profils' },
  { id: 'ecommerce', label: 'E-commerce — Commandes, comptes clients' },
  { id: 'marketing', label: 'Marketing — Newsletters, campagnes' },
  { id: 'content', label: 'Contenu — Projets créatifs, productions' },
  { id: 'other', label: 'Autre service' },
] as const;

export function DeletionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      whatsapp: formData.get('whatsapp') as string,
      services: formData.getAll('services') as string[],
      additionalInfo: formData.get('additionalInfo') as string,
    };

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || 'Erreur lors de l\'envoi');
      }

      setIsSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'envoi');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <Card className="border-green-500/30 bg-green-500/5" role="status" aria-live="polite">
        <CardContent className="pt-6 text-center">
          <div className="text-4xl mb-4" aria-hidden="true">✅</div>
          <h3 className="text-xl font-semibold text-green-500 mb-2">
            Demande envoyée avec succès
          </h3>
          <p className="text-muted-foreground">
            Vous recevrez une confirmation par email sous 48&nbsp;heures.
            La suppression sera effective dans un délai maximum de 30&nbsp;jours.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {error && (
        <Card className="border-destructive/50 bg-destructive/5" role="alert" aria-live="polite">
          <CardContent className="pt-4">
            <p className="text-sm text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nom complet *</Label>
          <Input
            id="fullName"
            name="fullName"
            required
            autoComplete="name"
            placeholder="Votre nom complet…"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            spellCheck={false}
            placeholder="votre@email.com"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="whatsapp">Numéro WhatsApp (optionnel)</Label>
        <Input
          id="whatsapp"
          name="whatsapp"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+33 6 XX XX XX XX"
        />
      </div>

      <fieldset className="space-y-3">
        <legend className="text-sm font-medium">Services concernés *</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {serviceOptions.map((service) => (
            <label
              key={service.id}
              className="flex items-start gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                name="services"
                value={service.id}
                className="mt-1 rounded border-input bg-background focus-visible:ring-2 focus-visible:ring-ring"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {service.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Informations complémentaires (optionnel)</Label>
        <Textarea
          id="additionalInfo"
          name="additionalInfo"
          rows={4}
          placeholder="Pseudonyme, compte utilisé…"
        />
      </div>

      <div className="rounded-lg bg-muted p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            name="confirmation"
            required
            className="mt-1 rounded border-input bg-background focus-visible:ring-2 focus-visible:ring-ring"
          />
          <span className="text-sm text-muted-foreground">
            Je confirme vouloir supprimer <strong className="text-foreground">définitivement</strong> toutes
            mes données personnelles. Cette action est <strong className="text-foreground">irréversible</strong>.
          </span>
        </label>
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="animate-spin mr-2" aria-hidden="true">⏳</span>
            Envoi en cours…
          </>
        ) : (
          'Soumettre ma demande de suppression'
        )}
      </Button>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Les données collectées via ce formulaire sont strictement nécessaires au traitement de votre demande de suppression RGPD.
        Elles seront conservées 5 ans à titre de preuve légale.
        <Link href="/privacy" className="underline hover:text-primary ml-1">Lire la politique de confidentialité</Link>.
      </p>
    </form>
  );
}
