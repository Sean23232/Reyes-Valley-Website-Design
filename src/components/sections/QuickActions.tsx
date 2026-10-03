"use client";

import { ArrowRightIcon, PhoneCalendarIcon, PhoneIcon, PinCalendarIcon } from "@/components/Icons";
import Reveal from "@/components/ui/Reveal";
import { requestBooking } from "@/lib/booking-bus";
import { siteConfig, telHref } from "@/lib/site";

type Card = {
  key: string;
  icon: typeof PhoneIcon;
  title: string;
  body: string;
  cta: string;
  action: () => void;
  href?: string;
  emphasis?: boolean;
};

export default function QuickActions() {
  const cards: Card[] = [
    {
      key: "phone-appointment",
      icon: PhoneCalendarIcon,
      title: "Book a Phone Appointment",
      body: "Choose a convenient time to speak with our team about your property.",
      cta: "Schedule a Call",
      action: () => requestBooking({ appointmentType: "phone" }),
    },
    {
      key: "in-person",
      icon: PinCalendarIcon,
      title: "In-Person Appointment",
      body: "Prefer to discuss your property in person? Request an in-person appointment.",
      cta: "Book In Person",
      action: () => requestBooking({ appointmentType: "in-person" }),
    },
    {
      key: "call-now",
      icon: PhoneIcon,
      title: "Immediate Contact",
      body: "Have a question or need to reach us now?",
      cta: "Call Now",
      action: () => {},
      href: telHref,
      emphasis: true,
    },
  ];

  return (
    <section
      aria-labelledby="quick-actions-heading"
      className="relative z-10 bg-sand-50"
    >
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-18">
        <Reveal className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="quick-actions-heading"
              className="font-display text-2xl font-extrabold text-navy-900 sm:text-3xl"
            >
              Need Help With Your Property?
            </h2>
            <p className="mt-2 text-ash-700">
              Pick the option that works best for you — all three reach the same team.
            </p>
          </div>
        </Reveal>

        <ul className="mt-8 grid gap-5 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal as="li" key={card.key} delay={index * 90}>
                <div
                  className={`group flex h-full flex-col rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:p-7 ${
                    card.emphasis
                      ? "border-navy-800 bg-navy-900 text-sand-100 on-dark"
                      : "border-navy-900/10 bg-white shadow-[var(--shadow-card)]"
                  }`}
                >
                  <span
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-lg ${
                      card.emphasis
                        ? "bg-white/10 text-clay-300"
                        : "bg-clay-50 text-clay-600"
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3
                    className={`mt-5 font-display text-xl font-bold ${
                      card.emphasis ? "text-white" : "text-navy-900"
                    }`}
                  >
                    {card.title}
                  </h3>
                  <p
                    className={`mt-2.5 flex-1 text-[0.95rem] leading-relaxed ${
                      card.emphasis ? "text-sand-200/85" : "text-ash-700"
                    }`}
                  >
                    {card.body}
                  </p>

                  {card.href ? (
                    <a
                      href={card.href}
                      aria-label={`Call Reyes Valley at ${siteConfig.phone.display}`}
                      className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-clay-600 px-5 text-[0.95rem] font-semibold text-white transition-colors hover:bg-clay-700"
                    >
                      <PhoneIcon className="h-[18px] w-[18px]" />
                      {card.cta}
                      <span className="sr-only">
                        {" "}
                        — {siteConfig.phone.display}
                      </span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={card.action}
                      className="mt-6 inline-flex min-h-[48px] items-center justify-between gap-2 rounded-lg border border-navy-900/15 bg-sand-50 px-5 text-[0.95rem] font-semibold text-navy-900 transition-colors hover:border-navy-900/40 hover:bg-navy-900 hover:text-white"
                    >
                      {card.cta}
                      <ArrowRightIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
