import { CheckIcon, MapPinIcon } from "@/components/Icons";
import { BookAppointmentButton, CallNowButton } from "@/components/ui/ActionButtons";

const TRUST_POINTS = [
  "Multiple property services through one company",
  "Phone or in-person appointments",
  "Local to Stockton & the San Joaquin Valley",
];

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-navy-950"
    >
      <img
        src="/images/hero-neighborhood-1400.jpg"
        srcSet="/images/hero-neighborhood-900.jpg 900w, /images/hero-neighborhood-1400.jpg 1400w, /images/hero-neighborhood.jpg 2000w"
        sizes="100vw"
        alt="Well-maintained residential neighborhood with tidy lawns and clean exteriors"
        width={2000}
        height={1333}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/92 to-navy-950/55"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-navy-950/40"
      />

      <div className="on-dark relative mx-auto max-w-7xl px-5 py-20 sm:px-6 sm:py-24 lg:py-32">
        <div className="max-w-2xl">
          <p className="flex items-center gap-3 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-clay-300">
            <span aria-hidden="true" className="h-px w-8 bg-clay-300/60" />
            Property Management &amp; Maintenance
          </p>

          <h1
            id="hero-heading"
            className="mt-6 text-balance font-display text-[2.5rem] font-extrabold leading-[1.05] text-white sm:text-5xl lg:text-[3.75rem]"
          >
            Complete Property Care.
            <span className="block text-clay-300">Made Simple.</span>
          </h1>

          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-sand-100/90">
            Reyes Valley Property Management &amp; Maintenance provides reliable
            property care throughout the San Joaquin Valley, with a special emphasis
            on Stockton, California. From property management and maintenance to
            interior upkeep, perimeter care, and property modifications, we&rsquo;re
            here to help with your property&rsquo;s needs.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <BookAppointmentButton variant="accent" size="lg" className="sm:min-w-[232px]" />
            <CallNowButton variant="outlineLight" size="lg" showNumber />
          </div>

          <p className="mt-8 flex items-center gap-2.5 text-sm font-medium text-sand-200/90">
            <MapPinIcon className="h-4.5 w-4.5 text-clay-300" />
            Serving Property Owners Throughout the San Joaquin Valley
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/10 bg-navy-950/70 backdrop-blur-sm">
        <ul className="mx-auto grid max-w-7xl gap-3 px-5 py-5 text-sm text-sand-100/85 sm:px-6 md:grid-cols-3 md:gap-6">
          {TRUST_POINTS.map((point) => (
            <li key={point} className="flex items-start gap-2.5">
              <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-clay-300" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
