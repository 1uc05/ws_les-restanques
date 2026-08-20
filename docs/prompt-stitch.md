# Script de prompting Stitch — Les Restanques

## Mode d’emploi

1. Paste `stitch-reference.md` into Stitch first, as the project reference.
2. Generate **one screen per prompt**, in the exact order below. Do not ask Stitch to create a multi-screen flow in one generation.
3. Generate mobile before desktop. The first screen is the anchor: preserve its design system in every later screen.
4. Keep all visible UI labels in French, including navigation, buttons, form labels, statuses and calendar controls. Prompts remain in English.
5. Expect iteration on the reservation/calendar screen. If Stitch adds sections, invents property facts, or changes the design language, restart that screen rather than polishing the wrong structure.

## 1 — Home / mobile (anchor view)

```text
Using the pasted Les Restanques reference document as the single source of truth, create the first anchor screen: the public Home page for a narrow mobile viewport. Do not add sections or facts beyond the reference.

Establish a reusable visual system for all following screens: mineral off-white / limestone / linen backgrounds; deep charcoal or very dark olive text; restrained terracotta or warm stone-gold accents; elegant high-contrast editorial serif headings paired with a geometric, highly legible sans-serif body; generous whitespace; thin rules; moderate asymmetry; subtle overlaps; no heavy shadows. Make photography the emotional center with large, natural-light, sunbaked HD imagery of the gîte context, pool, panoramic Luberon view or olive garden. Use quiet, intimate editorial composition rather than a symmetrical hotel layout.

Use a mobile-first vertical sequence exactly as specified: Hero Header, Mot de l’Hôte, Les Atouts, Preuve Sociale, final Call to Action. The hero should be the strongest visual entry point and include the French labels “Les Restanques”, “Vérifier les disponibilités”, and a short placeholder subtitle. Use static review cards, not a carousel. Show a restrained header with a compact language switch “FR / EN”.

Treat this screen as the source design system: lock the palette, serif/sans pairing, type scale, spacing rhythm, border treatment, photo aspect ratios, button style, navigation behavior and overall editorial tone so the next four screens can match it exactly. Avoid lavender-purple Provençal clichés, shabby chic, handwritten bistro type, glassmorphism, 3D illustrations, excessive shadows, aggressive CTAs, weather, Instagram, blog/news or any unrequested section. All copy is placeholder.
```

## 2 — Home / desktop

```text
Rely on the pasted Les Restanques reference and the previously generated Home mobile anchor. Create the same public Home page at a wide desktop viewport, preserving the anchor’s exact visual system: palette, typography, type scale, spacing, thin rules, photography treatment, button language, header behavior and Editorial / Sunbaked / Intimate tone.

Adapt the same five sections only—Hero Header, Mot de l’Hôte, Les Atouts, Preuve Sociale, final Call to Action—to desktop. Use generous margins and moderate asymmetry, with an editorial photo-led composition and subtle offset relationships rather than a regular corporate grid. Keep the French on-screen labels “Vérifier les disponibilités”, “Réserver votre séjour” and “FR / EN”. Do not add sections, sliders, weather, social feeds, blog/news, invented facts or new property claims. This is a responsive composition of the anchor, not a redesign.
```

## 3 — Réservation page / mobile

```text
Rely on the pasted Les Restanques reference and the established Home anchor design system. Create the public Réservation page at a narrow mobile viewport. Preserve the same palette, serif/sans typography, editorial spacing, thin borders, natural-light photo treatment and restrained terracotta / warm-stone interactions. This screen must feel like the same site, not a generic booking template.

Use the exact mobile-first sequence only: Explication du fonctionnement, Module Calendrier & Simulation, Formulaire de demande (3 étapes). Make the booking module the main focus. Keep the layout vertical and touch-friendly: show a single-month calendar at a time or vertically scrollable months, never a cramped two-column calendar. Make available, selected, unavailable and temporarily held dates clearly distinct without relying only on color.

Make the price simulator visibly specific and non-generic: show selected arrival and departure dates, number of nights, a transparent line-item summary, an optional “Ménage — 50 €” control, and the note “Taxe de séjour à régler sur place”. Do not invent nightly rates or totals; use neutral placeholder values or an unpriced state. Include a visible three-step progress indicator and simple French fields “Nom”, “Prénom”, “Email”, “Téléphone”, “Message”, with the final button “Envoyer ma demande”. Do not show card payment, intrusive address/date-of-birth fields or long legal copy; use only a compact “CGV” link. Keep a discreet “FR / EN” switch. Do not add any section from another page.
```

## 4 — Réservation page / desktop

