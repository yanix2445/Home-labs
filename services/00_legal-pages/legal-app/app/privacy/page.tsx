import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description: 'Politique de confidentialité et protection des données personnelles — Black Rise',
};

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `Black Rise, entreprise exploitée par Yanis Harrat, s'engage à protéger la confidentialité de vos données personnelles. Cette politique s'applique à l'ensemble de nos activités dans les secteurs du développement web, des applications logicielles, de la communication multicanaux et des systèmes informatiques.`,
  },
  {
    id: 'donnees-collectees',
    title: 'Données Collectées',
    items: [
      `Informations d'identification — Email, nom complet, téléphone (Base légale : Exécution du contrat ou consentement)`,
      `Métadonnées techniques — Adresse IP, navigateur, système d'exploitation (Base légale : Intérêt légitime - sécurité)`,
      `Données d'utilisation — Pages visitées, durées (Base légale : Consentement)`,
      `Données de compte — Identifiants, mots de passe hashés (Base légale : Exécution du contrat)`,
      `Données transactionnelles — Historique d'achats (Base légale : Obligation légale - comptabilité)`,
      `Données marketing — Préférences (Base légale : Consentement)`,
    ],
  },
  {
    id: 'caractere-obligatoire',
    title: 'Caractère Obligatoire ou Facultatif',
    content: `Lorsque vous utilisez nos formulaires, certains champs sont marqués par un astérisque (*) comme obligatoires. Le défaut de réponse à ces champs obligatoires peut compromettre le traitement de votre demande ou la création de votre compte. Les autres données sont facultatives.`,
  },
  {
    id: 'source-donnees',
    title: 'Source des Données',
    content: `Nous collectons les données directement auprès de vous (formulaires, inscription). Dans certains cas (B2B), nous pouvons collecter des informations publiques via des réseaux professionnels comme LinkedIn.`,
  },
  {
    id: 'utilisation',
    title: 'Utilisation des Données',
    items: [
      `Fourniture des services — Fonctionnement de nos applications et plateformes`,
      `Transactions commerciales — Traitement des commandes, facturation`,
      `Personnalisation — Recommandations, contenus adaptés`,
      `Marketing — Campagnes publicitaires (avec consentement)`,
      `Conformité légale — Respect des obligations fiscales et comptables`,
      `Sécurité — Détection et prévention de la fraude`,
    ],
  },
  {
    id: 'partage',
    title: 'Partage des Données',
    content: 'Nous partageons vos données uniquement avec les destinataires suivants pour les finalités citées :',
    items: [
      `Hébergement — OVH, Vercel, AWS (Sous-traitants, Stockage sécurisé en UE)`,
      `Paiement — Stripe, PayPal (Responsables de traitement autonomes, transaction)`,
      `Communication — Resend, WhatsApp API (Sous-traitants, envoi de notifications)`,
      `Autorités — Si requis par la loi ou sur réquisition judiciaire`,
    ],
  },
  {
    id: 'transferts-hors-ue',
    title: 'Transferts Hors UE',
    content: `Certains de nos prestataires (ex: Stripe, AWS) peuvent transférer des données hors de l'Union Européenne. Ces transferts sont encadrés par :
    - Des décisions d'adéquation de la Commission Européenne.
    - Des Clauses Contractuelles Types (CCT) assurant un niveau de protection équivalent.`,
  },
  {
    id: 'conservation',
    title: 'Conservation',
    items: [
      `Comptes actifs — Tant que votre compte est actif`,
      `Logs techniques — 12 mois maximum`,
      `Données de facturation — 10 ans (obligation légale)`,
      `Données marketing — 3 ans après le dernier contact`,
    ],
  },
  {
    id: 'securite',
    title: 'Sécurité',
    items: [
      `Chiffrement HTTPS/TLS pour toutes les communications`,
      `Contrôle d'accès avec authentification forte`,
      `Serveurs hébergés en France/UE`,
      `Surveillance et monitoring 24/7`,
    ],
  },
  {
    id: 'profilage',
    title: 'Profilage et Décision Automatisée',
    content: `Nous n'effectuons aucune prise de décision entièrement automatisée produisant des effets juridiques vous concernant. Le profilage se limite à la personnalisation de votre expérience ou à des recommandations produits (si applicable), basées sur votre historique.`,
  },
  {
    id: 'droits',
    title: 'Vos Droits RGPD',
    content: 'Conformément au RGPD, vous disposez des droits suivants :',
    items: [
      `Droit d'accès — Obtenir une copie de vos données`,
      `Droit de rectification — Corriger des données inexactes`,
      `Droit à l'effacement — Demander la suppression`,
      `Droit à la limitation — Restreindre le traitement`,
      `Droit à la portabilité — Recevoir vos données`,
      `Droit d'opposition — Vous opposer au traitement`,
    ],
    footer: 'Pour exercer ces droits : yanis.amine.harrat@gmail.com. Nous nous engageons à répondre sous 1 mois (prolongeable de 2 mois si la demande est complexe). Vous avez également le droit d\'introduire une réclamation auprès de la CNIL (www.cnil.fr).',
  },
  {
    id: 'cookies',
    title: 'Cookies',
    items: [
      `Cookies essentiels — Fonctionnement du site`,
      `Cookies de performance — Mesure d'audience`,
      `Cookies fonctionnels — Mémorisation de vos préférences`,
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    content: `Responsable de traitement : Black Rise (Harrat Yanis, Mohamed-Amine)
Adresse : 15 Allée des Demoiselles d'Avignon, 92000 Nanterre, France
Email : yanis.amine.harrat@gmail.com
SIREN : 919 266 668

Réclamation CNIL : www.cnil.fr`,
  },
] as const;

export default function PrivacyPage() {
  return (
    <div className="relative">
      {/* Background */}
      <div
        className="absolute top-0 left-1/3 w-[500px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, oklch(0.72 0.25 340), transparent 70%)' }}
        aria-hidden="true"
      />

      <Section className="pt-16">
        <PageHeader
          title="Politique de Confidentialité"
          description="Comment nous collectons, utilisons et protégeons vos données 
          personnelles conformément au RGPD."
        >
          <p className="text-sm text-muted-foreground mt-4">
            Dernière mise à jour : 5 février 2026
          </p>
        </PageHeader>
      </Section>

      <Section variant="muted" className="pb-24">
        <article className="space-y-6 max-w-4xl">
          {sections.map((section) => (
            <Card key={section.id} id={section.id} className="glass">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {'content' in section && (
                  <p className="text-muted-foreground whitespace-pre-line leading-relaxed">
                    {section.content}
                  </p>
                )}
                {'items' in section && (
                  <ul className="space-y-2 text-muted-foreground">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-primary shrink-0" aria-hidden="true">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {'footer' in section && (
                  <p className="text-sm text-primary pt-2 font-medium">{section.footer}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </article>
      </Section>
    </div>
  );
}
