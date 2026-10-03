/**
 * ---------------------------------------------------------------------------
 * REYES VALLEY PROPERTY MANAGEMENT & MAINTENANCE — SITE CONFIGURATION
 * ---------------------------------------------------------------------------
 * This is the single place to update business details across the entire site.
 * Values marked PLACEHOLDER have not been supplied by the business owner yet.
 *
 * To go live:
 *   1. Replace `phone.raw` / `phone.display` with the real business number.
 *   2. Replace `email` with the real business email address.
 *   3. (Optional) Set NOTIFICATION_WEBHOOK_URL / NOTIFICATION_TO_EMAIL in .env
 *      to forward form submissions by email or webhook. Until then every
 *      submission is still safely recorded in the database.
 * ---------------------------------------------------------------------------
 */

export const PLACEHOLDER_PHONE_RAW = "+15550000000";

export const siteConfig = {
  name: "Reyes Valley Property Management & Maintenance",
  shortName: "Reyes Valley",
  legalName: "Reyes Valley Property Management & Maintenance",
  tagline: "Fast, easy service for your property needs.",
  description:
    "Reyes Valley Property Management & Maintenance provides property management, maintenance, interior upkeep, perimeter maintenance, and property modification services throughout the San Joaquin Valley, with a special emphasis on Stockton, California.",

  /** PLACEHOLDER — replace with the real business phone number. */
  phone: {
    raw: PLACEHOLDER_PHONE_RAW,
    display: "(555) 000-0000",
    isPlaceholder: true,
    note: "Business phone number pending",
  },

  /** PLACEHOLDER — replace with the real business email address. */
  email: {
    address: "info@reyesvalleypm.com",
    isPlaceholder: true,
    note: "Business email pending",
  },

  serviceArea: {
    primary: "San Joaquin Valley, California",
    emphasis: "Stockton, California",
    state: "California",
    stateCode: "CA",
    // Intentionally no invented city list. Add cities here once confirmed.
    cities: [] as string[],
  },

  /** Hours are not yet confirmed by the business owner. */
  hours: {
    confirmed: false,
    placeholder: "Hours available upon request",
  },

  /** Integration points for form delivery. */
  endpoints: {
    appointments: "/api/appointments",
    contact: "/api/contact",
  },
} as const;

export const telHref = `tel:${siteConfig.phone.raw}`;
export const mailtoHref = `mailto:${siteConfig.email.address}`;

export const navLinks = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Service Area", href: "/#service-area" },
  { label: "Contact", href: "/#contact" },
] as const;
