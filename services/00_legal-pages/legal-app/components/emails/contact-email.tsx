import * as React from 'react';

interface ContactEmailProps {
  type: 'contact' | 'complaint';
  fullName: string;
  email: string;
  subject?: string;
  message?: string;
  category?: string;
  orderRef?: string;
  description?: string;
  resolution?: string;
  timestamp: string;
}

const categoryLabels: Record<string, string> = {
  service: 'Problème avec un service',
  billing: 'Facturation / Paiement',
  data: 'Protection des données',
  quality: 'Qualité / Performance',
  support: 'Support client',
  other: 'Autre',
};

export function ContactEmail(props: ContactEmailProps) {
  const isComplaint = props.type === 'complaint';
  const title = isComplaint ? '⚠️ Nouvelle réclamation' : '✉️ Nouveau message de contact';

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#0a0a0a', padding: '24px', borderRadius: '8px' }}>
        <h1 style={{ color: isComplaint ? '#ef4444' : '#fb41c7', fontSize: '24px', marginBottom: '24px' }}>
          {title}
        </h1>

        <div style={{ backgroundColor: '#111111', padding: '20px', borderRadius: '8px', marginBottom: '16px' }}>
          <h2 style={{ color: '#e0e0e0', fontSize: '18px', marginBottom: '16px' }}>
            Informations de contact
          </h2>
          <p style={{ color: '#a0a0a0', margin: '8px 0' }}>
            <strong style={{ color: '#e0e0e0' }}>Nom :</strong> {props.fullName}
          </p>
          <p style={{ color: '#a0a0a0', margin: '8px 0' }}>
            <strong style={{ color: '#e0e0e0' }}>Email :</strong>{' '}
            <a href={`mailto:${props.email}`} style={{ color: '#fb41c7' }}>{props.email}</a>
          </p>
          {props.category && (
            <p style={{ color: '#a0a0a0', margin: '8px 0' }}>
              <strong style={{ color: '#e0e0e0' }}>Catégorie :</strong>{' '}
              {categoryLabels[props.category] || props.category}
            </p>
          )}
          {props.orderRef && (
            <p style={{ color: '#a0a0a0', margin: '8px 0' }}>
              <strong style={{ color: '#e0e0e0' }}>Réf. commande :</strong> {props.orderRef}
            </p>
          )}
        </div>

        {props.subject && (
          <div style={{ backgroundColor: '#111111', padding: '20px', borderRadius: '8px', marginBottom: '16px' }}>
            <h2 style={{ color: '#e0e0e0', fontSize: '18px', marginBottom: '16px' }}>
              Sujet
            </h2>
            <p style={{ color: '#a0a0a0' }}>{props.subject}</p>
          </div>
        )}

        <div style={{ backgroundColor: '#111111', padding: '20px', borderRadius: '8px', marginBottom: '16px' }}>
          <h2 style={{ color: '#e0e0e0', fontSize: '18px', marginBottom: '16px' }}>
            {isComplaint ? 'Description du problème' : 'Message'}
          </h2>
          <p style={{ color: '#a0a0a0', whiteSpace: 'pre-wrap' }}>
            {props.description || props.message}
          </p>
        </div>

        {props.resolution && (
          <div style={{ backgroundColor: '#111111', padding: '20px', borderRadius: '8px', marginBottom: '16px' }}>
            <h2 style={{ color: '#e0e0e0', fontSize: '18px', marginBottom: '16px' }}>
              Résolution souhaitée
            </h2>
            <p style={{ color: '#a0a0a0', whiteSpace: 'pre-wrap' }}>{props.resolution}</p>
          </div>
        )}

        <div style={{ borderTop: '1px solid #1f1f1f', paddingTop: '16px', marginTop: '24px' }}>
          <p style={{ color: '#707070', fontSize: '12px' }}>
            Reçu le {props.timestamp}
          </p>
        </div>
      </div>
    </div>
  );
}
