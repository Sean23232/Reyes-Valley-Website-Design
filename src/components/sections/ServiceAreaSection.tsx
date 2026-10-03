"use client";

import { ArrowRightIcon, MapPinIcon } from "@/components/Icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { btn } from "@/components/ui/buttonStyles";
import { goToContact } from "@/lib/booking-bus";

export default function ServiceAreaSection() {
  return (
    <section id="service-area" aria-labelledby="area-heading" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-6 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Service Area"
              headingId="area-heading"
              title="Serving the San Joaquin Valley"
              intro={
                <p>
                  Reyes Valley Property Management &amp; Maintenance serves customers
                  throughout the San Joaquin Valley, with special emphasis on Stockton,
                  California.
                </p>
              }
            />

            <Reveal delay={90}>
              <div className="mt-8 flex items-center gap-4 rounded-xl border border-clay-100 bg-clay-50 p-5">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-clay-600 text-white">
                  <MapPinIcon className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-xl font-extrabold uppercase tracking-[0.06em] text-navy-900">
                    Stockton, California
                  </p>
                  <p className="mt-0.5 text-sm text-ash-700">
                    Primary focus area for scheduling and in-person appointments.
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-ash-600">
                Located elsewhere in the valley? Ask us — coverage for additional
                communities can be confirmed directly with the Reyes Valley team.
              </p>

              <button
                type="button"
                onClick={goToContact}
                className={btn("navy", "md", "mt-7 group")}
              >
                Ask About Service in Your Area
                <ArrowRightIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </Reveal>
          </div>

          {/* Map-style visual (illustrative, not a geographic map) */}
          <Reveal delay={60}>
            <div className="on-dark relative isolate overflow-hidden rounded-2xl border border-navy-900/10 bg-navy-900">
              <img
                src="/images/service-area-valley.jpg"
                alt="Aerial view of valley rooftops and surrounding landscape at sunrise"
                width={1400}
                height={933}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-30"
              />
              <div aria-hidden="true" className="map-grid absolute inset-0" />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-br from-navy-950/85 via-navy-900/70 to-navy-800/60"
              />

              <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-sand-200/70">
                    Coverage Overview
                  </p>
                  <p className="rounded-md border border-white/15 px-2.5 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-sand-200/80">
                    California
                  </p>
                </div>

                <div className="relative mx-auto flex w-full max-w-xs flex-col items-center py-8">
                  <span className="pulse-dot relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-clay-500 ring-4 ring-clay-500/25" />
                  <p className="mt-5 font-display text-2xl font-extrabold tracking-tight text-white">
                    Stockton
                  </p>
                  <p className="mt-1 text-sm text-sand-200/80">Special emphasis area</p>
                  <div
                    aria-hidden="true"
                    className="mt-6 h-px w-28 bg-gradient-to-r from-transparent via-clay-300/60 to-transparent"
                  />
                  <p className="mt-5 text-center text-sm font-medium text-sand-100">
                    San Joaquin Valley
                  </p>
                  <p className="mt-1 text-center text-xs text-sand-200/70">
                    Primary service region
                  </p>
                </div>

                <p className="text-[0.7rem] leading-relaxed text-sand-200/60">
                  Illustrative coverage graphic. Additional service-area communities can
                  be listed here once confirmed.
                </p>
              </div>

              {/* Keeps the panel proportional on all breakpoints */}
              <div aria-hidden="true" className="aspect-[4/5] w-full sm:aspect-[5/4]" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
