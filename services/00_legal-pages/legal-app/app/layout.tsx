import type { Metadata, Viewport } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CookieConsentProvider } from "@/lib/cookie-consent";
import { CookieBanner } from "@/components/privacy/cookie-banner";
import { CookiePreferencesDialog } from "@/components/privacy/cookie-preferences-dialog";
import { GoogleAnalytics } from "@/components/privacy/google-analytics";

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: "Documentation Légale — Black Rise",
    template: "%s — Black Rise",
  },
  description: "Politique de confidentialité, conditions de service et gestion des données — Black Rise",
  metadataBase: new URL("https://legal.yanis-harrat.com"),
  openGraph: {
    title: "Documentation Légale — Black Rise",
    description: "Politique de confidentialité, conditions de service et gestion des données personnelles",
    type: "website",
    locale: "fr_FR",
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${raleway.variable} dark`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Google Analytics - Consent Mode v2 (Advanced) - FINAL CONFIG */}
        {/* 1. Define dataLayer and default consent FIRST */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              
              // Default to 'denied' for Consent Mode v2 (Advanced Implementation)
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'wait_for_update': 500
              });
              
              gtag('js', new Date());
              // Config avec proxy pour contourner les ad blockers
              gtag('config', 'G-PS5TMY6KB2', {
                page_path: window.location.pathname,
                transport_url: window.location.origin + '/api/analytics',
                first_party_collection: true
              });
            `
          }}
        />
        {/* 2. Load the Google Tag script SECOND, async */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-PS5TMY6KB2"></script>
      </head>
      <body className="min-h-screen flex flex-col">
        <CookieConsentProvider>
          {/* HIG: Skip link for accessibility */}
          <a href="#main-content" className="skip-link">
            Aller au contenu principal
          </a>
          <Header />
          <main id="main-content" className="flex-1" tabIndex={-1}>
            {children}
          </main>
          <Footer />

          {/* Cookie Consent UI */}
          <CookieBanner />
          <CookiePreferencesDialog />

          {/* Google Analytics avec consent updates */}
          <GoogleAnalytics />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
