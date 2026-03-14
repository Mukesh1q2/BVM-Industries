import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const TO_EMAILS = ['sales@mybvm.in'];

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const body = await req.json();
    const { name, company, email, phone, productInterest, message } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required.' },
        { status: 400 }
      );
    }

    // --- Email to BVM Sales Team ---
    const internalHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; background: #f4f6fa; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 32px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            .header { background: #0B0F17; padding: 24px 32px; }
            .header h1 { color: #fff; margin: 0; font-size: 20px; }
            .header p { color: #2F8FFF; margin: 4px 0 0; font-size: 13px; }
            .badge { display: inline-block; background: #2F8FFF; color: #fff; font-size: 12px; font-weight: bold; padding: 4px 12px; border-radius: 50px; margin-top: 8px; }
            .body { padding: 32px; }
            .field { margin-bottom: 18px; }
            .label { font-size: 11px; font-weight: bold; text-transform: uppercase; color: #888; letter-spacing: 0.5px; margin-bottom: 4px; }
            .value { font-size: 15px; color: #111; background: #f4f6fa; padding: 10px 14px; border-radius: 6px; border-left: 3px solid #2F8FFF; }
            .footer { background: #f4f6fa; padding: 16px 32px; font-size: 12px; color: #aaa; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>BVM Industries</h1>
              <p>New Enquiry Received</p>
              <span class="badge">NEW LEAD</span>
            </div>
            <div class="body">
              <div class="field">
                <div class="label">Full Name</div>
                <div class="value">${name}</div>
              </div>
              ${company ? `<div class="field"><div class="label">Company</div><div class="value">${company}</div></div>` : ''}
              <div class="field">
                <div class="label">Email Address</div>
                <div class="value"><a href="mailto:${email}" style="color:#2F8FFF">${email}</a></div>
              </div>
              ${phone ? `<div class="field"><div class="label">Phone</div><div class="value"><a href="tel:${phone}" style="color:#2F8FFF">${phone}</a></div></div>` : ''}
              ${productInterest ? `<div class="field"><div class="label">Product Interest</div><div class="value">${productInterest}</div></div>` : ''}
              ${message ? `<div class="field"><div class="label">Message / Requirements</div><div class="value" style="white-space:pre-wrap">${message}</div></div>` : ''}
            </div>
            <div class="footer">
              This enquiry was submitted via the BVM Industries website contact form — mybvm.in
            </div>
          </div>
        </body>
      </html>
    `;

    // --- Auto-reply to the client ---
    const autoReplyHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; background: #f4f6fa; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 32px auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
            .header { background: #0B0F17; padding: 32px; text-align: center; }
            .header h1 { color: #fff; margin: 0 0 4px; font-size: 22px; }
            .header p { color: #2F8FFF; margin: 0; font-size: 13px; }
            .body { padding: 32px; color: #333; line-height: 1.7; }
            .highlight { background: #f4f6fa; border-left: 3px solid #2F8FFF; padding: 12px 16px; border-radius: 0 6px 6px 0; margin: 16px 0; font-size: 14px; }
            .footer { background: #f4f6fa; padding: 16px 32px; font-size: 12px; color: #aaa; text-align: center; }
            a { color: #2F8FFF; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>BVM Industries</h1>
              <p>Precision Engineering for Aseptic Packaging Solutions</p>
            </div>
            <div class="body">
              <p>Dear <strong>${name}</strong>,</p>
              <p>Thank you for reaching out to <strong>BVM Industries</strong>. We have received your enquiry and our team will review it shortly.</p>
              <p>You can expect to hear from us within <strong>1–2 business days</strong>. For urgent requirements, please contact us directly:</p>
              <div class="highlight">
                📞 <a href="tel:+917018231499">+91 7018231499</a><br>
                ✉️ <a href="mailto:sales@mybvm.in">sales@mybvm.in</a><br>
                📍 Plot No. 774/496/46, Village Gullarwala, Baddi, H.P. 173205
              </div>
              <p>We look forward to supporting your project.</p>
              <p>Warm regards,<br><strong>BVM Industries Sales Team</strong></p>
            </div>
            <div class="footer">
              © ${new Date().getFullYear()} BVM Industries. All rights reserved. | <a href="https://mybvm.in">mybvm.in</a>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send internal notification to BVM team
    await resend.emails.send({
      from: 'BVM Industries Enquiries <onboarding@resend.dev>',
      to: TO_EMAILS,
      subject: `New Enquiry from ${name}${company ? ` – ${company}` : ''}`,
      html: internalHtml,
      replyTo: email,
    });

    // Send auto-reply to the client
    await resend.emails.send({
      from: 'BVM Industries <onboarding@resend.dev>',
      to: [email],
      subject: 'We received your enquiry – BVM Industries',
      html: autoReplyHtml,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error('[Contact API] Error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to send message.' },
      { status: 500 }
    );
  }
}
