import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, CheckIcon, MapPinIcon } from "@/components/Icons";
import { BookAppointmentButton, CallNowButton } from "@/components/ui/ActionButtons";
import { getService, services } from "@/lib/services";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} in Stockton & the San Joaquin Valley`,
    description: `${service.description} Serving property owners throughout the San Joaquin Valley, with special emphasis on Stockton, California.`,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.title} | Reyes Valley Property Management & Maintenance`,
      description: service.description,
      images: [{ url: service.image, alt: service.imageAlt }],
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <article className="bg-white">
      {/* Hero */}
      <header className="on-dark relative isolate overflow-hidden bg-navy-950">
        <img
          src={service.image}
          alt={service.imageAlt}
          width={1000}
          height={640}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/60"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:py-20">
          <nav aria-label="Breadcrumb" className="text-sm text-sand-200/70">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/services" className="transition-colors hover:text-white">
                  Services
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white">{service.title}</li>
            </ol>
          </nav>

          <p className="mt-6 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-clay-300">
            Service {service.number}
          </p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-3xl font-extrabold leading-[1.1] text-white sm:text-4xl lg:text-[3rem]">
            {service.title}
          </h1>
          <p className="mt-5 max-w-2xl text-[1.05rem] leading-relaxed text-sand-100/90">
            {service.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookAppointmentButton
              variant="accent"
              size="lg"
              intent={{ service: service.formValue }}
            />
            <CallNowButton variant="outlineLight" size="lg" showNumber />
          </div>
          <p className="mt-7 flex items-center gap-2.5 text-sm text-sand-200/85">
            <MapPinIcon className="h-4.5 w-4.5 text-clay-300" />
            Available throughout the San Joaquin Valley · Stockton, California
          </p>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 className="font-display text-2xl font-extrabold text-navy-900 sm:text-3xl">
              About this service
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-ash-700">
              {service.detail}
            </p>

            <h3 className="mt-10 font-display text-xl font-bold text-navy-900">
              What this service can help with
            </h3>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {service.helpsWith.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-lg border border-navy-900/10 bg-sand-50 px-4 py-3.5 text-[0.95rem] text-navy-900"
                >
                  <CheckIcon className="mt-0.5 h-4.5 w-4.5 shrink-0 text-clay-600" />
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-8 rounded-lg border border-navy-900/10 bg-white px-5 py-4 text-sm leading-relaxed text-ash-600">
              Service details on this page are a starting point and can be expanded once
              the specifics for {service.title.toLowerCase()} are confirmed with the
              business owner.
            </p>
          </div>

          <aside className="lg:col-span-5">
            <div className="sticky top-32 rounded-2xl border border-navy-900/10 bg-sand-50 p-6 shadow-[var(--shadow-card)] sm:p-8">
              <h2 className="font-display text-xl font-extrabold text-navy-900">
                Ready to get started?
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ash-700">
                Book a phone or in-person appointment to talk through what your property
                needs — or call and speak with us directly.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <BookAppointmentButton
                  variant="accent"
                  size="md"
                  intent={{ service: service.formValue }}
                  className="w-full"
                />
                <CallNowButton variant="outline" size="md" className="w-full" showNumber />
                <Link
                  href="/#contact"
                  className="mt-1 inline-flex items-center justify-center gap-2 text-sm font-semibold text-clay-700 underline underline-offset-4 hover:text-clay-600"
                >
                  Send a property service inquiry instead
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Related services */}
        <section aria-labelledby="related-heading" className="mt-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2
              id="related-heading"
              className="font-display text-2xl font-extrabold text-navy-900"
            >
              Other property services
            </h2>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-clay-700 hover:text-clay-600"
            >
              View all services
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <ul className="mt-7 grid gap-5 sm:grid-cols-3">
            {others.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/services/${item.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-navy-900/10 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="font-display text-[0.7rem] font-bold tracking-[0.18em] text-clay-600">
                    {item.number}
                  </span>
                  <span className="mt-2 font-display text-lg font-bold text-navy-900">
                    {item.title}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-ash-700">
                    {item.description}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-clay-700">
                    Learn more
                    <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </article>
  );
}
