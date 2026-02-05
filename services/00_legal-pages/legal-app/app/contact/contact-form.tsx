'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      type: 'contact',
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
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
            Message envoyé
          </h3>
          <p className="text-muted-foreground">
            Nous vous répondrons dans les 48&nbsp;heures.
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

      <div className="space-y-2">
        <Label htmlFor="subject">Sujet *</Label>
        <Input
          id="subject"
          name="subject"
          required
          placeholder="Sujet de votre message…"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          rows={6}
          required
          placeholder="Votre message…"
        />
      </div>

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <span className="animate-spin mr-2" aria-hidden="true">⏳</span>
            Envoi en cours…
          </>
        ) : (
          'Envoyer le message'
        )}
      </Button>

      <p className="text-xs text-muted-foreground mt-4 text-center">
        Les données collectées (nom, email, sujet, message) sont nécessaires pour traiter votre demande.
        Elles sont conservées le temps du traitement et destinées à Black Rise.
        Conformément au RGPD, vous disposez d'un droit d'accès, rectification et suppression.
        <Link href="/privacy" className="underline hover:text-primary ml-1">En savoir plus</Link>.
      </p>
    </form>
  );
}
