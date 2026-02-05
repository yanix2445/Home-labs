import { NextRequest, NextResponse } from 'next/server';

/**
 * Proxy API pour Google Analytics 4 (Catch-all route)
 *
 * Permet de contourner les ad blockers en routant les requêtes GA4
 * à travers notre propre domaine plutôt que google-analytics.com
 *
 * Supporte tous les chemins: /api/analytics, /api/analytics/g/collect, etc.
 *
 * Avantages:
 * - Fonctionne avec tous les ad blockers
 * - Portable (marche sur n'importe quel hébergeur Next.js)
 * - Respecte toujours le consentement RGPD
 * - Données first-party
 */

const GA_BASE_URL = 'https://www.google-analytics.com';

async function handleRequest(request: NextRequest) {
  try {
    // Extraire le chemin après /api/analytics
    const url = new URL(request.url);
    const pathSegments = url.pathname.split('/api/analytics');
    const gaPath = pathSegments[1] || '/g/collect'; // Default to /g/collect

    // Construire l'URL Google Analytics complète
    const gaUrl = new URL(gaPath, GA_BASE_URL);

    // Copier tous les query params
    url.searchParams.forEach((value, key) => {
      gaUrl.searchParams.append(key, value);
    });

    // Déterminer la méthode HTTP
    const method = request.method === 'POST' ? 'POST' : 'GET';

    // Préparer les headers
    const headers: HeadersInit = {
      'User-Agent': request.headers.get('user-agent') || '',
    };

    // Lire le body si c'est un POST
    let body: string | undefined;
    if (method === 'POST') {
      body = await request.text();
      headers['Content-Type'] = 'text/plain';
    }

    console.log(`[Analytics Proxy] ${method} ${gaUrl.toString().substring(0, 100)}...`);

    // Forward la requête à Google Analytics
    const response = await fetch(gaUrl.toString(), {
      method,
      headers,
      body,
    });

    console.log(`[Analytics Proxy] GA Response: ${response.status}`);

    // Gérer la réponse de GA
    // Status 204 No Content ne peut pas avoir de body
    const responseBody = response.status === 204 ? null : await response.text();

    return new NextResponse(responseBody, {
      status: response.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('[Analytics Proxy] Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return handleRequest(request);
}

export async function POST(request: NextRequest) {
  return handleRequest(request);
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
