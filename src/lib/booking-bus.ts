"use client";

/**
 * Tiny client-side event bus that lets any CTA on the page open the booking
 * form with a pre-selected appointment type and/or service. Keeps CTAs
 * functional everywhere without prop-drilling or a state library.
 */

export type BookingIntent = {
  appointmentType?: "phone" | "in-person";
  service?: string;
};

export const BOOKING_EVENT = "rv:booking-intent";

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function scrollToId(id: string): boolean {
  if (typeof document === "undefined") return false;
  const target = document.getElementById(id);
  if (!target) return false;
  target.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "start",
  });
  return true;
}

/**
 * Sends the visitor to the appointment form. If the booking section is on the
 * current page it scrolls smoothly and pre-fills; otherwise it navigates to
 * the dedicated /book page carrying the same intent.
 */
export function requestBooking(intent: BookingIntent = {}): void {
  if (typeof window === "undefined") return;

  // Works on the home page (#book section) and on the dedicated /book page.
  const onPage =
    document.getElementById("book") ?? document.getElementById("appointment-form");
  if (onPage) {
    window.dispatchEvent(new CustomEvent<BookingIntent>(BOOKING_EVENT, { detail: intent }));
    scrollToId(onPage.id);
    return;
  }

  const params = new URLSearchParams();
  if (intent.appointmentType) params.set("type", intent.appointmentType);
  if (intent.service) params.set("service", intent.service);
  const query = params.toString();
  window.location.href = query ? `/book?${query}` : "/book";
}

/** Sends the visitor to the general contact form. */
export function goToContact(): void {
  if (typeof window === "undefined") return;
  if (!scrollToId("contact")) {
    window.location.href = "/#contact";
  }
}
