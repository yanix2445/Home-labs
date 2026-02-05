'use client';

import { useEffect, useState } from 'react';
import { useCookieConsent } from '@/lib/cookie-consent';

export default function DebugGAPage() {
  const { consent, hasConsent, acceptAll } = useCookieConsent();
  const [gtagStatus, setGtagStatus] = useState<string>('Checking...');
  const [dataLayerContent, setDataLayerContent] = useState<any[]>([]);

  useEffect(() => {
    const checkGtag = () => {
      if (typeof window !== 'undefined') {
        setGtagStatus(window.gtag ? '✅ gtag loaded' : '❌ gtag NOT loaded');
        setDataLayerContent(window.dataLayer || []);
      }
    };

    checkGtag();
    const interval = setInterval(checkGtag, 1000);
    return () => clearInterval(interval);
  }, []);

  const sendTestEvent = () => {
    if (window.gtag) {
      window.gtag('event', 'test_event', {
        event_category: 'debug',
        event_label: 'manual_test'
      });
      alert('Test event sent! Check Network tab for requests to google-analytics.com');
    } else {
      alert('gtag not available');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Debug Google Analytics</h1>

      {/* Gtag Status */}
      <div className="mb-8 p-6 bg-[#111] border border-[#1f1f1f] rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Gtag Status</h2>
        <p className="text-lg">{gtagStatus}</p>
      </div>

      {/* Consent Status */}
      <div className="mb-8 p-6 bg-[#111] border border-[#1f1f1f] rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Cookie Consent</h2>
        <pre className="bg-black p-4 rounded overflow-auto">
          {JSON.stringify(consent, null, 2)}
        </pre>
        <button
          onClick={acceptAll}
          className="mt-4 px-4 py-2 bg-[#fb41c7] text-black rounded hover:bg-[#e03bb5]"
        >
          Accept All Cookies
        </button>
      </div>

      {/* DataLayer */}
      <div className="mb-8 p-6 bg-[#111] border border-[#1f1f1f] rounded-lg">
        <h2 className="text-xl font-semibold mb-4">DataLayer Content</h2>
        <pre className="bg-black p-4 rounded overflow-auto max-h-96">
          {JSON.stringify(dataLayerContent, null, 2)}
        </pre>
      </div>

      {/* Test Button */}
      <div className="mb-8 p-6 bg-[#111] border border-[#1f1f1f] rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Manual Test</h2>
        <button
          onClick={sendTestEvent}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Send Test Event
        </button>
        <p className="mt-4 text-sm text-gray-400">
          Open DevTools → Network → Filter by "collect" before clicking
        </p>
      </div>

      {/* Checklist */}
      <div className="mb-8 p-6 bg-[#111] border border-[#1f1f1f] rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Checklist</h2>
        <ul className="space-y-2">
          <li className={gtagStatus.includes('✅') ? 'text-green-500' : 'text-red-500'}>
            {gtagStatus.includes('✅') ? '✅' : '❌'} gtag script loaded
          </li>
          <li className={hasConsent('analytics') ? 'text-green-500' : 'text-yellow-500'}>
            {hasConsent('analytics') ? '✅' : '⚠️'} Analytics consent {hasConsent('analytics') ? 'granted' : 'denied'}
          </li>
          <li className={dataLayerContent.length > 0 ? 'text-green-500' : 'text-red-500'}>
            {dataLayerContent.length > 0 ? '✅' : '❌'} DataLayer has {dataLayerContent.length} entries
          </li>
        </ul>
      </div>

      {/* Instructions */}
      <div className="p-6 bg-[#111] border border-[#fb41c7]/20 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Instructions</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Open DevTools (F12) → Network tab</li>
          <li>Filter by "collect"</li>
          <li>Click "Accept All Cookies" above</li>
          <li>Click "Send Test Event"</li>
          <li>You should see POST requests to www.google-analytics.com/g/collect</li>
        </ol>
      </div>
    </div>
  );
}
