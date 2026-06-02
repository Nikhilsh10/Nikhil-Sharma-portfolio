import { Resend } from 'resend';
import { NextResponse } from 'next/server';

/**
 * Simple HTML email template used by Resend SDK.
 */
function EmailTemplate({ name, email, message }: { name: string; email: string; message: string }) {
  return `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    </div>
  `;
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!, // e.g. "Your Name <you@domain.com>"
      to: process.env.RESEND_TO_EMAIL!, // where you want to receive the email
      subject,
      html: EmailTemplate({ name, email, message }),
    });

    return NextResponse.json({ success: true, result }, { status: 200 });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
