import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ConsentManager } from "@/components/privacy/consent-manager";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${raleway.variable} dark`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0a0a0a" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        {/* HIG: Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <ConsentManager>{null}</ConsentManager>
      </body>
    </html>
  );
}
