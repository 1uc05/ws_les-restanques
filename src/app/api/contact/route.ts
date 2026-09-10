import { NextRequest, NextResponse } from "next/server";
import { resend } from "@/lib/resend";
import { siteConfig } from "@/config/site-data";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Champs requis manquants." }, { status: 400 });
    }

    const resendApiKey = process.env.RESEND_API_KEY || "re_placeholder";
    const hostEmail = process.env.HOST_NOTIFICATION_EMAIL || "les-restanques@gmail.com";
    const fromEmail = process.env.EMAIL_FROM || "Les Restanques <contact@les-restanques-gite.fr>";

    if (resendApiKey !== "re_placeholder") {
      await resend.emails.send({
        from: fromEmail,
        to: hostEmail,
        replyTo: email,
        subject: `[Contact Site] ${subject || "Nouveau message"} — ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; background: #FAF8F5;">
            <h2>Nouveau message depuis le formulaire de contact</h2>
            <p><strong>De :</strong> ${name} (${email})</p>
            <p><strong>Sujet :</strong> ${subject || "Non précisé"}</p>
            <div style="background: white; padding: 15px; border-radius: 6px; border: 1px solid #EAE4D7; margin-top: 15px;">
              <p><strong>Message :</strong></p>
              <p style="white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        `,
      });
    } else {
      console.log(`[RESEND MOCK] Contact message from ${name} (${email}): ${message}`);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error in contact API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
