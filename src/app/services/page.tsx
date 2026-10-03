import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";
import { BookAppointmentButton, CallNowButton } from "@/components/ui/ActionButtons";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Property Services",
  description:
    "Property management, property maintenance, perimeter maintenance, interior upkeep, property modifications, and customized property care from Reyes Valley Property Management & Maintenance in Stockton and the San Joaquin Valley.",
  alternates: { canonical: "/services" },
};

export default function ServicesIndexPage() {
  return (
    <div className="bg-sand-100">
      <div className="on-dark bg-navy-900">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:py-16">
          <nav aria-label="Breadcrumb" className="text-sm text-sand-200/70">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white">Services</li>
            </ol>
          </nav>
          <h1 className="mt-5 max-w-3xl text-balance font-display text-3xl font-extrabold leading-[1.12] text-white sm:text-4xl lg:text-[2.9rem]">
            Comprehensive Property Care
          </h1>
          <p className="mt-4 max-w-2xl text-[1.02rem] leading-relaxed text-sand-200/85">
            From ongoing property needs to individual maintenance and improvement
            projects, Reyes Valley provides flexible property-care solutions designed
            around each customer&rsquo;s needs.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookAppointmentButton variant="accent" size="md" />
            <CallNowButton variant="outlineLight" size="md" showNumber />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-navy-900/10 bg-white shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    width={1000}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-md bg-navy-950/80 px-2.5 py-1 font-display text-[0.7rem] font-bold tracking-[0.18em] text-clay-300">
                    {service.number}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-display text-xl font-bold text-navy-900">
                    {service.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ash-700">
                    {service.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-clay-700">
                    View service
                    <ArrowRightIcon className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
