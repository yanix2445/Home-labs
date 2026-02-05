'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldIcon, XIcon } from 'lucide-react'; // Using standard lucide icons for reliability or custom icons
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function CookieBanner() {
    const [showBanner, setShowBanner] = useState(false);
    const [showPreferences, setShowPreferences] = useState(false);

    const [preferences, setPreferences] = useState({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        // Check if consent has already been given
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            setShowBanner(true);
        }
    }, []);

    const handleAcceptAll = () => {
        saveConsent({ necessary: true, analytics: true, marketing: true });
    };

    const handleRefuseAll = () => {
        saveConsent({ necessary: true, analytics: false, marketing: false });
    };

    const handleSavePreferences = () => {
        saveConsent(preferences);
    };

    const saveConsent = (prefs: typeof preferences) => {
        localStorage.setItem('cookie-consent', JSON.stringify({
            ...prefs,
            timestamp: new Date().toISOString(),
        }));
        setShowBanner(false);
        setShowPreferences(false);

        // Trigger window event for analytics scripts to pick up
        window.dispatchEvent(new Event('cookie-consent-updated'));
    };

    if (!showBanner) return (
        <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 left-4 z-50 rounded-full h-10 w-10 shadow-lg bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/50"
            onClick={() => { setShowBanner(true); setShowPreferences(true); }}
            aria-label="Gérer les cookies"
        >
            <ShieldIcon className="h-5 w-5 text-primary" />
        </Button>
    );

    if (showPreferences) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in">
                <Card className="w-full max-w-lg glass border-primary/20 shadow-2xl">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <CardTitle className="text-xl font-bold flex items-center gap-2">
                            <ShieldIcon className="h-5 w-5 text-primary" />
                            Préférences Cookies
                        </CardTitle>
                        <Button variant="ghost" size="icon" onClick={() => setShowPreferences(false)}>
                            <XIcon className="h-4 w-4" />
                        </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Gérez vos préférences de consentement pour les différents types de cookies.
                        </p>

                        <div className="space-y-4">
                            <div className="flex items-start justify-between space-x-4 rounded-lg border p-4 bg-muted/30">
                                <div className="space-y-1">
                                    <h4 className="font-medium">Nécessaires</h4>
                                    <p className="text-xs text-muted-foreground">Indispensables au fonctionnement du site (session, sécurité).</p>
                                </div>
                                <div className="flex items-center h-6">
                                    <input type="checkbox" checked disabled className="h-4 w-4 accent-primary" />
                                </div>
                            </div>

                            <div className="flex items-start justify-between space-x-4 rounded-lg border p-4 hover:bg-muted/30 transition-colors">
                                <div className="space-y-1">
                                    <h4 className="font-medium">Analytiques</h4>
                                    <p className="text-xs text-muted-foreground">Mesure d'audience anonyme pour améliorer l'expérience.</p>
                                </div>
                                <div className="flex items-center h-6">
                                    <input
                                        type="checkbox"
                                        checked={preferences.analytics}
                                        onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                                        className="h-4 w-4 accent-primary cursor-pointer"
                                    />
                                </div>
                            </div>

                            <div className="flex items-start justify-between space-x-4 rounded-lg border p-4 hover:bg-muted/30 transition-colors">
                                <div className="space-y-1">
                                    <h4 className="font-medium">Marketing</h4>
                                    <p className="text-xs text-muted-foreground">Publicités ciblées et réseaux sociaux.</p>
                                </div>
                                <div className="flex items-center h-6">
                                    <input
                                        type="checkbox"
                                        checked={preferences.marketing}
                                        onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                                        className="h-4 w-4 accent-primary cursor-pointer"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={handleRefuseAll}>Tout Refuser</Button>
                        <Button onClick={handleSavePreferences}>Enregistrer</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    return (
        <div className="fixed bottom-0 inset-x-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
            <div className="container mx-auto max-w-5xl">
                <Card className="glass border-primary/20 shadow-2xl">
                    <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-6">
                        <div className="space-y-2 text-center md:text-left">
                            <h3 className="text-lg font-semibold flex items-center justify-center md:justify-start gap-2">
                                <ShieldIcon className="h-5 w-5 text-primary" />
                                Respect de votre vie privée
                            </h3>
                            <p className="text-sm text-muted-foreground max-w-2xl">
                                Nous utilisons des cookies pour assurer le bon fonctionnement du site et mesurer notre audience.
                                Vous pouvez accepter, refuser ou paramétrer vos choix à tout moment.
                                <Link href="/cookies" className="text-primary hover:underline ml-1">
                                    En savoir plus
                                </Link>
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
                            <Button variant="ghost" onClick={() => setShowPreferences(true)} className="w-full sm:w-auto">
                                Paramétrer
                            </Button>
                            <Button variant="outline" onClick={handleRefuseAll} className="w-full sm:w-auto border-destructive/20 hover:bg-destructive/10 hover:text-destructive">
                                Tout Refuser
                            </Button>
                            <Button onClick={handleAcceptAll} className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(var(--primary),0.3)]">
                                Tout Accepter
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