```text
Rely on the pasted Les Restanques reference and the generated Réservation mobile screen. Create the same public Réservation page at a wide desktop viewport, with strict continuity to the Home anchor and mobile booking screen: identical palette, typography, spacing rhythm, borders, controls, button treatment and editorial warmth.

Keep the exact three-section structure only: Explication du fonctionnement, Module Calendrier & Simulation, Formulaire de demande (3 étapes). Use desktop space to create a calm, asymmetric composition—calendar and price summary can sit side by side only if both remain readable and the form follows clearly. Do not turn the page into a symmetrical SaaS dashboard or a generic hotel checkout.

Give the calendar and simulator deliberate visual hierarchy and realistic interaction states. The calendar must clearly distinguish available, selected, unavailable and temporarily blocked dates. The price panel must show dates, nights, optional “Ménage — 50 €”, and “Taxe de séjour à régler sur place”, but no invented nightly price or total. Keep the French labels “Envoyer ma demande”, “Nom”, “Prénom”, “Email”, “Téléphone”, “Message”, “CGV” and “FR / EN”. No card payment, no long legal block, no extra sections, no invented facts. This is a responsive desktop adaptation, not a redesign.
```

## 5 — Admin / desktop only

```text
Rely on the pasted Les Restanques reference and the established public-site design system. Create one desktop-only back-office screen for Judith, the non-technical host. Preserve the same mineral palette, deep olive/charcoal text, editorial serif for page-level headings, geometric sans-serif for controls, thin borders, restrained accent color and calm generous spacing, while making the interface more operational and information-dense than the public pages.

Represent the admin as a single dashboard view with clear navigation or tabs for the three reference admin destinations: “Demandes” / Dashboard, “Planning”, and “Tarifs & Règles”. The primary content should be the Dashboard: reservation cards grouped by “En attente”, “Validées”, and “Refusées”, with obvious but non-aggressive actions “Valider” and “Refuser” and an optional message field. Include a compact glimpse of the global planning/calendar state and a route/tab entry for the season manager with “Basse”, “Moyenne”, “Haute”, “Prix par nuit”, “Séjour minimum” and “Jours d’arrivée autorisés”. Distinguish calendar sources “Direct”, “Airbnb”, and “Blocage manuel”.

Keep the admin minimal, accessible and easy to scan; do not invent data about guests, prices or dates beyond neutral placeholder rows. Do not add analytics, charts, marketing metrics, team management, social links or public-site sections. All visible UI labels must be French. This screen must clearly belong to the same Les Restanques product as the four earlier screens, but must remain a practical back-office rather than an editorial landing page.
```

## Refinement prompts prêts à l’emploi

### Ajuster une section sans casser le système

```text
Refine only the [SECTION NAME] section on the current screen. Keep the established Les Restanques anchor system unchanged: palette, typography, spacing rhythm, photo treatment, borders, language and all other sections. Do not add a new section or invent property facts. Make the requested section more editorial, moderately asymmetrical and less generic while preserving its exact content role from the reference.
```

### Réparer le calendrier et le simulateur

```text
Rework only the calendar and price simulator on this reservation screen. Do not redesign the rest of the page. Make the calendar unmistakably interactive: clear month navigation, generous touch targets, strong selected-range treatment, and separate visual states for available, unavailable and temporarily blocked dates. Keep mobile months in a vertical flow and keep desktop alignment calm and readable. Make the simulator a transparent line-item panel with selected dates, nights, optional “Ménage — 50 €”, and “Taxe de séjour à régler sur place”. Do not invent nightly rates or totals; use an unpriced placeholder state. Preserve French labels and the existing Les Restanques design system.
```

### Casser une symétrie trop régulière

```text
Keep the exact content and section order, but reduce the overly regular symmetry on the current screen. Introduce moderate editorial asymmetry through offset image/text blocks, varied but coherent widths, generous negative space and subtle overlaps. Do not make it chaotic, do not reduce readability, do not add shadows or decorative UI, and do not change the established palette, typography or French labels.
```

## Quand itérer et quand recommencer

- **Iterate/refine** when the section order and content are correct but spacing, hierarchy, crop, contrast, calendar states or asymmetry need adjustment.
- **Restart the screen** when Stitch adds unrequested sections, changes the page role, invents property facts, renders a generic hotel/SaaS layout, uses forbidden visual clichés, loses French labels, or produces a fundamentally generic calendar that refinement cannot correct.
- For the reservation page, prefer restarting the whole screen if the calendar and simulator are structurally wrong; use the targeted repair prompt only when the underlying module is already in the right place.
