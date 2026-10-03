"use client";

import { CalendarIcon, PhoneIcon } from "@/components/Icons";
import { requestBooking } from "@/lib/booking-bus";
import { siteConfig, telHref } from "@/lib/site";

/**
 * Persistent two-action bar on small screens: Call | Book Appointment.
 * Includes an in-flow spacer so it never covers footer content.
 */
export default function MobileActionBar() {
  return (
    <>
      <div aria-hidden="true" className="h-[72px] md:hidden" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-navy-900/10 bg-sand-50/97 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-18px_rgba(10,27,42,0.8)] backdrop-blur md:hidden">
        <div className="grid grid-cols-2 gap-2.5 px-4 py-3">
          <a
            href={telHref}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg border border-navy-900/20 bg-white text-[0.95rem] font-semibold text-navy-900"
            aria-label={`Call Reyes Valley at ${siteConfig.phone.display}`}
          >
            <PhoneIcon className="h-[18px] w-[18px]" />
            Call
          </a>
          <button
            type="button"
            onClick={() => requestBooking()}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-clay-600 text-[0.95rem] font-semibold text-white"
          >
            <CalendarIcon className="h-[18px] w-[18px]" />
            Book Appointment
          </button>
        </div>
      </div>
    </>
  );
}
