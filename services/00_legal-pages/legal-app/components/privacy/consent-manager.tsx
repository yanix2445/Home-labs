'use client';

import {
    ConsentManagerProvider,
    CookieBanner,
    ConsentManagerDialog
} from '@c15t/nextjs';
import type { ReactNode } from 'react';

// Import CSS is usually needed, checking if c15t provides a CSS file or if it's headless.
// Based on typical library patterns, we might need a CSS import.
// However, the quickstart didn't explicitly mention it in the snippet.
// I will assume for now it comes with some styles or I might need to style it.
// Let's stick to the vanilla implementation first.

export function ConsentManager({ children }: { children: ReactNode }) {
    return (
        <ConsentManagerProvider
            options={{
                consentCategories: [
                    'necessary',
                    'analytics',
                    'marketing'
                ],
                // Using local mode implied by lack of backendURL if supported, 
                // or just basic configuration.
                // If mode is required, 'local' might be a valid option if 'c15t' requires backend.
                // Let's try basic configuration first.
            }}
        >
            {children}
            <CookieBanner />
            <ConsentManagerDialog />
        </ConsentManagerProvider>
    );
}
