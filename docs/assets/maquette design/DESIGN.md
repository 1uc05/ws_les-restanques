---
name: Solar Organic Editorial
colors:
  surface: '#f9f9f7'
  surface-dim: '#dadad8'
  surface-bright: '#f9f9f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f2'
  surface-container: '#eeeeec'
  surface-container-high: '#e8e8e6'
  surface-container-highest: '#e2e3e1'
  on-surface: '#1a1c1b'
  on-surface-variant: '#46483d'
  inverse-surface: '#2f3130'
  inverse-on-surface: '#f1f1ef'
  outline: '#77786b'
  outline-variant: '#c7c7b9'
  surface-tint: '#5a6235'
  primary: '#586033'
  on-primary: '#ffffff'
  primary-container: '#707949'
  on-primary-container: '#fcffe1'
  inverse-primary: '#c2cc94'
  secondary: '#775930'
  on-secondary: '#ffffff'
  secondary-container: '#ffd6a3'
  on-secondary-container: '#795b32'
  tertiary: '#805037'
  on-tertiary: '#ffffff'
  tertiary-container: '#9c684d'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dee8ae'
  primary-fixed-dim: '#c2cc94'
  on-primary-fixed: '#181e00'
  on-primary-fixed-variant: '#424a1f'
  secondary-fixed: '#ffddb4'
  secondary-fixed-dim: '#e7c08e'
  on-secondary-fixed: '#291800'
  on-secondary-fixed-variant: '#5c421b'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#f8b899'
  on-tertiary-fixed: '#331201'
  on-tertiary-fixed-variant: '#673c24'
  background: '#f9f9f7'
  on-background: '#1a1c1b'
  surface-variant: '#e2e3e1'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Montserrat
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Montserrat
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Montserrat
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 32px
  margin-mobile: 20px
  margin-desktop: 64px
  section-gap: 120px
---

## Brand & Style

This design system is anchored in the "Slow Life" philosophy of Provence, blending organic warmth with the sophisticated structure of a high-end travel magazine. The brand personality is authentic, tranquil, and curated, avoiding clinical perfection in favor of human-centric, solar warmth.

The visual style is **Organic Editorial**. It utilizes generous negative space, intentional asymmetry, and a tactile materiality that feels like high-quality matte paper. By prioritizing large-scale photography and graceful typography, the UI evokes an emotional response of calm, luxury, and cultural immersion.

Key stylistic pillars:
- **Asymmetry:** Breaking the standard grid to create a dynamic, editorial flow.
- **Materiality:** Using subtle textures and "mineral" tones to ground digital elements in the physical world.
- **Solar Atmosphere:** Lighting that feels natural and warm, avoiding harsh blue-light aesthetics.

## Colors

The palette is derived from the Provencal landscape—olive groves, sun-bleached stone, and terracotta tiles.

- **Primary (Olive Green):** #848D5B. Represents the "vegetal" heart of the estate. Used for key CTAs and structural accents.
- **Secondary (Sand/Sandstone):** #D9B382. A "solar" tone used for secondary backgrounds and soft highlights.
- **Tertiary (Terracotta):** #B17A5E. Inspired by earth and roof tiles, used sparingly for interaction states or to draw attention to heritage details.
- **Neutral (Charcoal):** #2F3130. Used for high-contrast typography to ensure legibility against light mineral backgrounds.
- **Surface (Cream/Off-White):** #F9F6F0. The "base" of the design system, providing a warm, paper-like canvas that is softer on the eyes than pure white.

Avoid using saturated lavenders or cold, blue-toned greys. All colors should feel desaturated and "mineralized."

## Typography

The typography strategy relies on the contrast between the intellectual, classic feel of **Playfair Display** and the modern, grounded clarity of **Montserrat**.

- **Headlines:** Use Playfair Display for all titles. Large display sizes should use tight letter spacing to emphasize the editorial look.
- **Body:** Montserrat provides a neutral, geometric balance that ensures readability for long-form descriptions of the villa and local experiences.
- **Labels:** Use uppercase Montserrat with generous letter spacing for navigation, small captions, and "eyebrow" text.

Maintain a vertical rhythm by using a 1.6x line height for body text, ensuring a "breathable" and relaxed reading experience.

## Layout & Spacing

This design system uses a **Fluid Editorial Grid**. While a 12-column structure exists for alignment, elements (images and text blocks) should frequently "break" the grid or be offset to create an asymmetrical, magazine-style layout.

- **Desktop:** 12 columns with 32px gutters and large 64px outer margins to frame the content.
- **Mobile:** Single column with 20px margins.
- **White Space:** Use large `section-gap` units (120px+) between major content areas to reinforce the feeling of "Slow Life" and exclusivity.

Layouts should favor alternating alignments: an image on the left with text slightly overlapping or offset on the right, mimicking a physical book spread.

## Elevation & Depth

Depth is achieved through **Tonal Layers** and subtle **Ambient Shadows** rather than traditional elevation.

- **Stacking:** Use overlapping elements (e.g., a text box partially covering an image) to create a sense of physical depth without using shadows.
- **Shadows:** When necessary for functional components (like modals or floating booking bars), use extremely soft, diffused shadows with a tint of the neutral charcoal color (`rgba(47, 49, 48, 0.05)`).
- **Outlines:** Use low-contrast mineral borders (1px, #E0DCD4) to define input fields and secondary cards, keeping the interface flat and sophisticated.

## Shapes

The shape language is **Soft and Architectural**. 

- **Corners:** Use a consistent 0.25rem (Soft) radius for most UI elements to mimic the slightly weathered edges of natural stone. 
- **Imagery:** Photography can occasionally use a "large" radius (1rem) on a single corner to create an organic, custom shape that breaks the standard rectangle.
- **Interactive Elements:** Buttons should remain slightly rounded or completely rectangular to maintain a premium, non-playful aesthetic. Avoid pill shapes.

## Components

- **Buttons:** Primary buttons use the Olive Green background with white Montserrat text. Secondary buttons use a Charcoal border with a transparent background. Interaction states should be a subtle shift in color value, never a harsh glow.
- **Input Fields:** Minimalist styling with a 1px bottom border in Charcoal or a light mineral stroke. Use Playfair Display for labels to elevate the form experience.
- **Cards:** Cards should be "borderless" with a background of Sand (#D9B382 at 10% opacity) or defined only by the image they contain.
- **Booking Bar:** A persistent, floating element at the bottom of the screen on mobile, using the Olive Green palette to denote its importance.
- **Lists:** Use custom icons inspired by nature (e.g., a simple olive leaf or sun glyph) rather than standard material icons.
- **Editorial Chips:** Small, uppercase labels used for amenities (e.g., "PRIVATE POOL"), styled with a light terracotta background and dark text.