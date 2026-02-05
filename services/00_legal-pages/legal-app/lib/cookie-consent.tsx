'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types
export type CookieCategory = 'necessary' | 'analytics' | 'marketing' | 'functional';

export interface CookieCategoryConfig {
  id: CookieCategory;
  name: string;
  description: string;
  required: boolean;
  cookies: string[];
}

export interface CookieConsent {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  functional: boolean;
}

export interface CookieConsentContextValue {
  consent: CookieConsent;
  hasConsent: (category: CookieCategory) => boolean;
  updateConsent: (newConsent: Partial<CookieConsent>) => void;
  acceptAll: () => void;
  rejectAll: () => void;
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
  showPreferences: boolean;
  setShowPreferences: (show: boolean) => void;
}

// Configuration des catégories de cookies
export const COOKIE_CATEGORIES: Record<CookieCategory, CookieCategoryConfig> = {
  necessary: {
    id: 'necessary',
    name: 'Cookies Nécessaires',
    description: 'Ces cookies sont essentiels au fonctionnement du site. Ils permettent l\'utilisation des fonctionnalités de base comme la navigation sécurisée et l\'accès aux espaces sécurisés. Ces cookies ne stockent aucune information personnelle identifiable.',
    required: true,
    cookies: ['cookie_consent', 'session_id', 'csrf_token']
  },
  analytics: {
    id: 'analytics',
    name: 'Cookies Analytics',
    description: 'Ces cookies nous permettent de mesurer l\'audience de notre site et d\'analyser la navigation pour améliorer nos services. Toutes les données sont anonymisées et agrégées. Nous utilisons Google Analytics 4.',
    required: false,
    cookies: ['_ga', '_ga_*', '_gid', '_gat']
  },
  marketing: {
    id: 'marketing',
    name: 'Cookies Marketing',
    description: 'Ces cookies sont utilisés pour vous proposer des publicités personnalisées et mesurer l\'efficacité de nos campagnes marketing. Ils sont utilisés par nos partenaires publicitaires (Google Ads, Facebook) dans le cadre de nos activités de commerce digital.',
    required: false,
    cookies: ['_gcl_*', '_gac_*', 'fbp', 'fr', '_fbp']
  },
  functional: {
    id: 'functional',
    name: 'Cookies Fonctionnels',
    description: 'Ces cookies permettent d\'améliorer votre expérience en mémorisant vos préférences (langue, thème, paramètres d\'affichage). Ils ne sont pas strictement nécessaires mais rendent la navigation plus agréable.',
    required: false,
    cookies: ['theme', 'language', 'user_preferences', 'ui_settings']
  }
};

// Nom du cookie de consentement
const CONSENT_COOKIE_NAME = 'cookie_consent';
const CONSENT_COOKIE_DURATION = 180; // 6 mois en jours

// Context
const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

// Helper: Lire le consent depuis localStorage et cookies
function loadConsentFromStorage(): CookieConsent | null {
  if (typeof window === 'undefined') return null;

  try {
    // Essayer localStorage en premier (plus fiable)
    const stored = localStorage.getItem(CONSENT_COOKIE_NAME);
    if (stored) {
      return JSON.parse(stored);
    }

    // Fallback sur cookies
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${CONSENT_COOKIE_NAME}=`))
      ?.split('=')[1];

    if (cookieValue) {
      return JSON.parse(decodeURIComponent(cookieValue));
    }
  } catch (error) {
    console.error('[Cookie Consent] Erreur lecture storage:', error);
  }

  return null;
}

// Helper: Sauvegarder le consent dans localStorage et cookies
function saveConsentToStorage(consent: CookieConsent) {
  if (typeof window === 'undefined') return;

  try {
    const consentStr = JSON.stringify(consent);

    // Sauver dans localStorage
    localStorage.setItem(CONSENT_COOKIE_NAME, consentStr);

    // Sauver dans cookie (backup + pour partage entre sous-domaines)
    const expires = new Date();
    expires.setDate(expires.getDate() + CONSENT_COOKIE_DURATION);

    document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(consentStr)}; expires=${expires.toUTCString()}; path=/; SameSite=Lax; Secure`;

    console.log('[Cookie Consent] Préférences sauvegardées:', consent);
  } catch (error) {
    console.error('[Cookie Consent] Erreur sauvegarde storage:', error);
  }
}

// Provider Component
export function CookieConsentProvider({ children }: { children: ReactNode }) {
  // État du consentement (par défaut: necessary true, autres false)
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false
  });

  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Charger le consent au montage
  useEffect(() => {
    const storedConsent = loadConsentFromStorage();

    if (storedConsent) {
      // Consent déjà donné
      setConsent(storedConsent);
      setShowBanner(false);
      console.log('[Cookie Consent] Consent chargé:', storedConsent);
    } else {
      // Première visite
      setShowBanner(true);
      console.log('[Cookie Consent] Première visite, affichage banner');
    }

    setIsInitialized(true);
  }, []);

  // Fonction: Vérifier si une catégorie est autorisée
  const hasConsent = (category: CookieCategory): boolean => {
    return consent[category];
  };

  // Fonction: Mettre à jour le consentement
  const updateConsent = (newConsent: Partial<CookieConsent>) => {
    const updated: CookieConsent = {
      ...consent,
      ...newConsent,
      necessary: true // Toujours true
    };

    setConsent(updated);
    saveConsentToStorage(updated);
    setShowBanner(false);
    setShowPreferences(false);

    console.log('[Cookie Consent] Consent mis à jour:', updated);
  };

  // Fonction: Tout accepter
  const acceptAll = () => {
    const allAccepted: CookieConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true
    };

    setConsent(allAccepted);
    saveConsentToStorage(allAccepted);
    setShowBanner(false);
    setShowPreferences(false);

    console.log('[Cookie Consent] Tout accepté');
  };

  // Fonction: Tout refuser (sauf necessary)
  const rejectAll = () => {
    const allRejected: CookieConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false
    };

    setConsent(allRejected);
    saveConsentToStorage(allRejected);
    setShowBanner(false);
    setShowPreferences(false);

    console.log('[Cookie Consent] Tout refusé (sauf necessary)');
  };

  // Toujours fournir le provider, même si pas initialisé (pour éviter l'erreur SSR)
  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasConsent,
        updateConsent,
        acceptAll,
        rejectAll,
        showBanner: isInitialized ? showBanner : false, // Ne pas montrer pendant SSR
        setShowBanner,
        showPreferences: isInitialized ? showPreferences : false, // Ne pas montrer pendant SSR
        setShowPreferences
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

// Hook pour utiliser le contexte
export function useCookieConsent(): CookieConsentContextValue {
  const context = useContext(CookieConsentContext);

  if (!context) {
    throw new Error('useCookieConsent must be used within CookieConsentProvider');
  }

  return context;
}
