import { Resend } from 'resend';
import { DeletionRequestEmail } from '@/components/emails/deletion-request';
import { DeletionConfirmationEmail } from '@/components/emails/deletion-confirmation';

// Admin email for receiving deletion requests
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'yanis.amine.harrat@gmail.com';
// From email (must be verified domain in Resend)
const FROM_EMAIL = process.env.FROM_EMAIL || 'legal@blackrise.io';

interface DeletionRequestBody {
  fullName: string;
  email: string;
  whatsapp?: string;
  services: string[];
  additionalInfo?: string;
}

export async function POST(request: Request) {
  // Initialize Resend lazily to avoid build-time errors
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return Response.json(
      { error: 'Service email non configuré' },
      { status: 500 }
    );
  }
  
  const resend = new Resend(apiKey);

  try {
    const body: DeletionRequestBody = await request.json();
    const { fullName, email, whatsapp, services, additionalInfo } = body;

    // Validate required fields
    if (!fullName || !email || !services || services.length === 0) {
      return Response.json(
        { error: 'Champs requis manquants' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: 'Format email invalide' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Send notification to admin
    const { error: adminError } = await resend.emails.send({
      from: `Black Rise Legal <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject: `🗑️ Demande de suppression RGPD - ${fullName}`,
      react: DeletionRequestEmail({
        fullName,
        email,
        whatsapp,
        services,
        additionalInfo,
        timestamp,
      }),
    });

    if (adminError) {
      console.error('Failed to send admin notification:', adminError);
      return Response.json(
        { error: 'Erreur lors de l\'envoi de la notification' },
        { status: 500 }
      );
    }

    // Send confirmation to user
    const { error: userError } = await resend.emails.send({
      from: `Black Rise <${FROM_EMAIL}>`,
      to: [email],
      subject: 'Confirmation de votre demande de suppression - Black Rise',
      react: DeletionConfirmationEmail({ fullName }),
    });

    if (userError) {
      console.error('Failed to send user confirmation:', userError);
      // Don't fail the request if user confirmation fails
      // The admin has been notified
    }

    return Response.json({
      success: true,
      message: 'Demande de suppression envoyée avec succès',
    });
  } catch (error) {
    console.error('Error processing deletion request:', error);
    return Response.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
