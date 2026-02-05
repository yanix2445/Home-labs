import { Resend } from 'resend';
import { ContactEmail } from '@/components/emails/contact-email';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'yanis.amine.harrat@gmail.com';
const FROM_EMAIL = process.env.FROM_EMAIL || 'legal@blackrise.io';

interface ContactRequestBody {
  type: 'contact' | 'complaint';
  fullName: string;
  email: string;
  subject?: string;
  message?: string;
  category?: string;
  orderRef?: string;
  description?: string;
  resolution?: string;
}

export async function POST(request: Request) {
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
    const body: ContactRequestBody = await request.json();
    const { type, fullName, email, subject, message, category, orderRef, description, resolution } = body;

    // Validate required fields
    if (!fullName || !email) {
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

    const isComplaint = type === 'complaint';
    const emailSubject = isComplaint
      ? `⚠️ Réclamation - ${fullName}`
      : `✉️ Contact - ${subject || 'Nouveau message'}`;

    const { error: sendError } = await resend.emails.send({
      from: `Black Rise Legal <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      replyTo: email,
      subject: emailSubject,
      react: ContactEmail({
        type,
        fullName,
        email,
        subject,
        message,
        category,
        orderRef,
        description,
        resolution,
        timestamp,
      }),
    });

    if (sendError) {
      console.error('Failed to send email:', sendError);
      return Response.json(
        { error: 'Erreur lors de l\'envoi' },
        { status: 500 }
      );
    }

    return Response.json({
      success: true,
      message: isComplaint ? 'Réclamation enregistrée' : 'Message envoyé',
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return Response.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
