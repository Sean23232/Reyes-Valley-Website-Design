import { BookAppointmentButton, CallNowButton } from "@/components/ui/ActionButtons";
import Reveal from "@/components/ui/Reveal";

export default function PropertyNeedsCTA() {
  return (
    <section
      aria-labelledby="needs-cta-heading"
      className="on-dark relative isolate overflow-hidden bg-navy-950"
    >
      <img
        src="/images/cta-aerial-900.jpg"
        srcSet="/images/cta-aerial-900.jpg 900w, /images/cta-aerial.jpg 1800w"
        sizes="100vw"
        alt=""
        aria-hidden="true"
        width={1800}
        height={1200}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-950/70"
      />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:py-20">
        <Reveal className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <h2
              id="needs-cta-heading"
              className="text-balance font-display text-3xl font-extrabold leading-[1.14] text-white sm:text-[2.4rem]"
            >
              Whatever Your Property Needs, Start Here.
            </h2>
            <p className="mt-4 text-[1.02rem] leading-relaxed text-sand-200/85">
              Tell us what you&rsquo;re looking for and we&rsquo;ll help you determine
              the next step.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:shrink-0">
            <BookAppointmentButton variant="accent" size="lg" className="w-full sm:w-auto" />
            <CallNowButton
              variant="outlineLight"
              size="lg"
              className="w-full sm:w-auto"
              showNumber
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
