import { CompassIcon, LayersIcon, MapPinIcon, ShieldIcon } from "@/components/Icons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const FEATURES = [
  {
    icon: ShieldIcon,
    title: "Convenient",
    body: "A straightforward way to request help and schedule service.",
  },
  {
    icon: LayersIcon,
    title: "Comprehensive",
    body: "Property management, maintenance, upkeep, and modification services in one place.",
  },
  {
    icon: CompassIcon,
    title: "Responsive",
    body: "Multiple ways to reach the company, including immediate phone contact and scheduled appointments.",
  },
  {
    icon: MapPinIcon,
    title: "Local",
    body: "Serving the San Joaquin Valley with special emphasis on Stockton, California.",
  },
];

export default function WhySection() {
  return (
    <section
      aria-labelledby="why-heading"
      className="on-dark relative isolate overflow-hidden bg-navy-900"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-navy-800/60 to-transparent lg:block"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-18 sm:px-6 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <SectionHeading
              tone="light"
              eyebrow="Why Reyes Valley"
              headingId="why-heading"
              title="Property Care Without the Runaround"
              intro={
                <p>
                  Your property deserves attention, communication, and a straightforward
                  way to get help when you need it. Reyes Valley Property Management
                  &amp; Maintenance brings multiple property-care services together so
                  customers have one convenient place to start.
                </p>
              }
            />
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
            {FEATURES.map(({ icon: Icon, title, body }, index) => (
              <Reveal as="li" key={title} delay={index * 80}>
                <div className="h-full rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors duration-300 hover:border-clay-300/40 hover:bg-white/[0.07]">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-clay-500/15 text-clay-300">
                    <Icon className="h-5.5 w-5.5" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold text-white">
                    {title}
                  </h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-sand-200/80">
                    {body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
