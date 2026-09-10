import { Resend } from "resend";
import { Booking } from "@/types";
import { siteConfig } from "@/config/site-data";
import { formatPrice } from "./utils";

const resendApiKey = process.env.RESEND_API_KEY || "re_placeholder";
export const resend = new Resend(resendApiKey);

const fromEmail = process.env.EMAIL_FROM || "Les Restanques <contact@les-restanques-gite.fr>";
const hostEmail = process.env.HOST_NOTIFICATION_EMAIL || "les-restanques@gmail.com";

export async function sendHostNewBookingAlert(booking: Booking): Promise<boolean> {
  const subject = `[Nouvelle Demande] Séjour du ${booking.check_in} au ${booking.check_out} — ${booking.guest_first_name} ${booking.guest_last_name}`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAF8F5; color: #1F2421; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #EAE4D7; overflow: hidden; }
          .header { background: #3D523F; color: #FAF8F5; padding: 24px; text-align: center; }
          .content { padding: 24px; }
          .card { background: #FAF8F5; border: 1px solid #EAE4D7; border-radius: 6px; padding: 16px; margin: 16px 0; }
          .btn { display: inline-block; background: #3D523F; color: #ffffff !important; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; margin-top: 16px; }
          .footer { font-size: 12px; color: #606862; text-align: center; padding: 16px; border-top: 1px solid #EAE4D7; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0; font-size: 22px;">Les Restanques — Espace Hôte</h1>
            <p style="margin:4px 0 0 0; font-size: 14px;">Nouvelle demande de réservation reçue</p>
          </div>
          <div class="content">
            <p>Bonjour Judith,</p>
            <p>Une nouvelle demande de réservation directe vient d'être enregistrée sur le site :</p>
            
            <div class="card">
              <p><strong>Voyageur :</strong> ${booking.guest_first_name} ${booking.guest_last_name}</p>
              <p><strong>Email :</strong> ${booking.guest_email}</p>
              <p><strong>Téléphone :</strong> ${booking.guest_phone}</p>
              <p><strong>Dates :</strong> Du <strong>${booking.check_in}</strong> au <strong>${booking.check_out}</strong></p>
              <p><strong>Nombre d'occupants :</strong> ${booking.guests_count} personnes</p>
              <p><strong>Option ménage :</strong> ${booking.include_cleaning ? "Oui (+50 €)" : "Non"}</p>
              <p><strong>Montant estimé :</strong> ${formatPrice(booking.total_price)}</p>
              ${booking.guest_message ? `<p><strong>Message du voyageur :</strong><br><em>« ${booking.guest_message} »</em></p>` : ""}
            </div>

            <p>Ces dates ont été <strong>temporairement bloquées</strong> sur votre site public dans l'attente de votre réponse.</p>

            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/dashboard" class="btn">
                Accéder au tableau de bord pour Valider ou Refuser
              </a>
            </div>
          </div>
          <div class="footer">
            Gîte Les Restanques • 8 cours de la Liberté, 84490 Saint-Saturnin-lès-Apt
          </div>
        </div>
      </body>
    </html>
  `;

  if (resendApiKey === "re_placeholder") {
    console.log(`[RESEND MOCK] Host alert email generated for ${hostEmail} (Subject: ${subject})`);
    return true;
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: hostEmail,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Error sending host alert email:", error);
    return false;
  }
}

export async function sendGuestBookingReceipt(booking: Booking): Promise<boolean> {
  const isFr = booking.guest_locale === "fr";
  const subject = isFr
    ? `Demande de réservation bien reçue — Gîte Les Restanques`
    : `Booking request received — Les Restanques Villa`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAF8F5; color: #1F2421; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #EAE4D7; overflow: hidden; }
          .header { background: #3D523F; color: #FAF8F5; padding: 24px; text-align: center; }
          .content { padding: 24px; line-height: 1.6; }
          .card { background: #FAF8F5; border: 1px solid #EAE4D7; border-radius: 6px; padding: 16px; margin: 16px 0; }
          .footer { font-size: 12px; color: #606862; text-align: center; padding: 16px; border-top: 1px solid #EAE4D7; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0; font-size: 22px;">Les Restanques</h1>
            <p style="margin:4px 0 0 0; font-size: 14px;">Saint-Saturnin-lès-Apt • Luberon</p>
          </div>
          <div class="content">
            <p>${isFr ? `Bonjour ${booking.guest_first_name},` : `Dear ${booking.guest_first_name},`}</p>
            <p>
              ${
                isFr
                  ? "Nous vous remercions chaleureusement pour votre demande de réservation aux Restanques. Vos dates sont actuellement bloquées sur notre calendrier."
                  : "Thank you for your booking request at Les Restanques. Your selected dates are currently held on our calendar."
              }
            </p>

            <div class="card">
              <p><strong>${isFr ? "Dates de séjour :" : "Stay dates:"}</strong> Du <strong>${booking.check_in}</strong> au <strong>${booking.check_out}</strong></p>
              <p><strong>${isFr ? "Voyageurs :" : "Guests:"}</strong> ${booking.guests_count} ${isFr ? "personnes" : "guests"}</p>
              <p><strong>${isFr ? "Option forfait ménage :" : "Cleaning option:"}</strong> ${booking.include_cleaning ? (isFr ? "Inclus (+50 €)" : "Included (+50 €)") : (isFr ? "Non inclus" : "Not included")}</p>
              <p><strong>${isFr ? "Montant total estimé :" : "Estimated total:"}</strong> ${formatPrice(booking.total_price)}</p>
            </div>

            <p>
              ${
                isFr
                  ? "Judith, votre hôte, examine votre demande et vous répondra sous 24 heures pour confirmer la disponibilité et finaliser votre réservation."
                  : "Judith, your host, is reviewing your request and will respond within 24 hours to confirm availability and finalize your stay."
              }
            </p>

            <p style="margin-top: 24px;">
              ${isFr ? "Bien chaleureusement," : "Warm regards,"}<br>
              <strong>Judith</strong> — <em>Les Restanques</em>
            </p>
          </div>
          <div class="footer">
            ${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city} • ${siteConfig.email}
          </div>
        </div>
      </body>
    </html>
  `;

  if (resendApiKey === "re_placeholder") {
    console.log(`[RESEND MOCK] Guest receipt email to ${booking.guest_email} (Subject: ${subject})`);
    return true;
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: booking.guest_email,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Error sending guest receipt email:", error);
    return false;
  }
}

export async function sendGuestConfirmationEmail(booking: Booking): Promise<boolean> {
  const isFr = booking.guest_locale === "fr";
  const subject = isFr
    ? `Confirmation de votre réservation — Gîte Les Restanques`
    : `Booking confirmed — Les Restanques Villa`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAF8F5; color: #1F2421; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #EAE4D7; overflow: hidden; }
          .header { background: #3D523F; color: #FAF8F5; padding: 24px; text-align: center; }
          .content { padding: 24px; line-height: 1.6; }
          .card { background: #FAF8F5; border: 1px solid #EAE4D7; border-radius: 6px; padding: 16px; margin: 16px 0; }
          .footer { font-size: 12px; color: #606862; text-align: center; padding: 16px; border-top: 1px solid #EAE4D7; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0; font-size: 22px;">Les Restanques</h1>
            <p style="margin:4px 0 0 0; font-size: 14px;">${isFr ? "Réservation Confirmée" : "Reservation Confirmed"}</p>
          </div>
          <div class="content">
            <p>${isFr ? `Bonjour ${booking.guest_first_name},` : `Dear ${booking.guest_first_name},`}</p>
            <p>
              ${
                isFr
                  ? "J'ai le grand plaisir de vous confirmer votre séjour au gîte Les Restanques ! Nous avons hâte de vous recevoir au cœur du Luberon."
                  : "I am delighted to confirm your stay at Les Restanques! We look forward to welcoming you to the heart of Luberon."
              }
            </p>

            <div class="card">
              <h3 style="margin-top:0; color:#3D523F;">${isFr ? "Détails de votre séjour" : "Your Stay Details"}</h3>
              <p><strong>${isFr ? "Adresse :" : "Address:"}</strong> ${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city}</p>
              <p><strong>${isFr ? "Arrivée (Check-in) :" : "Check-in:"}</strong> ${booking.check_in} (entre 16h00 et 20h00 / boîte à clés disponible)</p>
              <p><strong>${isFr ? "Départ (Check-out) :" : "Check-out:"}</strong> ${booking.check_out} (avant 10h00)</p>
              <p><strong>${isFr ? "Voyageurs :" : "Guests:"}</strong> ${booking.guests_count} personnes</p>
              <p><strong>${isFr ? "Linge de maison :" : "Linen & Towels:"}</strong> ${isFr ? "Inclus" : "Included"}</p>
              <p><strong>${isFr ? "Montant total du séjour :" : "Total price:"}</strong> ${formatPrice(booking.total_price)}</p>
              <p style="font-size: 13px; color: #606862;"><em>${isFr ? "Note : La taxe de séjour est à régler sur place lors de votre arrivée." : "Note: Tourist tax is payable on site upon arrival."}</em></p>
            </div>

            <p>
              ${
                isFr
                  ? "Je reste à votre entière disposition pour toute question préparatoire à votre venue ou pour vous conseiller sur les visites de notre belle région."
                  : "Feel free to reach out with any questions prior to your arrival. I will be happy to share tips and recommendations for your stay."
              }
            </p>

            <p style="margin-top: 24px;">
              ${isFr ? "À très bientôt en Provence," : "See you soon in Provence,"}<br>
              <strong>Judith</strong>
            </p>
          </div>
          <div class="footer">
            ${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city} • ${siteConfig.email}
          </div>
        </div>
      </body>
    </html>
  `;

  if (resendApiKey === "re_placeholder") {
    console.log(`[RESEND MOCK] Confirmation email to ${booking.guest_email} (Subject: ${subject})`);
    return true;
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: booking.guest_email,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Error sending guest confirmation email:", error);
    return false;
  }
}

export async function sendGuestRejectionEmail(booking: Booking, customReason?: string): Promise<boolean> {
  const isFr = booking.guest_locale === "fr";
  const subject = isFr
    ? `Votre demande de réservation — Gîte Les Restanques`
    : `Your booking request — Les Restanques Villa`;

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #FAF8F5; color: #1F2421; margin: 0; padding: 24px; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; border: 1px solid #EAE4D7; overflow: hidden; }
          .header { background: #3D523F; color: #FAF8F5; padding: 24px; text-align: center; }
          .content { padding: 24px; line-height: 1.6; }
          .note { background: #FAF8F5; border-left: 4px solid #CD7559; padding: 12px 16px; margin: 16px 0; }
          .footer { font-size: 12px; color: #606862; text-align: center; padding: 16px; border-top: 1px solid #EAE4D7; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin:0; font-size: 22px;">Les Restanques</h1>
          </div>
          <div class="content">
            <p>${isFr ? `Bonjour ${booking.guest_first_name},` : `Dear ${booking.guest_first_name},`}</p>
            <p>
              ${
                isFr
                  ? `Nous vous remercions pour l'intérêt que vous portez aux Restanques. Malheureusement, nous ne sommes pas en mesure de donner suite à votre demande pour les dates du <strong>${booking.check_in} au ${booking.check_out}</strong>.`
                  : `Thank you for your interest in Les Restanques. Unfortunately, we are unable to accept your booking request for the dates <strong>${booking.check_in} to ${booking.check_out}</strong>.`
              }
            </p>

            ${
              customReason
                ? `
              <div class="note">
                <p><strong>${isFr ? "Message de Judith :" : "Message from Judith:"}</strong></p>
                <p><em>« ${customReason} »</em></p>
              </div>
            `
                : ""
            }

            <p>
              ${
                isFr
                  ? "Nous vous invitons à consulter notre calendrier pour d'autres dates disponibles et espérons avoir le plaisir de vous accueillir prochainement."
                  : "We invite you to check our calendar for alternative available dates and hope to have the opportunity to welcome you in the future."
              }
            </p>

            <p style="margin-top: 24px;">
              ${isFr ? "Bien cordialement," : "Kind regards,"}<br>
              <strong>Judith</strong> — <em>Les Restanques</em>
            </p>
          </div>
          <div class="footer">
            ${siteConfig.address.street}, ${siteConfig.address.postalCode} ${siteConfig.address.city} • ${siteConfig.email}
          </div>
        </div>
      </body>
    </html>
  `;

  if (resendApiKey === "re_placeholder") {
    console.log(`[RESEND MOCK] Rejection email to ${booking.guest_email} (Subject: ${subject})`);
    return true;
  }

  try {
    await resend.emails.send({
      from: fromEmail,
      to: booking.guest_email,
      subject,
      html,
    });
    return true;
  } catch (error) {
    console.error("Error sending guest rejection email:", error);
    return false;
  }
}
