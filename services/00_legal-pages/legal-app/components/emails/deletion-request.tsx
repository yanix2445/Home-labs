import * as React from 'react';

interface DeletionRequestEmailProps {
  fullName: string;
  email: string;
  whatsapp?: string;
  services: string[];
  additionalInfo?: string;
  timestamp: string;
}

const serviceLabels: Record<string, string> = {
  dev: 'Développement - Applications web, chatbots, APIs',
  games: 'Jeux vidéo - Comptes, achats in-game, profils',
  ecommerce: 'E-commerce - Commandes, comptes clients',
  marketing: 'Marketing - Newsletters, campagnes, analytics',
  content: 'Contenu - Projets créatifs, productions vidéo',
  other: 'Autre service',
};

export function DeletionRequestEmail({
  fullName,
  email,
  whatsapp,
  services,
  additionalInfo,
  timestamp,
}: DeletionRequestEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#0a0a0a', padding: '24px', borderRadius: '8px' }}>
        <h1 style={{ color: '#fb41c7', fontSize: '24px', marginBottom: '24px' }}>
          🗑️ Nouvelle demande de suppression RGPD
        </h1>

        <div style={{ backgroundColor: '#111111', padding: '20px', borderRadius: '8px', marginBottom: '16px' }}>
          <h2 style={{ color: '#e0e0e0', fontSize: '18px', marginBottom: '16px' }}>
            Informations du demandeur
          </h2>
          <p style={{ color: '#a0a0a0', margin: '8px 0' }}>
            <strong style={{ color: '#e0e0e0' }}>Nom complet :</strong> {fullName}
          </p>
          <p style={{ color: '#a0a0a0', margin: '8px 0' }}>
            <strong style={{ color: '#e0e0e0' }}>Email :</strong>{' '}
            <a href={`mailto:${email}`} style={{ color: '#fb41c7' }}>{email}</a>
          </p>
          {whatsapp && (
            <p style={{ color: '#a0a0a0', margin: '8px 0' }}>
              <strong style={{ color: '#e0e0e0' }}>WhatsApp :</strong> {whatsapp}
            </p>
          )}
        </div>

        <div style={{ backgroundColor: '#111111', padding: '20px', borderRadius: '8px', marginBottom: '16px' }}>
          <h2 style={{ color: '#e0e0e0', fontSize: '18px', marginBottom: '16px' }}>
            Services concernés
          </h2>
          <ul style={{ color: '#a0a0a0', paddingLeft: '20px' }}>
            {services.map((service) => (
              <li key={service} style={{ marginBottom: '8px' }}>
                {serviceLabels[service] || service}
              </li>
            ))}
          </ul>
        </div>

        {additionalInfo && (
          <div style={{ backgroundColor: '#111111', padding: '20px', borderRadius: '8px', marginBottom: '16px' }}>
            <h2 style={{ color: '#e0e0e0', fontSize: '18px', marginBottom: '16px' }}>
              Informations complémentaires
            </h2>
            <p style={{ color: '#a0a0a0', whiteSpace: 'pre-wrap' }}>{additionalInfo}</p>
          </div>
        )}

        <div style={{ borderTop: '1px solid #1f1f1f', paddingTop: '16px', marginTop: '24px' }}>
          <p style={{ color: '#707070', fontSize: '12px' }}>
            Demande reçue le {timestamp}
          </p>
          <p style={{ color: '#707070', fontSize: '12px' }}>
            Délai de traitement : 30 jours maximum (RGPD Article 17)
          </p>
        </div>
      </div>
    </div>
  );
}
