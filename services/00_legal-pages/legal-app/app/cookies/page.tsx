'use client';

import { Section } from '@/components/ui/section';
import { PageHeader } from '@/components/ui/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { COOKIE_CATEGORIES, useCookieConsent, type CookieCategory } from '@/lib/cookie-consent';
import { Settings } from 'lucide-react';
import type { Metadata } from 'next';

export default function CookiesPage() {
  const { setShowPreferences } = useCookieConsent();

  return (
    <div className="relative">
      <div
        className="absolute top-0 right-1/2 translate-x-1/2 w-[600px] h-[500px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, oklch(0.66 0.21 354), transparent 70%)' }}
        aria-hidden="true"
      />

      <Section className="pt-16">
        <PageHeader
          title="Politique de Cookies"
          description="Transparence complète sur les traceurs utilisés lors de votre navigation."
        />
      </Section>

      <Section variant="muted" className="pb-24">
        <div className="space-y-8 max-w-4xl mx-auto">
          {/* Explication */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Qu'est-ce qu'un cookie ?</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette ou mobile) lors de la visite d'un site.
                Il permet de conserver des données utilisateur afin de faciliter la navigation et de permettre certaines fonctionnalités.
              </p>
              <p>
                Conformément à la directive ePrivacy et au RGPD, nous distinguons les cookies strictement nécessaires (exemptés de consentement)
                des autres cookies (soumis à votre accord).
              </p>
            </CardContent>
          </Card>

          {/* Bouton pour gérer les préférences */}
          <Card className="glass border-primary/20">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">Gérer mes préférences</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous pouvez modifier vos choix à tout moment en cliquant sur le bouton ci-dessous.
                  </p>
                </div>
                <Button
                  onClick={() => setShowPreferences(true)}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Mes préférences
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Catégories de cookies */}
          {(Object.keys(COOKIE_CATEGORIES) as CookieCategory[]).map((categoryId) => {
            const category = COOKIE_CATEGORIES[categoryId];

            return (
              <Card key={categoryId} className="glass overflow-hidden">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <CardTitle>{category.name}</CardTitle>
                    {category.required && (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        Nécessaire
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{category.description}</p>

                  <div>
                    <h4 className="font-medium mb-2">Cookies utilisés dans cette catégorie :</h4>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[200px]">Nom</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="w-[120px]">Durée</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getCookieDetails(categoryId).map((cookie) => (
                          <TableRow key={cookie.name}>
                            <TableCell className="font-mono text-sm">{cookie.name}</TableCell>
                            <TableCell className="text-muted-foreground">{cookie.description}</TableCell>
                            <TableCell className="text-muted-foreground">{cookie.duration}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            );
          })}

          {/* Contrôle navigateur */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Contrôle via votre navigateur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Vous pouvez également configurer votre navigateur pour refuser systématiquement les cookies ou pour être alerté lors de leur dépôt.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>
                  <strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies et autres données de sites
                </li>
                <li>
                  <strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies et données de sites
                </li>
                <li>
                  <strong>Safari :</strong> Préférences → Confidentialité → Cookies et données de sites web
                </li>
                <li>
                  <strong>Edge :</strong> Paramètres → Confidentialité, recherche et services → Cookies
                </li>
              </ul>
              <p className="text-sm">
                Attention : La désactivation de certains cookies peut altérer le fonctionnement du site.
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}

// Helper function pour obtenir les détails des cookies par catégorie
function getCookieDetails(category: CookieCategory) {
  const details: Record<CookieCategory, Array<{ name: string; description: string; duration: string }>> = {
    necessary: [
      {
        name: 'cookie_consent',
        description: 'Mémorise vos préférences en matière de cookies (acceptation/refus).',
        duration: '6 mois'
      },
      {
        name: 'session_id',
        description: 'Maintient votre session active lors de la navigation.',
        duration: 'Session'
      },
      {
        name: 'csrf_token',
        description: 'Protection contre les attaques CSRF (Cross-Site Request Forgery).',
        duration: 'Session'
      }
    ],
    analytics: [
      {
        name: '_ga',
        description: 'Identifiant unique utilisé par Google Analytics pour distinguer les utilisateurs.',
        duration: '2 ans'
      },
      {
        name: '_ga_*',
        description: 'Stocke l\'état de la session pour Google Analytics 4.',
        duration: '2 ans'
      },
      {
        name: '_gid',
        description: 'Identifiant unique utilisé par Google Analytics pour distinguer les utilisateurs.',
        duration: '24 heures'
      },
      {
        name: '_gat',
        description: 'Limite le taux de requêtes vers Google Analytics.',
        duration: '1 minute'
      }
    ],
    marketing: [
      {
        name: '_gcl_*',
        description: 'Cookies de conversion Google Ads pour mesurer les performances des campagnes.',
        duration: '90 jours'
      },
      {
        name: '_gac_*',
        description: 'Cookie Google Analytics pour les campagnes publicitaires.',
        duration: '90 jours'
      },
      {
        name: 'fbp / _fbp',
        description: 'Cookie Facebook Pixel pour le suivi des conversions et le remarketing.',
        duration: '3 mois'
      },
      {
        name: 'fr',
        description: 'Cookie Facebook pour la publicité ciblée.',
        duration: '3 mois'
      }
    ],
    functional: [
      {
        name: 'theme',
        description: 'Mémorise votre préférence de thème (clair/sombre).',
        duration: '1 an'
      },
      {
        name: 'language',
        description: 'Mémorise votre préférence de langue.',
        duration: '1 an'
      },
      {
        name: 'user_preferences',
        description: 'Stocke vos préférences d\'affichage et de navigation.',
        duration: '6 mois'
      },
      {
        name: 'ui_settings',
        description: 'Paramètres d\'interface personnalisés.',
        duration: '6 mois'
      }
    ]
  };

  return details[category] || [];
}
