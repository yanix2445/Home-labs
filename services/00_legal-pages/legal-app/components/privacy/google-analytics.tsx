'use client';

import { useEffect } from 'react';
import { useCookieConsent } from '@/lib/cookie-consent';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function GoogleAnalytics() {
  const { consent, hasConsent } = useCookieConsent();

  useEffect(() => {
    // Vérifier que gtag est chargé
    if (typeof window === 'undefined' || !window.gtag) {
      console.warn('[GA4] gtag not loaded yet');
      return;
    }

    const analyticsGranted = hasConsent('analytics');
    const marketingGranted = hasConsent('marketing');

    console.log('[GA4] Updating consent:', {
      analytics: analyticsGranted ? 'granted' : 'denied',
      marketing: marketingGranted ? 'granted' : 'denied'
    });

    // Mettre à jour Google Consent Mode v2
    window.gtag('consent', 'update', {
      'analytics_storage': analyticsGranted ? 'granted' : 'denied',
      'ad_storage': marketingGranted ? 'granted' : 'denied',
      'ad_user_data': marketingGranted ? 'granted' : 'denied',
      'ad_personalization': marketingGranted ? 'granted' : 'denied'
    });

    // Réappliquer la config avec le proxy après le consent update
    if (analyticsGranted) {
      window.gtag('config', 'G-PS5TMY6KB2', {
        transport_url: `${window.location.origin}/api/analytics`,
        first_party_collection: true
      });
    }

    // Si analytics vient d'être accepté, envoyer un page_view manuel
    if (analyticsGranted) {
      console.log('[GA4] Sending page_view event');
      window.gtag('event', 'page_view', {
        page_path: window.location.pathname,
        page_title: document.title,
        page_location: window.location.href
      });

      // Event personnalisé pour tracking du consentement
      window.gtag('event', 'cookie_consent_update', {
        consent_analytics: 'granted',
        consent_marketing: marketingGranted ? 'granted' : 'denied'
      });
    }
  }, [consent, hasConsent]);

  return null; // Pas d'UI, juste la logique
}
