import * as React from 'react';

interface DeletionConfirmationEmailProps {
  fullName: string;
}

export function DeletionConfirmationEmail({ fullName }: DeletionConfirmationEmailProps) {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#0a0a0a', padding: '24px', borderRadius: '8px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            backgroundColor: '#fb41c7', 
            borderRadius: '8px', 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#000'
          }}>
            B
          </div>
        </div>

        <h1 style={{ color: '#e0e0e0', fontSize: '24px', textAlign: 'center', marginBottom: '24px' }}>
          Demande de suppression reçue
        </h1>

        <p style={{ color: '#a0a0a0', fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}>
          Bonjour {fullName},
        </p>

        <p style={{ color: '#a0a0a0', fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}>
          Nous avons bien reçu votre demande de suppression de données personnelles conformément à l&apos;article 17 du RGPD (droit à l&apos;effacement).
        </p>

        <div style={{ backgroundColor: '#111111', padding: '20px', borderRadius: '8px', marginBottom: '24px' }}>
          <h2 style={{ color: '#e0e0e0', fontSize: '16px', marginBottom: '12px' }}>
            📋 Prochaines étapes
          </h2>
          <ul style={{ color: '#a0a0a0', paddingLeft: '20px', marginBottom: '0' }}>
            <li style={{ marginBottom: '8px' }}>Vérification de votre identité</li>
            <li style={{ marginBottom: '8px' }}>Identification des données à supprimer</li>
            <li style={{ marginBottom: '8px' }}>Suppression des données de tous nos systèmes</li>
            <li style={{ marginBottom: '0' }}>Confirmation finale par email</li>
          </ul>
        </div>

        <div style={{ 
          backgroundColor: '#161616', 
          borderLeft: '3px solid #fb41c7', 
          padding: '16px', 
          borderRadius: '0 8px 8px 0',
          marginBottom: '24px'
        }}>
          <p style={{ color: '#a0a0a0', margin: '0', fontSize: '14px' }}>
            <strong style={{ color: '#e0e0e0' }}>Délai de traitement :</strong> Maximum 30 jours calendaires
          </p>
        </div>

        <p style={{ color: '#a0a0a0', fontSize: '16px', lineHeight: '1.6', marginBottom: '16px' }}>
          Si vous avez des questions, n&apos;hésitez pas à nous contacter à{' '}
          <a href="mailto:yanis.amine.harrat@gmail.com" style={{ color: '#fb41c7' }}>
            yanis.amine.harrat@gmail.com
          </a>
        </p>

        <p style={{ color: '#a0a0a0', fontSize: '16px', lineHeight: '1.6' }}>
          Cordialement,<br />
          <strong style={{ color: '#e0e0e0' }}>L&apos;équipe Black Rise</strong>
        </p>

        <div style={{ borderTop: '1px solid #1f1f1f', paddingTop: '16px', marginTop: '24px' }}>
          <p style={{ color: '#707070', fontSize: '12px', textAlign: 'center' }}>
            Black Rise — Harrat Yanis, Mohamed-Amine<br />
            SIREN 919 266 668 | 15 Allée des Demoiselles d&apos;Avignon, 92000 Nanterre
          </p>
        </div>
      </div>
    </div>
  );
}
