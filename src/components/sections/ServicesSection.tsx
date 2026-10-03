"use client";

import { useState } from "react";
import { ArrowRightIcon } from "@/components/Icons";
import ServiceModal from "@/components/ServiceModal";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { services, type Service } from "@/lib/services";

export default function ServicesSection() {
  const [active, setActive] = useState<Service | null>(null);

  return (
    <section id="services" aria-labelledby="services-heading" className="bg-sand-100">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-6 lg:py-24">
        <SectionHeading
          eyebrow="Our Services"
          headingId="services-heading"
          title="Comprehensive Property Care"
          intro={
            <p>
              From ongoing property needs to individual maintenance and improvement
              projects, Reyes Valley provides flexible property-care solutions designed
              around each customer&rsquo;s needs.
            </p>
          }
        />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal as="li" key={service.slug} delay={(index % 3) * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-navy-900/10 bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-navy-900/20 hover:shadow-[var(--shadow-lift)]">
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    width={1000}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/10 to-transparent"
                  />
                  <span className="absolute left-4 top-4 rounded-md bg-navy-950/80 px-2.5 py-1 font-display text-[0.7rem] font-bold tracking-[0.18em] text-clay-300">
                    {service.number}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold text-navy-900">
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ash-700">
                    {service.description}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActive(service)}
                    aria-haspopup="dialog"
                    className="mt-6 inline-flex items-center gap-2 self-start rounded-md py-2 text-[0.95rem] font-semibold text-clay-700 transition-colors hover:text-clay-600"
                  >
                    {service.ctaLabel}
                    <ArrowRightIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                    <span className="sr-only"> about {service.title}</span>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>

      {active ? <ServiceModal service={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}
