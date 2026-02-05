'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const categoryOptions = [
  { value: 'service', label: 'Problème avec un service' },
  { value: 'billing', label: 'Facturation / Paiement' },
  { value: 'data', label: 'Protection des données' },
  { value: 'quality', label: 'Qualité / Performance' },
  { value: 'support', label: 'Support client' },
  { value: 'other', label: 'Autre' },
] as const;

export function ComplaintForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      type: 'complaint',
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      category: formData.get('category') as string,
      orderRef: formData.get('orderRef') as string,
      description: formData.get('description') as string,
      resolution: formData.get('resolution') as string,
    };

    try {
      const response = await fetch('/api/contact', {
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
            Réclamation enregistrée
          </h3>
          <p className="text-muted-foreground">
            Nous traiterons votre réclamation sous 15&nbsp;jours ouvrés.
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
            placeholder="Votre nom…"
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

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Catégorie *</Label>
          <select
            id="category"
            name="category"
            required
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="">Sélectionnez…</option>
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="orderRef">Référence commande (optionnel)</Label>
          <Input
            id="orderRef"
            name="orderRef"
            placeholder="N° de commande…"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description du problème *</Label>
        <Textarea
          id="description"
          name="description"
          rows={5}
          required
          placeholder="Décrivez votre problème en détail…"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="resolution">Résolution souhaitée (optionnel)</Label>
        <Textarea
          id="resolution"
          name="resolution"
          rows={3}
          placeholder="Quelle solution attendez-vous…"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="animate-spin mr-2" aria-hidden="true">⏳</span>
            Envoi en cours…
          </>
        ) : (
          'Soumettre ma réclamation'
        )}
      </Button>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Les informations recueillies sont nécessaires au traitement de votre réclamation et destinées au service client de Black Rise.
        Elles sont conservées pendant la durée du traitement du litige puis archivées selon les délais légaux.
        <Link href="/privacy" className="underline hover:text-primary ml-1">En savoir plus</Link>.
      </p>
    </form>
  );
}
