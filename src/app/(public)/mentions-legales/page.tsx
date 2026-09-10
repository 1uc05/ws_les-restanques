import React from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site-data";

export default function MentionsLegalesPage() {
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
            Mentions Légales
          </h1>
          <p className="mt-5 font-sans text-[0.625rem] font-semibold uppercase tracking-wideish text-ink-faint">
            Dernière mise à jour : 19 Août 2026
          </p>
        </header>

        <div className="max-w-none space-y-10 text-[0.9375rem] leading-[1.85] text-ink-soft">
          <section className="space-y-3">
            <h2 className="font-serif text-xl text-ink">
              1. Éditeur du site
            </h2>
            <p>
              Le site <strong>les-restanques-gite.fr</strong> est édité par :<br />
              <strong>Judith</strong> (Exploitante du meublé de tourisme « Les Restanques »)<br />
              Adresse : 8 cours de la Liberté, 84490 Saint-Saturnin-lès-Apt, France.<br />
              E-mail : <a href={`mailto:${siteConfig.email}`} className="border-b border-ink/25 pb-0.5 transition-colors duration-300 hover:border-ink/70 hover:text-ink">{siteConfig.email}</a><br />
              Classement : Meublé de Tourisme 3 étoiles.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-ink">
              2. Hébergement
            </h2>
            <p>
              Le site est hébergé par :<br />
              <strong>o2switch</strong><br />
              Chemin des Pardiaux, 63000 Clermont-Ferrand, France.<br />
              Téléphone : +33 (0)4 44 44 60 40 • Site : https://www.o2switch.fr
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-ink">
              3. Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble des éléments composant le site (textes, graphismes, logo, mise en page) sont la propriété exclusive de l&apos;éditeur ou de leurs auteurs respectifs. Toute reproduction totale ou partielle sans autorisation expresse est interdite.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-serif text-xl text-ink">
              4. Données personnelles (RGPD)
            </h2>
            <p>
              Les données personnelles recueillies dans le cadre des demandes de réservation (nom, prénom, e-mail, téléphone) sont destinées exclusivement au traitement de votre séjour par l&apos;hôte. Elles ne sont en aucun cas transmises, vendues ou cédées à des tiers.
            </p>
            <p>
              Conformément à la réglementation RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données en contactant : <a href={`mailto:${siteConfig.email}`} className="border-b border-ink/25 pb-0.5 transition-colors duration-300 hover:border-ink/70 hover:text-ink">{siteConfig.email}</a>.
            </p>
          </section>
        </div>
    </div>
  );
}
