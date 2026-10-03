"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { CheckIcon, CloseIcon, PhoneIcon } from "@/components/Icons";
import { btn } from "@/components/ui/buttonStyles";
import { requestBooking } from "@/lib/booking-bus";
import type { Service } from "@/lib/services";
import { siteConfig, telHref } from "@/lib/site";

type Props = {
  service: Service;
  onClose: () => void;
};

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ServiceModal({ service, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const node = dialogRef.current;
    const focusables = node?.querySelectorAll<HTMLElement>(FOCUSABLE);
    focusables?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== "Tab" || !node) return;
      const items = Array.from(node.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="Close service details"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-navy-950/60 backdrop-blur-[2px]"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        className="relative z-10 max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-h-[88vh] sm:rounded-2xl"
      >
        <div className="relative">
          <img
            src={service.image}
            alt={service.imageAlt}
            width={1000}
            height={520}
            loading="lazy"
            decoding="async"
            className="h-40 w-full object-cover sm:h-52"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-950/85 to-navy-950/10"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/90 text-navy-900 transition-colors hover:bg-white"
          >
            <CloseIcon className="h-5 w-5" />
            <span className="sr-only">Close service details</span>
          </button>
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-clay-300">
              Service {service.number}
            </p>
            <h2
              id="service-modal-title"
              className="mt-1.5 font-display text-2xl font-extrabold text-white sm:text-3xl"
            >
              {service.title}
            </h2>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <p className="text-[1.02rem] leading-relaxed text-ash-700">{service.detail}</p>

          <h3 className="mt-7 font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
            What this service can help with
          </h3>
          <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
            {service.helpsWith.map((item) => (
              <li
                key={item}
                className="flex items-start gap-2.5 rounded-lg bg-sand-50 px-4 py-3 text-sm text-navy-900"
              >
                <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay-600" />
                {item}
              </li>
            ))}
          </ul>

          <p className="mt-6 rounded-lg border border-navy-900/10 bg-white px-4 py-3 text-sm text-ash-600">
            Service details can be expanded or adjusted once the specifics for this
            service are confirmed.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => {
                onClose();
                requestBooking({ service: service.formValue });
              }}
              className={btn("accent", "md", "sm:flex-1")}
            >
              Book an Appointment
            </button>
            <a
              href={telHref}
              className={btn("outline", "md", "sm:flex-1")}
              aria-label={`Call Reyes Valley at ${siteConfig.phone.display}`}
            >
              <PhoneIcon className="h-[18px] w-[18px]" />
              Call Now
            </a>
          </div>

          <Link
            href={`/services/${service.slug}`}
            className="mt-5 inline-block text-sm font-semibold text-clay-700 underline underline-offset-4 hover:text-clay-600"
          >
            View the full {service.title} page
          </Link>
        </div>
      </div>
    </div>
  );
}
