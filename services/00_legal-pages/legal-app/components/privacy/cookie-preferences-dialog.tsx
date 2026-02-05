'use client';

import { useState } from 'react';
import { useCookieConsent, COOKIE_CATEGORIES, type CookieCategory, type CookieConsent } from '@/lib/cookie-consent';
import { Button } from '@/components/ui/button';
import { X, CheckCircle } from 'lucide-react';

export function CookiePreferencesDialog() {
  const {
    consent,
    updateConsent,
    showPreferences,
    setShowPreferences
  } = useCookieConsent();

  // État local pour le formulaire
  const [localConsent, setLocalConsent] = useState<CookieConsent>(consent);

  if (!showPreferences) return null;

  const handleToggle = (category: CookieCategory) => {
    if (category === 'necessary') return; // Ne peut pas désactiver necessary

    setLocalConsent(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleToggleKeyDown = (e: React.KeyboardEvent, category: CookieCategory) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle(category);
    }
  };

  const handleSave = () => {
    updateConsent(localConsent);
  };

  const handleClose = () => {
    setLocalConsent(consent); // Reset au consent actuel
    setShowPreferences(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-in fade-in duration-300"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="w-full max-w-2xl max-h-[90vh] overflow-hidden pointer-events-auto animate-in zoom-in-95 duration-300">
          <div className="bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1f1f1f]">
              <h2 className="text-xl font-semibold text-[#e0e0e0] tracking-tight">
                Préférences des cookies
              </h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-lg hover:bg-[#1a1a1a] transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5 text-[#a0a0a0]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <p className="text-sm text-[#a0a0a0] mb-6">
                Gérez vos préférences de cookies. Les cookies nécessaires sont toujours activés car ils sont essentiels au fonctionnement du site.
              </p>

              {/* Categories */}
              <div className="space-y-4">
                {(Object.keys(COOKIE_CATEGORIES) as CookieCategory[]).map((categoryId) => {
                  const category = COOKIE_CATEGORIES[categoryId];
                  const isEnabled = localConsent[categoryId];
                  const isDisabled = category.required;

                  return (
                    <div
                      key={categoryId}
                      className="border border-[#1f1f1f] rounded-lg p-4 bg-[#111111]"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-[#e0e0e0]">
                              {category.name}
                            </h3>
                            {category.required && (
                              <span className="px-2 py-0.5 text-xs font-medium bg-[#fb41c7]/10 text-[#fb41c7] rounded">
                                Requis
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#a0a0a0] leading-relaxed mb-3">
                            {category.description}
                          </p>
                          <div className="text-xs text-[#707070]">
                            <span className="font-medium">Cookies utilisés :</span>{' '}
                            {category.cookies.join(', ')}
                          </div>
                        </div>

                        {/* Toggle Switch */}
                        <button
                          onClick={() => handleToggle(categoryId)}
                          onKeyDown={(e) => handleToggleKeyDown(e, categoryId)}
                          disabled={isDisabled}
                          className={`
                            relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#fb41c7] focus:ring-offset-2 focus:ring-offset-[#0a0a0a]
                            ${isEnabled ? 'bg-[#fb41c7]' : 'bg-[#2a2a2a]'}
                            ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                          `}
                          role="switch"
                          aria-checked={isEnabled}
                          aria-label={`${isEnabled ? 'Désactiver' : 'Activer'} ${category.name}`}
                        >
                          <span
                            className={`
                              inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                              ${isEnabled ? 'translate-x-6' : 'translate-x-1'}
                            `}
                          />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[#1f1f1f]">
              <Button
                onClick={handleClose}
                variant="outline"
                className="border-[#1f1f1f] hover:bg-[#1a1a1a] text-[#a0a0a0]"
              >
                Annuler
              </Button>
              <Button
                onClick={handleSave}
                className="bg-[#fb41c7] hover:bg-[#e03bb5] text-black font-medium"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Enregistrer mes choix
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
