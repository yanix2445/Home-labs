import type { Metadata } from 'next';
import { PageHeader } from '@/components/ui/page-header';
import { Section } from '@/components/ui/section';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Conditions de Service',
  description: "Conditions générales d'utilisation des services Black Rise",
};

const sections = [
  {
    id: 'acceptation',
    title: 'Acceptation des Conditions',
    content: `En utilisant les services de Black Rise (Harrat Yanis, Mohamed-Amine, SIREN 919 266 668), vous acceptez d'être lié par les présentes conditions. Si vous n'acceptez pas ces Conditions, veuillez ne pas utiliser nos Services.`,
  },
  {
    id: 'services',
    title: 'Description des Services',
    content: 'Black Rise opère principalement dans les secteurs suivants :',
    subsections: [
      {
        title: 'Développement Web et Applications',
        items: [
          'Développement d\'applications web et mobiles',
          'Sites internet et plateformes sur mesure',
          'Intégration de systèmes et APIs',
          'Maintenance et support technique',
        ],
      },
      {
        title: 'Communication Multicanaux',
        items: [
          'Chatbots conversationnels (Typebot)',
          'Intégration WhatsApp Business API',
          'Solutions de messagerie automatisée',
          'Outils de communication client',
        ],
      },
      {
        title: 'Systèmes et Infrastructure',
        items: [
          'Déploiement cloud et DevOps',
          'Hébergement et gestion de serveurs',
          'Monitoring et sécurité',
        ],
      },
    ],
  },
  {
    id: 'utilisation',
    title: 'Utilisation Acceptable',
    content: 'En utilisant nos Services, vous vous engagez à :',
    items: [
      'Ne pas utiliser les Services à des fins illégales',
      `Ne pas tenter d'accéder à des systèmes sans autorisation`,
      'Ne pas perturber le fonctionnement des Services',
      'Ne pas envoyer de spam ou contenu malveillant',
      'Respecter la propriété intellectuelle',
    ],
    footer: 'Toute violation peut entraîner la suspension immédiate de votre accès.',
  },
  {
    id: 'compte',
    title: 'Compte Utilisateur',
    content: 'Pour certains Services, vous devrez créer un compte. Vous êtes responsable de :',
    items: [
      'Fournir des informations véridiques et à jour',
      'Maintenir la confidentialité de votre mot de passe',
      'Toutes les activités effectuées via votre compte',
      `Nous informer en cas d'utilisation non autorisée`,
    ],
  },
  {
    id: 'propriete',
    title: 'Propriété Intellectuelle',
    content: `Tous les contenus, designs, logos, marques commerciales, code source et autres éléments présents dans nos Services sont protégés. Vous ne pouvez pas copier, modifier, distribuer ou reproduire nos contenus sans autorisation écrite.`,
  },
  {
    id: 'projets',
    title: 'Projets sur Mesure',
    items: [
      'Devis et spécifications validés avant commencement',
      'Propriété intellectuelle définie contractuellement',
      'Maintenance optionnelle après livraison',
      'Support technique inclus pendant période de garantie',
    ],
  },
  {
    id: 'saas',
    title: 'Services SaaS — Conditions Spécifiques',
    items: [
      'Accès fourni sous forme de licence d\'utilisation',
      'Disponibilité cible : 99% (hors maintenance planifiée)',
      'Données exportables à tout moment',
      'Préavis de 30 jours pour modifications majeures',
    ],
  },
  {
    id: 'responsabilite',
    title: 'Limitation de Responsabilité',
    content: `Nos Services sont fournis "en l'état". Nous ne garantissons pas :`,
    items: [
      'Une disponibilité continue',
      `L'absence d'erreurs ou bugs`,
      'Des résultats spécifiques',
    ],
  },
  {
    id: 'resiliation',
    title: 'Suspension et Résiliation',
    content: 'Nous pouvons suspendre votre accès en cas de :',
    items: [
      'Violation des Conditions',
      'Activité suspecte ou frauduleuse',
      'Non-paiement (si applicable)',
      `Demande d'autorité légale`,
    ],
  },
  {
    id: 'loi',
    title: 'Loi Applicable',
    content: `Ces Conditions sont régies par le droit français. Tout litige sera soumis à la compétence exclusive des tribunaux français.`,
  },
  {
    id: 'mediation',
    title: 'Médiation de la consommation (B2C)',
    content: `Conformément aux articles L.616-1 et R.616-1 du code de la consommation, nous proposons un dispositif de médiation de la consommation. En cas de litige non résolu par notre service client, le consommateur peut saisir gratuitement le médiateur de la consommation :
    
    [Nom du Médiateur - ex: CM2C]
    Adresse : [Adresse du Médiateur]
    Site web : [Site web du Médiateur]
    Email : [Email du Médiateur]`,
  },
  {
    id: 'contact',
    title: 'Contact',
    content: `Black Rise (Harrat Yanis, Mohamed-Amine)
15 Allée des Demoiselles d'Avignon, 92000 Nanterre, France
Email : yanis.amine.harrat@gmail.com
SIREN : 919 266 668

Délai de réponse : 7 jours ouvrables maximum`,
  },
] as const;

export default function TermsPage() {
  return (
    <div className="relative">
      {/* Background */}
      <div
        className="absolute top-0 right-1/3 w-[500px] h-[400px] rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, oklch(0.6 0.15 280), transparent 70%)' }}
        aria-hidden="true"
      />

      <Section className="pt-16">
        <PageHeader
          title="Conditions de Service"
          description="Règles d'utilisation de nos services : développement web, 
          applications logicielles et communication."
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
                {'subsections' in section && section.subsections.map((sub) => (
                  <div key={sub.title} className="space-y-2">
                    <h4 className="font-medium text-foreground">{sub.title}</h4>
                    <ul className="space-y-1 text-muted-foreground ml-4">
                      {sub.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="text-primary shrink-0" aria-hidden="true">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {'items' in section && !('subsections' in section) && (
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
