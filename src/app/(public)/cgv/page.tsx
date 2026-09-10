import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site-data";

export default function CGVPage() {
  return (
    <div className="shell-narrow pb-section pt-32 sm:pt-36 lg:pt-44">
        <header className="mb-14">
          <Link
            href="/"
            className="link-underline mb-10 text-ink-faint hover:text-ink"
          >
            <span aria-hidden>←</span>
            Retour à l&apos;accueil
          </Link>
          <h1 className="mt-2 font-serif text-display-md text-ink">
            Conditions Générales de Vente & d&apos;Annulation
          </h1>
          <p className="mt-5 font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink-faint">
            Gîte Les Restanques — Meublé de Tourisme 3 étoiles
          </p>
        </header>

        <div className="max-w-none space-y-10 text-[0.9375rem] leading-[1.85] text-ink-soft">
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-ink">
              1. Processus de réservation
            </h2>
            <p>
              Toute demande effectuée sur le site internet constitue une option de réservation préalable sans paiement immédiat en ligne. Dès réception de votre demande, les dates sont temporairement bloquées. La réservation devient ferme et définitive uniquement après validation écrite par l&apos;hôte (Judith) et règlement selon les modalités convenues.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-ink">
              2. Capacité d&apos;accueil
            </h2>
            <p>
              Le gîte est loué pour une capacité maximale de <strong>6 personnes</strong> (enfants et bébés compris). Aucun dépassement de capacité ne pourra être toléré sans accord préalable de l&apos;hôte.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-ink">
              3. Horaires d&apos;arrivée et de départ
            </h2>
            <p>
              • <strong>Arrivée (Check-in) :</strong> À partir de 16h00 et jusqu&apos;à 20h00. Une boîte à clés sécurisée est mise à disposition pour les arrivées tardives ou autonomes.<br />
              • <strong>Départ (Check-out) :</strong> Avant 10h00 le jour convenu.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-ink">
              4. Prestations & Forfait Ménage
            </h2>
            <p>
              Le linge de maison (draps de lit et serviettes de toilette) est fourni et inclus par défaut. Le forfait ménage de fin de séjour est proposé en option au tarif de 50 €. Même avec cette option, les voyageurs sont tenus de laisser les lieux dans un état d&apos;usage convenable (vaisselle propre et rangée, poubelles vidées).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-ink">
              5. Taxe de séjour & Caution
            </h2>
            <p>
              • La <strong>taxe de séjour</strong> est calculée selon le barème officiel de la communauté de communes du Pays d&apos;Apt Luberon et est à régler directement sur place à l&apos;arrivée.<br />
              • Une <strong>caution</strong> est demandée à l&apos;arrivée et restituée au départ après état des lieux.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-ink">
              6. Conditions d&apos;annulation
            </h2>
            <p>
              • Annulation plus de 30 jours avant la date d&apos;arrivée : remboursement intégral.<br />
              • Annulation entre 30 jours et 14 jours avant l&apos;arrivée : retenue de 50% du montant du séjour.<br />
              • Annulation à moins de 14 jours avant l&apos;arrivée ou non-présentation : le montant total du séjour reste dû.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-ink">
              7. Piscine & Sécurité
            </h2>
            <p>
              La piscine est équipée d&apos;un dispositif de sécurité conforme à la législation. Les enfants demeurent sous l&apos;entière et unique responsabilité de leurs parents ou accompagnateurs adultes.
            </p>
          </section>
        </div>
    </div>
  );
}
