'use client';

import { useCookieConsent } from '@/lib/cookie-consent';
import { Button } from '@/components/ui/button';
import { Cookie, Settings, CheckCircle } from 'lucide-react';

export function CookieBanner() {
  const { showBanner, acceptAll, rejectAll, setShowPreferences } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <>
      {/* Overlay semi-transparent */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-300" style={{ overscrollBehavior: 'contain' }} />

      {/* Banner */}
      <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl shadow-2xl overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-lg bg-[#fb41c7]/10 flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-[#fb41c7]" />
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold text-[#e0e0e0] tracking-tight">
                  Nous utilisons des cookies
                </h3>
                <p className="text-sm text-[#a0a0a0] leading-relaxed">
                  Pour améliorer votre expérience et analyser notre trafic, nous utilisons des cookies conformes au RGPD.
                  Vous pouvez choisir quels cookies autoriser.{' '}
                  <a
                    href="/cookies"
                    className="text-[#fb41c7] hover:opacity-80 transition-opacity underline focus-visible:ring-2 focus-visible:ring-[#fb41c7] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] rounded"
                  >
                    En savoir plus
                  </a>
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => {
                    rejectAll();
                  }}
                  variant="outline"
                  className="w-full sm:w-auto border-[#1f1f1f] hover:bg-[#1a1a1a] text-[#a0a0a0]"
                >
                  Tout refuser
                </Button>

                <Button
                  onClick={() => {
                    setShowPreferences(true);
                  }}
                  variant="outline"
                  className="w-full sm:w-auto border-[#1f1f1f] hover:bg-[#1a1a1a] text-[#e0e0e0]"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Personnaliser
                </Button>

                <Button
                  onClick={() => {
                    acceptAll();
                  }}
                  className="w-full sm:w-auto bg-[#fb41c7] hover:bg-[#e03bb5] text-black font-medium"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Tout accepter
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
