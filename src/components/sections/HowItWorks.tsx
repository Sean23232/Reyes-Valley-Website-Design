import { BookAppointmentButton, CallNowButton } from "@/components/ui/ActionButtons";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const STEPS = [
  {
    number: "01",
    title: "Tell Us What You Need",
    body: "Submit your property information and briefly describe what you need help with.",
  },
  {
    number: "02",
    title: "Choose How You Want to Connect",
    body: "Book a phone appointment, request an in-person appointment, or contact us immediately by phone.",
  },
  {
    number: "03",
    title: "Discuss the Right Solution",
    body: "Connect with the Reyes Valley team to discuss your property and determine the appropriate next step.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-heading" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-18 sm:px-6 lg:py-24">
        <SectionHeading
          align="center"
          eyebrow="How It Works"
          headingId="how-heading"
          title="Getting Started Is Simple"
          intro={
            <p>
              Three straightforward steps from your first message to a clear next step
              for your property.
            </p>
          }
        />

        <ol className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[2.1rem] hidden h-px bg-gradient-to-r from-transparent via-navy-900/15 to-transparent md:block"
          />
          {STEPS.map((step, index) => (
            <Reveal as="li" key={step.number} delay={index * 110} className="relative">
              <div className="flex h-full flex-col items-start md:items-center md:text-center">
                <span className="relative z-10 inline-flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full border border-navy-900/10 bg-sand-50 font-display text-lg font-extrabold text-navy-900 shadow-[var(--shadow-card)]">
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full bg-clay-500" />
                  {step.number}
                </span>
                <h3 className="mt-6 font-display text-xl font-bold text-navy-900">
                  <span className="sr-only">Step {step.number}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm text-[0.98rem] leading-relaxed text-ash-700">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-14 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <BookAppointmentButton variant="accent" size="lg" className="w-full sm:w-auto" />
          <CallNowButton variant="outline" size="lg" className="w-full sm:w-auto" showNumber />
        </Reveal>
      </div>
    </section>
  );
}
